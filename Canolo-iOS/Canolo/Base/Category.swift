//
//  Category.swift
//  Canolo
//
//  Created by SimranJot on 20/02/21.
//

import Foundation

// MARK: - Category
struct Category: Decodable {
    let categories: [Categories]
    
    enum CodingKeys: String, CodingKey {
        case categories = "data"
    }
}

struct Categories: Decodable {
    let id, name, key: String
    
    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, key
    }
}
