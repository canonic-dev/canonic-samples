//
//  CategoriesViewController.swift
//  Flashy
//
//  Created by SimranJot on 09/05/21.
//

import UIKit

class CategoriesViewController: UIViewController {
    
    var categories: [Category] = []
    var fetchState: NetworkState = .loading
    
    @IBOutlet weak var retryButton: UIButton!
    @IBOutlet weak var retryStackView: UIStackView!
    @IBOutlet weak var loadingStackView: UIStackView!
    @IBOutlet weak var categoriesTableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        title = "Categories"
        view.backgroundColor = UIColor(rgb: 0xe1e5ea)
                
        setupRetryButtton()
        setupTableView()
        
        updateViewState()
        fetchCategories()
    }
}


// MARK: View Setup

extension CategoriesViewController {
    
    fileprivate func setupRetryButtton() {
        retryButton.layer.cornerRadius = 8
        retryButton.contentEdgeInsets = UIEdgeInsets(top: 10, left: 20, bottom: 10, right: 20)
    }
    
    fileprivate func setupTableView() {
        categoriesTableView.backgroundColor = .clear
        categoriesTableView.tableFooterView = UIView()
    }
    
    fileprivate func updateViewState() {
        switch fetchState {
        case .success:
            retryStackView.isHidden = true
            loadingStackView.isHidden = true
            categoriesTableView.isHidden = false
            break;
            
        case .loading:
            retryStackView.isHidden = true
            loadingStackView.isHidden = false
            categoriesTableView.isHidden = true
            
        case .failure:
            retryStackView.isHidden = false
            categoriesTableView.isHidden = true
            loadingStackView.isHidden = true
            break
            
        }
    }
}


// MARK: Action Helpers

extension CategoriesViewController {
    
    @IBAction func retryTapped(_ sender: Any) {
        fetchCategories()
        updateViewState()
    }
    
    fileprivate func postCategoriesFetchActions() {
        switch fetchState {
        case .success:
            categoriesTableView.reloadSections(IndexSet(integer: 0), with: .bottom)
            break
        default:
            break
        }
        updateViewState()
    }
    
    fileprivate func pushToFlashListsVC(for category: Category) {
        let flashListsVC = UIStoryboard.init(name: "Main", bundle: Bundle.main).instantiateViewController(withIdentifier: StoryBoardID.FlashListViewController) as! FlashListViewController
        flashListsVC.category = category
        self.navigationController?.pushViewController(flashListsVC, animated: true)
    }
}


// MARK: TableView Delegates

extension CategoriesViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return categories.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: CellIdentifiers.CategoryTableCell, for: indexPath) as! CategoryTableViewCell
        cell.configureCell(for: categories[indexPath.row])
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        pushToFlashListsVC(for: categories[indexPath.row])
    }
}


// MARK: Networking

extension CategoriesViewController {
    
    fileprivate func fetchCategories() {
        fetchState = .loading
        CanonicClient.sharedInstance().getAllCategories { [weak self] (availableCategories) in
            self?.categories = availableCategories
            self?.fetchState = .success
            DispatchQueue.main.async {
                self?.postCategoriesFetchActions()
            }
        } faliure: { [weak self] (errorString) in
            self?.fetchState = .failure
            DispatchQueue.main.async {
                self?.postCategoriesFetchActions()
            }
        }
    }
}

