//
//  RestaurantMenuViewController.swift
//  Restaurant App
//
//  Created by SimranJot on 29/12/21.
//

import UIKit
import Alamofire

protocol OrderUpdates {
    func updateOrder( menuItem: inout Menu, quantity: Int)
}

class RestaurantMenuViewController: UIViewController {
    
    var restaurant: Restaurant!
    var menuItems: [Menu] = []
    var orderSummary = Order()
    var fetchState: NetworkState = .loading
    
    
    @IBOutlet weak var retryButton: UIButton!
    @IBOutlet weak var retryStackView: UIStackView!
    @IBOutlet weak var loadingStackView: UIStackView!
    @IBOutlet weak var menuTableView: UITableView!
    @IBOutlet weak var placeOrderButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        title = restaurant.name
        orderSummary.restaurant = restaurant.id
        
        setupRetryButtton()
        setupTableView()
        
        updateViewState()
        updatePlaceOrderButton()
        fetchMenu()
    }
}

// MARK: View Setup

extension RestaurantMenuViewController {
    
    fileprivate func setupRetryButtton() {
        retryButton.layer.cornerRadius = 8
        retryButton.configuration?.contentInsets = NSDirectionalEdgeInsets(top: 10, leading: 20, bottom: 10, trailing: 20)
    }
    
    fileprivate func setupTableView() {
        menuTableView.backgroundColor = .clear
        menuTableView.tableFooterView = UIView()
        menuTableView.contentInset = UIEdgeInsets(top: 0, left: 0, bottom: 100, right: 0)
    }
    
    fileprivate func updateViewState() {
        switch fetchState {
        case .success:
            retryStackView.isHidden = true
            loadingStackView.isHidden = true
            menuTableView.isHidden = false
            break;
            
        case .loading:
            retryStackView.isHidden = true
            loadingStackView.isHidden = false
            menuTableView.isHidden = true
            break;
            
        case .failure:
            retryStackView.isHidden = false
            menuTableView.isHidden = true
            loadingStackView.isHidden = true
            break;
            
        }
    }
    
}


// MARK: Action Helpers

extension RestaurantMenuViewController {
    
    @IBAction func retryTapped(_ sender: Any) {
        fetchMenu()
        updateViewState()
    }
    
    @IBAction func placeOrderClicked(_ sender: Any) {
        let jsonData = try! JSONEncoder().encode(orderSummary)
        let json = try? JSONSerialization.jsonObject(with: jsonData, options: [.topLevelDictionaryAssumed]) as? [String: Any]
        let parameters = ["input": json]
        placeOrder(parameters: parameters as [String : Any])
    }
    
    fileprivate func updatePlaceOrderButton() {
        let amount = getTotalAmount()
        placeOrderButton.setTitle("Place Order: $\(amount)", for: .normal)
        placeOrderButton.setTitle("Place Order", for: .disabled)
        placeOrderButton.isHidden = !(amount > 0.0)
    }
    
    fileprivate func postMenuFetchActions() {
        switch fetchState {
        case .success:
            menuTableView.reloadSections(IndexSet(integer: 0), with: .bottom)
            break
        default:
            break
        }
        updateViewState()
    }
    
    fileprivate func getItemPrice(itemId: String) -> Double {
        let item = menuItems.first { item in
            item.id == itemId
        }
        
        return (Double(item!.price) ?? 0.0)
    }
    
    fileprivate func getTotalAmount() -> Double {
        return orderSummary.orderItems.reduce(0.0) { result, orderItem in
            result + (getItemPrice(itemId: orderItem.item) * (Double(orderItem.quantity) ?? 0.0))
        }
    }
}

// MARK: TableView Delegates

extension RestaurantMenuViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return menuItems.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: CellIdentifiers.RestaurantMenuTableViewCell, for: indexPath) as! RestaurantMenuTableViewCell
        cell.delegate = self
        cell.selectionStyle = .none
        cell.configureCell(for: menuItems[indexPath.row])
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
    }
}


// MARK: Order Update Delegates

extension RestaurantMenuViewController: OrderUpdates {
    
    internal func updateOrder( menuItem: inout Menu, quantity: Int) {
        if let row = orderSummary.orderItems.firstIndex(where: {$0.item == menuItem.id}) {
            if (quantity == 0) {
                orderSummary.orderItems.remove(at: row)
            } else {
                orderSummary.orderItems[row].quantity = "\(quantity)"
            }
        } else {
            orderSummary.orderItems.append(OrderItems(item: menuItem.id, quantity: "\(quantity)"))
        }
        
        orderSummary.totalAmount = "\(getTotalAmount())"
        updatePlaceOrderButton()
    }
}

// MARK: Networking

extension RestaurantMenuViewController {
    
    fileprivate func fetchMenu() {
        fetchState = .loading
        AF.request("https://restaurant-app.can.canonic.dev/api/menus")
            .validate()
            .responseDecodable(of: Menus.self) { [weak self] (response) in
                guard let availableMenus = response.value else { return }
                self?.menuItems = availableMenus.menus
                self?.fetchState = (response.error != nil) ? .failure : .success
                DispatchQueue.main.async {
                    self?.postMenuFetchActions()
                }
            }
    }
    
    fileprivate func placeOrder(parameters: [String: Any]) {
        fetchState = .loading
        updateViewState()
        AF.request("https://restaurant-app.can.canonic.dev/api/orders", method: .post, parameters: parameters as Parameters, encoding: JSONEncoding.default)
            .responseData { [weak self] response in
                if ((response.value) != nil) {                    
                    DispatchQueue.main.async {
                        self?.presentAlert(withTitle: "Order Placed 🥳", message: "Sit Tight, your order has been received!")
                        self?.orderSummary = Order()
                        self?.orderSummary.restaurant = (self?.restaurant.id)!
                        self?.updatePlaceOrderButton()
                        self?.fetchState = .success
                        self?.updateViewState()
                        self?.menuTableView.reloadSections(IndexSet(integer: 0), with: .bottom)
                    }
                } else {
                    DispatchQueue.main.async {
                        self?.presentAlert(withTitle: "Oops!", message: "Something went wrong, try again later!")
                        self?.updateViewState()
                        self?.fetchState = .failure
                    }
                }
            }
    }
}

