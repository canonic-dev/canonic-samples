//
//  Order.swift
//  Restaurant App
//
//  Created by SimranJot on 29/12/21.
//

import Foundation

struct Order: Codable {
    var restaurant: String
    var totalAmount: String
    var orderItems: [OrderItems]
    
    init() {
        restaurant = ""
        totalAmount = ""
        orderItems = []
    }
}

struct OrderItems: Codable {
    var item: String
    var quantity: String
}
