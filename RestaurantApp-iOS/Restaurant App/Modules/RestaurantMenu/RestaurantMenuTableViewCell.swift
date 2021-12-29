//
//  RestaurantMenuTableViewCell.swift
//  Restaurant App
//
//  Created by SimranJot on 29/12/21.
//

import UIKit
import Alamofire
import AlamofireImage

class RestaurantMenuTableViewCell: UITableViewCell {
    
    @IBOutlet weak var itemImageView: UIImageView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var priceLabel: UILabel!
    @IBOutlet weak var quatityLabel: UILabel!
    @IBOutlet weak var stepper: UIStepper!
    
    var menuItem: Menu = Menu()
    var delegate: OrderUpdates?
    
    override func awakeFromNib() {
        super.awakeFromNib()
        itemImageView.contentMode = .scaleToFill
    }
    
    @IBAction func stepperClicked(_ sender: UIStepper) {
        quatityLabel.text = "x\(String(format: "%.0f", sender.value))"        
        delegate?.updateOrder(menuItem: &menuItem, quantity: Int(sender.value))
    }
    
    func configureCell(for menu: Menu) {
        menuItem = menu
        titleLabel.text = menu.itemName
        descriptionLabel.text = menu.description
        priceLabel.text = "$\(menu.price)"
        quatityLabel.text = "x\(String(format: "%.0f", stepper.value))"
        
        
        guard let image = menu.itemImage else { return }
        guard let urlString = image.url else { return }

        let request = URLRequest(url: URL(string: urlString.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed)!)!)
        AF.request(request).responseImage { response in
            if case .success(let image) = response.result {
                self.itemImageView.image = image
            }
        }
    }
    
    override func prepareForReuse() {
        super.prepareForReuse()
        itemImageView.image = nil
    }
}

