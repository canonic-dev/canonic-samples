//
//  Card.swift
//  Canolo
//
//  Created by SimranJot on 20/02/21.
//

import Foundation

// MARK: - Card
struct Card: Decodable {
    let cards: [Cards]
    
    enum CodingKeys: String, CodingKey {
        case cards = "data"
    }
}

// MARK: - Cards
struct Cards: Decodable {
    let id, statement: String
    let category: Categories
    let properties: Properties

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case statement, category, properties
    }
}

// MARK: - Properties
struct Properties: Decodable {
    let cardType: CardType
    let order: CardOrder?
    let partnerCard: String?
    
    enum CodingKeys: String, CodingKey {
        case cardType, order, partnerCard
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        cardType = try container.decode(CardType.self, forKey: .cardType)
        order = try container.decodeIfPresent(CardOrder.self, forKey: .order)
        partnerCard = try container.decodeIfPresent(String.self, forKey: .partnerCard)
    }
}

// MARK: - CardType
struct CardType: Decodable {
    let label, value: String

    enum CodingKeys: String, CodingKey {
        case label, value
    }
}

// MARK: - Card Order
struct CardOrder: Decodable {
    let label, value: String?

    enum CodingKeys: String, CodingKey {
        case label, value
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        label = try container.decodeIfPresent(String.self, forKey: .label)
        value = try container.decodeIfPresent(String.self, forKey: .value)
    }
}
