//
//  RestaurantTableViewCell.swift
//  Restaurant App
//
//  Created by SimranJot on 29/12/21.
//

import UIKit
import Alamofire
import AlamofireImage

class RestaurantTableViewCell: UITableViewCell {
    
    @IBOutlet weak var brandImageView: UIImageView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!

    override func awakeFromNib() {
        super.awakeFromNib()
        brandImageView.contentMode = .scaleToFill
    }

    func configureCell(for restaurant: Restaurant) {
        titleLabel.text = restaurant.name
        descriptionLabel.text = restaurant.description
        
        guard let image = restaurant.brandImage else { return }
        guard let urlString = image.url else { return }
        let request = URLRequest(url: URL(string: urlString)!)
        AF.request(request).responseImage { response in
            if case .success(let image) = response.result {
                self.brandImageView.image = image
                }
        }
    }
}
