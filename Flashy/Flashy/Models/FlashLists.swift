//
//  FlashLists.swift
//  Flashy
//
//  Created by SimranJot on 09/05/21.
//

import Foundation

// MARK: - FlashLists

struct FlashLists: Decodable {
    let flashLists: [FlashList]
    
    enum CodingKeys: String, CodingKey {
        case flashLists = "data"
    }
}

struct FlashList: Decodable {
    let id, name, description: String
    let coverImage: CoverImage?
    let category: Category
    
    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, description, coverImage, category
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        name = try container.decode(String.self, forKey: .name)
        description = try container.decode(String.self, forKey: .description)
        category = try container.decode(Category.self, forKey: .category)
        coverImage = try container.decodeIfPresent(CoverImage.self, forKey: .coverImage)
    }
}
