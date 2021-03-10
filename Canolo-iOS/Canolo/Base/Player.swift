//
//  Player.swift
//  Canolo
//
//  Created by SimranJot on 22/02/21.
//

import Foundation

// MARK: - Player
struct Player: Codable {
    let name: String

    enum CodingKeys: String, CodingKey {
        case name
    }
}

enum Loading {
    case success
    case loading
    case failure
}
