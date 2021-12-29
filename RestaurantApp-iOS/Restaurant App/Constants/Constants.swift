//
//  Constants.swift
//  Restaurant App
//
//  Created by SimranJot on 29/12/21.
//

import Foundation


struct StoryBoardID {
    static let RestaurantListingsViewController = "RestaurantListingsViewController"
    static let RestaurantMenuViewController = "RestaurantMenuViewController"
}

struct CellIdentifiers {
    static let RestaurantTableViewCell = "RestaurantTableViewCell"
    static let RestaurantMenuTableViewCell = "RestaurantMenuTableViewCell"
}

enum NetworkState {
    case success
    case loading
    case failure
}
