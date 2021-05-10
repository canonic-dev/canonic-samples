//
//  Cards.swift
//  Flashy
//
//  Created by SimranJot on 09/05/21.
//

import Foundation

// MARK: - Cards
struct Cards: Decodable {
    let cards: [Card]
    
    enum CodingKeys: String, CodingKey {
        case cards = "data"
    }
}

// MARK: - Card
struct Card: Decodable {
    let id, title, description: String

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case title, description
        
    }
}
