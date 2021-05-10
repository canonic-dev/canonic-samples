//
//  Categories.swift
//  Flashy
//
//  Created by SimranJot on 09/05/21.
//

import Foundation

// MARK: - Categories

struct Categories: Decodable {
    let categories: [Category]
    
    enum CodingKeys: String, CodingKey {
        case categories = "data"
    }
}

struct Category: Decodable {
    let id, name, description: String
    let coverImage: CoverImage?
    let flashLists: [FlashList]
    
    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, description, coverImage
        case flashLists = "lists"
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        name = try container.decode(String.self, forKey: .name)
        description = try container.decode(String.self, forKey: .description)
        flashLists = try container.decode([FlashList].self, forKey: .flashLists)
        coverImage = try container.decodeIfPresent(CoverImage.self, forKey: .coverImage)
    }
}

struct CoverImage: Decodable {
    let url, alt, name: String?
    
    enum CodingKeys: String, CodingKey {
        case url, alt, name
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        url = try container.decodeIfPresent(String.self, forKey: .url)
        alt = try container.decodeIfPresent(String.self, forKey: .alt)
        name = try container.decodeIfPresent(String.self, forKey: .name)
    }
}
