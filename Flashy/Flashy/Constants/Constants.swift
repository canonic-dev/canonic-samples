//
//  Constants.swift
//  Flashy
//
//  Created by SimranJot on 09/05/21.
//

import Foundation


struct StoryBoardID {
    static let CategoriesViewController = "CategoriesViewController"
    static let FlashListViewController = "FlashListViewController"
    static let CardsViewController = "CardsViewController"
}

struct CellIdentifiers {
    static let CategoryTableCell = "CategoryTableCell"
    static let FlashListTableCell = "FlashListTableCell"
    static let CardTableCell = "CardTableCell"
}

enum NetworkState {
    case success
    case loading
    case failure
}
