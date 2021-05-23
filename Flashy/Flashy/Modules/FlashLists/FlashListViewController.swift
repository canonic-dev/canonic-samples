//
//  FlashListViewController.swift
//  Flashy
//
//  Created by SimranJot on 16/05/21.
//

import UIKit

class FlashListViewController: UIViewController {
            
    var category: Category!
    var flashLists: [FlashList] = []
    var fetchState: NetworkState = .loading
    
    @IBOutlet weak var flashListTableView: UITableView!
    @IBOutlet weak var retryStackView: UIStackView!
    @IBOutlet weak var retryButton: UIButton!
    @IBOutlet weak var loadingStackView: UIStackView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = UIColor(rgb: 0xe1e5ea)
        setupRetryButtton()
        setupTableView()
        
        updateViewState()
        fetchFlashLists()
    }
}

// MARK: View Setup

extension FlashListViewController {
    
    fileprivate func setupRetryButtton() {
        retryButton.layer.cornerRadius = 8
        retryButton.contentEdgeInsets = UIEdgeInsets(top: 10, left: 20, bottom: 10, right: 20)
    }
    
    fileprivate func setupTableView() {
        flashListTableView.backgroundColor = .clear
        flashListTableView.tableFooterView = UIView()
    }
    
    fileprivate func updateViewState() {
        switch fetchState {
        case .success:
            retryStackView.isHidden = true
            loadingStackView.isHidden = true
            flashListTableView.isHidden = false
            break;
            
        case .loading:
            retryStackView.isHidden = true
            loadingStackView.isHidden = false
            flashListTableView.isHidden = true
            
        case .failure:
            retryStackView.isHidden = false
            flashListTableView.isHidden = true
            loadingStackView.isHidden = true
            break
            
        }
    }
}


// MARK: Action Helpers

extension FlashListViewController {
    
    @IBAction func retryButtonTapped(_ sender: Any) {
        fetchFlashLists()
        updateViewState()
    }
    
    fileprivate func postFlashListsFetchActions() {
        switch fetchState {
        case .success:
            flashListTableView.reloadSections(IndexSet(integer: 0), with: .fade)
            break
        default:
            break
        }
        updateViewState()
    }
    
    fileprivate func pushToFlashCardsVC(for flashList: FlashList) {
        let flashCardsVC = UIStoryboard.init(name: "Main", bundle: Bundle.main).instantiateViewController(withIdentifier: StoryBoardID.CardsViewController) as! CardsViewController
        flashCardsVC.list = flashList
        self.navigationController?.pushViewController(flashCardsVC, animated: true)
    }
}


// MARK: TableView Delegates

extension FlashListViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return flashLists.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: CellIdentifiers.FlashListTableCell, for: indexPath) as! FlashListTableViewCell
        cell.configureCell(for: flashLists[indexPath.row])
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        pushToFlashCardsVC(for: flashLists[indexPath.row])
    }
}


// MARK: Networking

extension FlashListViewController {
    
    fileprivate func fetchFlashLists() {
        fetchState = .loading
        CanonicClient.sharedInstance().getFlashListsForCategory(categoryId: category.id) { [weak self] lists in
            self?.flashLists = lists
            self?.fetchState = .success
            DispatchQueue.main.async {
                self?.postFlashListsFetchActions()
            }
        } faliure: { [weak self] errorString in
            self?.fetchState = .failure
            DispatchQueue.main.async {
                self?.postFlashListsFetchActions()
            }
        }
    }
}

