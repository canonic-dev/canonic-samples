//
//  Menu.swift
//  Restaurant App
//
//  Created by SimranJot on 29/12/21.
//

import Foundation

struct Menus: Codable {
    let menus: [Menu]
    
    enum CodingKeys: String, CodingKey {
        case menus = "data"
    }
}

struct Menu: Codable {
    var id, itemName, description, price: String
    let itemImage: ItemImage?
    
    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case itemName, description, itemImage, price
    }
    
    init() {
        itemName = ""
        description = ""
        price = ""
        id = ""
        itemImage = ItemImage()
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        itemName = try container.decode(String.self, forKey: .itemName)
        description = try container.decode(String.self, forKey: .description)
        itemImage = try container.decodeIfPresent(ItemImage.self, forKey: .itemImage)
        price = try container.decode(String.self, forKey: .price)
    }
}

struct ItemImage: Codable {
    let url, alt, name: String?
    
    enum CodingKeys: String, CodingKey {
        case url, alt, name
    }
    
    init() {
        url = ""
        alt = ""
        name = ""
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        url = try container.decodeIfPresent(String.self, forKey: .url)
        alt = try container.decodeIfPresent(String.self, forKey: .alt)
        name = try container.decodeIfPresent(String.self, forKey: .name)
    }
}
