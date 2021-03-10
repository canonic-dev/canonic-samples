//
//  AddPlayersViewController.swift
//  Canolo
//
//  Created by SimranJot on 20/02/21.
//

import UIKit

class AddPlayersViewController: UIViewController, UITableViewDelegate {
    
    @IBOutlet weak var nametextField: UITextField!
    @IBOutlet weak var addPlayerButton: UIButton!
    @IBOutlet weak var playersTableView: UITableView!       
    @IBOutlet weak var getStartedButton: LoadingButton!
    
    var players: [Player] = []
    var categories: [Categories] = []
    var fetchState: Loading = .loading
    var navigateToCategories: Bool = false
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemIndigo
                
        setupNameTextField()
        setupTableView()
        setupGetStartedButton()
        getAllCategories()
        registerForKeyboardNotifications()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        Utility.lockOrientation(.portrait)
    }
    
    deinit {
        deregisterFromKeyboardNotifications()
    }
}


// MARK: View Setup

extension AddPlayersViewController {
    
    fileprivate func setupNameTextField() {
        nametextField.delegate = self
        nametextField.attributedPlaceholder = NSAttributedString(string: "Enter Name",
                                                                 attributes: [NSAttributedString.Key.foregroundColor: UIColor.white.withAlphaComponent(0.3)])        
    }
    
    fileprivate func setupTableView() {
        playersTableView.delegate = self
        playersTableView.dataSource = self
        playersTableView.tableFooterView = UIView()
    }
    
    fileprivate func setupGetStartedButton() {        
        getStartedButton.layer.cornerRadius = 8
        getStartedButton.layer.borderWidth = 0.7
        getStartedButton.setTitleColor(.lightGray, for: .disabled)
        getStartedButton.layer.borderColor = UIColor.white.withAlphaComponent(0.85).cgColor
        getStartedButton.contentEdgeInsets = UIEdgeInsets(top: 10, left: 10, bottom: 10, right: 10)
    }
}


// MARK: Table Delegates

extension AddPlayersViewController: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return players.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: CellIdentifiers.PlayersTableCell, for: indexPath) as! PlayerListTableCell
        cell.configureCell(name: players[indexPath.row].name)
        cell.delegate = self
        return cell
    }
}


// MARK: Textfield Delegates

extension AddPlayersViewController: UITextFieldDelegate {
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        addPlayer()
        return true
    }    
}


// MARK: Player List Helpers

extension AddPlayersViewController: PlayerListTableCellDelegate {
    
    internal func removeTapped(_ cell: PlayerListTableCell) {
        guard let indexPath = self.playersTableView.indexPath(for: cell) else { return }
        players.remove(at: indexPath.row)
        removePlayerInTable(table: playersTableView, at: indexPath.row)
    }
    
    fileprivate func playerExists(_ name: String) -> Bool {
        return players.filter { (player) -> Bool in
            player.name == name
        }.count > 0
    }
    
    fileprivate func insertPlayerInTable(table: UITableView, at row: Int) {
        let indexPath = IndexPath(row: row, section: 0)
        playersTableView.beginUpdates()
        playersTableView.insertRows(at: [indexPath], with: .fade)
        playersTableView.endUpdates()
        playersTableView.scrollToRow(at: indexPath, at: .top, animated: true)
    }
    
    fileprivate func removePlayerInTable(table: UITableView, at row: Int) {
        playersTableView.beginUpdates()
        playersTableView.deleteRows(at: [IndexPath(row: row, section: 0)], with: .fade)
        playersTableView.endUpdates()
    }
    
    @IBAction fileprivate func addPlayer(_ sender: Any? = nil) {
        guard let name = nametextField.text else { return }
        
        let trimmedName = name.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmedName.count > 0 {
            if playerExists(trimmedName) {
                presentAlert(withTitle: "Are you drunk already?", message: "You already enterted this player 🤦🏻‍♂️")
            } else {
                players.append(Player(name: trimmedName))
                insertPlayerInTable(table: playersTableView, at: players.count - 1)
                nametextField.text = ""
            }
        }
    }
}


// MARK: Navigation

extension AddPlayersViewController {
    
    @IBAction func getStartedClicked(_ sender: LoadingButton?) {        
        if players.count < 1 {
            presentAlert(withTitle: "Are you drunk already?", message: "You need minimum 2 players to Get Started!")
        } else {
            navigateToCategories = true
            getStarted()
        }
    }
    
    fileprivate func getStarted() {
        switch fetchState {
        case .success:
            pushToCategories()
            break
        case .failure:
            showFetchErrorAlert()
            break
        case .loading:
            getStartedButton.showLoading()
            break
        }
    }
    
    fileprivate func pushToCategories() {
        
        let categoriesVC = UIStoryboard.init(name: "Main", bundle: Bundle.main).instantiateViewController(withIdentifier: StoryBoardID.CategoriesViewController) as? CategoriesViewController
        categoriesVC?.players = players
        categoriesVC?.categories = categories
        self.navigationController?.pushViewController(categoriesVC!, animated: true)
    }
    
    fileprivate func showFetchErrorAlert() {
        presentAlert(withTitle: "We Passed Out!", message: "Sorry, we are having some trouble. Try again later!")
    }
}


// MARK: Networking

extension AddPlayersViewController {
    
    fileprivate func getAllCategories() {
        fetchState = .loading
        CanonicClient.sharedInstance().getAllCategories { [weak self] (categories) in
            self?.categories = categories
            self?.fetchState = .success
            self?.navigateIfNeeded()
        } faliure: { [weak self] (errorString) in
            self?.fetchState = .failure
            self?.navigateIfNeeded()
        }
    }
    
    fileprivate func navigateIfNeeded() {
        DispatchQueue.main.async {
            self.getStartedButton.hideLoading()
            if self.navigateToCategories {
                self.getStarted()
            }
        }
    }
}


// MARK: Keyboard Handling

extension AddPlayersViewController {
    
    func registerForKeyboardNotifications(){
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWasShown(notification:)), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillBeHidden(notification:)), name: UIResponder.keyboardWillHideNotification, object: nil)
    }

    func deregisterFromKeyboardNotifications(){
        NotificationCenter.default.removeObserver(self, name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.removeObserver(self, name: UIResponder.keyboardWillHideNotification, object: nil)
    }

    @objc func keyboardWasShown(notification: NSNotification){
        let info = notification.userInfo!
        let keyboardSize = (info[UIResponder.keyboardFrameBeginUserInfoKey] as? NSValue)?.cgRectValue.size
        let duration = notification.userInfo?[UIResponder.keyboardAnimationDurationUserInfoKey] as! Double
        let contentInsets : UIEdgeInsets = UIEdgeInsets(top: 0.0, left: 0.0, bottom: keyboardSize!.height - 70, right: 0.0)
        
        UIView.animate(withDuration: duration) {
            self.playersTableView.contentInset = contentInsets
            self.playersTableView.scrollIndicatorInsets = self.playersTableView.contentInset
        }
    }

    @objc func keyboardWillBeHidden(notification: NSNotification){
        let duration = notification.userInfo?[UIResponder.keyboardAnimationDurationUserInfoKey] as! Double
        let contentInsets : UIEdgeInsets = UIEdgeInsets(top: 0.0, left: 0.0, bottom: 0.0, right: 0.0)
        
        UIView.animate(withDuration: duration) {
            self.playersTableView.contentInset = contentInsets
            self.playersTableView.scrollIndicatorInsets = self.playersTableView.contentInset
        }
    }
}
