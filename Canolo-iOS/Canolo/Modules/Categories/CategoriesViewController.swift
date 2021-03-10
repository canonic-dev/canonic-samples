//
//  CategoriesViewController.swift
//  Canolo
//
//  Created by SimranJot on 28/02/21.
//

import UIKit

class CategoriesViewController: UIViewController {
    
    @IBOutlet weak var categoriesTableVC: UITableView!
    @IBOutlet weak var playButton: LoadingButton!
    
    let images = ["circle", "square", "triangle", "hexagon", "capsule"]
    var players = [Player]()
    var categories = [Categories]()
    var cardsMapping = [String: [Cards]]()
    
    var fetchState: Loading = .loading
    var selectedIndex = IndexPath() {
        didSet {
            var rows = [selectedIndex]
            if !oldValue.indices.isEmpty {
                rows.append(oldValue)
            }
            categoriesTableVC.reloadRows(at: rows, with: .fade)
            playButton.isEnabled = true
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        title = "Categories"
        playButton.isEnabled = false
        
        setupTableView()
        setupPlayButtonButton()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
                
        Utility.lockOrientation(.portrait, andRotateTo: .portrait)
        
        DispatchQueue.main.async { [weak self] in
            self?.navigationController?.navigationBar.sizeToFit()
        }
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        Utility.lockOrientation(.all)
    }
}


// MARK: View Setup

extension CategoriesViewController {
    
    fileprivate func setupTableView() {
        categoriesTableVC.delegate = self
        categoriesTableVC.dataSource = self
        categoriesTableVC.tableFooterView = UIView()
        categoriesTableVC.contentInsetAdjustmentBehavior = .never
    }
    
    fileprivate func setupPlayButtonButton() {
        playButton.layer.cornerRadius = 8
        playButton.layer.borderWidth = 0.7
        playButton.setTitleColor(.lightGray, for: .disabled)
        playButton.layer.borderColor = UIColor.white.withAlphaComponent(0.85).cgColor
        playButton.contentEdgeInsets = UIEdgeInsets(top: 10, left: 20, bottom: 10, right: 20)
    }
}


// MARK: Table Delegates

extension CategoriesViewController: UITableViewDataSource, UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return categories.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: CellIdentifiers.CategoryTableCell, for: indexPath) as! CategoryTableCell
        cell.configureCell(category: categories[indexPath.row].name, image: images[indexPath.row], isSelected: indexPath == selectedIndex)
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        selectedIndex = indexPath
    }
}


// MARK: Actions

extension CategoriesViewController {
    
    @IBAction func playClicked(_ sender: LoadingButton) {
        if cardsMapping[categories[selectedIndex.row].key] == nil {
            getCardsForCategory(category: categories[selectedIndex.row].key)
        } else {
            pushToCardsVC()
        }
    }
    
    fileprivate func showFetchErrorAlert() {
        presentAlert(withTitle: "We Passed Out!", message: "Sorry, we are having some trouble. Try again later!")
    }
    
    fileprivate func pushToCardsVC() {
        let cardsVC = UIStoryboard.init(name: "Main", bundle: Bundle.main).instantiateViewController(withIdentifier: StoryBoardID.CardsViewController) as? CardsViewController
        cardsVC?.players = players
        cardsVC?.allCards = cardsMapping[categories[selectedIndex.row].key]!
        self.navigationController?.pushViewController(cardsVC!, animated: true)
    }
}


// MARK: Network

extension CategoriesViewController {
    
    fileprivate func getCardsForCategory(category: String) {
        fetchState = .loading
        categoriesTableVC.allowsSelection = false
        playButton.showLoading()
        CanonicClient.sharedInstance().getCardForCategory(category: category) { [weak self] (cards) in
            self?.postCardFetchActions(state: .success, category: category, cards: cards)
        } faliure: { [weak self] (errorString) in
            self?.postCardFetchActions(state: .failure, category: category, cards: [Cards]())
        }
    }
    
    fileprivate func postCardFetchActions(state: Loading, category: String, cards: [Cards]) {
        DispatchQueue.main.async {
            switch state {
            case .success:
                self.fetchState = .success
                self.playButton.hideLoading()
                self.categoriesTableVC.allowsSelection = true
                self.cardsMapping[category] = cards
                self.pushToCardsVC()
                break
            case .failure:
                self.fetchState = .failure
                self.playButton.hideLoading()
                self.categoriesTableVC.allowsSelection = true
                self.showFetchErrorAlert()
                break
            case .loading:
                break
            }
        }
    }
}

