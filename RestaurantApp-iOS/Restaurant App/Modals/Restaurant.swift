//
//  Restaurant.swift
//  Restaurant App
//
//  Created by SimranJot on 29/12/21.
//

import Foundation

struct Restaurants: Codable {
    let restaurants: [Restaurant]
    
    enum CodingKeys: String, CodingKey {
        case restaurants = "data"
    }
}

struct Restaurant: Codable {
    var id, name, description: String
    let brandImage: BrandImage?
    
    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, description, brandImage
    }
    
    init() {
        
        id = ""
        name = ""
        description = ""
        brandImage = BrandImage()
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        name = try container.decode(String.self, forKey: .name)
        description = try container.decode(String.self, forKey: .description)
        brandImage = try container.decodeIfPresent(BrandImage.self, forKey: .brandImage)
    }
}

struct BrandImage: Codable {
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
