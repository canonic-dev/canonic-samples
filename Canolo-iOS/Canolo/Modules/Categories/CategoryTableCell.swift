//
//  CategoryTableCell.swift
//  Canolo
//
//  Created by SimranJot on 28/02/21.
//

import UIKit

class CategoryTableCell: UITableViewCell {
        
    @IBOutlet weak var categoryImage: UIImageView!
    @IBOutlet weak var categoryTitle: UILabel!    
    @IBOutlet weak var checkImage: UIImageView!
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    
    func configureCell(category: String, image: String, isSelected: Bool) {
        categoryTitle.text = category
        categoryImage.image = UIImage(systemName: image)
        checkImage.isHidden = !isSelected
    }
}
