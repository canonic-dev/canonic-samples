//
//  RestaurantListingsViewController.swift
//  Restaurant App
//
//  Created by SimranJot on 29/12/21.
//

import UIKit
import Alamofire

class RestaurantListingsViewController: UIViewController {
    
    var restaurants: [Restaurant] = []
    var fetchState: NetworkState = .loading
    
    @IBOutlet weak var retryButton: UIButton!
    @IBOutlet weak var retryStackView: UIStackView!
    @IBOutlet weak var loadingStackView: UIStackView!
    @IBOutlet weak var restaurantsTableView: UITableView!

    override func viewDidLoad() {
        super.viewDidLoad()
        
        title = "Restaurants"
                
        setupRetryButtton()
        setupTableView()
        
        updateViewState()
        fetchRestaurants()
    }
}

// MARK: View Setup

extension RestaurantListingsViewController {
    
    fileprivate func setupRetryButtton() {
        retryButton.layer.cornerRadius = 8
        retryButton.configuration?.contentInsets = NSDirectionalEdgeInsets(top: 10, leading: 20, bottom: 10, trailing: 20)
    }
    
    fileprivate func setupTableView() {
        restaurantsTableView.backgroundColor = .clear
        restaurantsTableView.tableFooterView = UIView()
    }
    
    fileprivate func updateViewState() {
        switch fetchState {
        case .success:
            retryStackView.isHidden = true
            loadingStackView.isHidden = true
            restaurantsTableView.isHidden = false
            break;
            
        case .loading:
            retryStackView.isHidden = true
            loadingStackView.isHidden = false
            restaurantsTableView.isHidden = true
            
        case .failure:
            retryStackView.isHidden = false
            restaurantsTableView.isHidden = true
            loadingStackView.isHidden = true
            break
            
        }
    }
}


// MARK: Action Helpers

extension RestaurantListingsViewController {
    
    @IBAction func retryTapped(_ sender: Any) {
        fetchRestaurants()
        updateViewState()
    }
    
    fileprivate func postRestaurantFetchActions() {
        switch fetchState {
        case .success:
            restaurantsTableView.reloadSections(IndexSet(integer: 0), with: .bottom)
            break
        default:
            break
        }
        updateViewState()
    }
    
    fileprivate func pushToRestaurantMenuVC(for restaurant: Restaurant) {
        let restaurantMenuVC = UIStoryboard.init(name: "Main", bundle: Bundle.main).instantiateViewController(withIdentifier: StoryBoardID.RestaurantMenuViewController) as! RestaurantMenuViewController
        restaurantMenuVC.restaurant = restaurant
        self.navigationController?.pushViewController(restaurantMenuVC, animated: true)
    }
}

// MARK: TableView Delegates

extension RestaurantListingsViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {        
        return restaurants.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: CellIdentifiers.RestaurantTableViewCell, for: indexPath) as! RestaurantTableViewCell
        cell.configureCell(for: restaurants[indexPath.row])
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        pushToRestaurantMenuVC(for: restaurants[indexPath.row])
    }
}


// MARK: Networking

extension RestaurantListingsViewController {
    
    fileprivate func fetchRestaurants() {
        fetchState = .loading
        AF.request("https://restaurant-app.can.canonic.dev/api/restaurants")
          .validate()
          .responseDecodable(of: Restaurants.self) { [weak self] (response) in
            guard let availableRestaurants = response.value else { return }
              self?.restaurants = availableRestaurants.restaurants
              self?.fetchState = (response.error != nil) ? .failure : .success
              DispatchQueue.main.async {
                  self?.postRestaurantFetchActions()
              }
          }
    }
}
