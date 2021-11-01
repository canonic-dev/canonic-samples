//
//  FlashListTableViewCell.swift
//  Flashy
//
//  Created by SimranJot on 16/05/21.
//

import UIKit
import Alamofire
import AlamofireImage

class FlashListTableViewCell: UITableViewCell {
    
    @IBOutlet weak var coverImageView: UIImageView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!

    override func awakeFromNib() {
        super.awakeFromNib()
        coverImageView.contentMode = .scaleToFill
        contentView.backgroundColor = UIColor(rgb: 0xe1e5ea)
    }
    
    func configureCell(for list:FlashList) {
        titleLabel.text = list.name
        descriptionLabel.text = list.description
        
        let request = URLRequest(url: URL(string: (list.coverImage?.url)!)!)
        AF.request(request).responseImage { response in
            if case .success(let image) = response.result {
                self.coverImageView.image = image
                }
        }
    }
}
