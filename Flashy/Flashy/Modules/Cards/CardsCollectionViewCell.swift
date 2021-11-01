//
//  CardsCollectionViewCell.swift
//  Flashy
//
//  Created by SimranJot on 20/05/21.
//

import UIKit

class CardsCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var titleLab: UILabel!
    @IBOutlet weak var descriptionLab: UILabel!
    
    override func layoutSubviews() {
        super.layoutSubviews()
        contentView.layer.cornerRadius = 8
        contentView.clipsToBounds = true
    }
    
    func configureCell(card: Card, reveal: Bool) {
        titleLab.text = card.title
        descriptionLab.text = card.description
        
        titleLab.isHidden = reveal
        descriptionLab.isHidden = !reveal        
    }
}
