//
//  PlayerListTableCell.swift
//  Canolo
//
//  Created by SimranJot on 22/02/21.
//

import UIKit

protocol PlayerListTableCellDelegate: AnyObject {
    func removeTapped(_ cell: PlayerListTableCell)
}

class PlayerListTableCell: UITableViewCell {

    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var deleteButton: UIButton!
    
    weak var delegate: PlayerListTableCellDelegate?
                
    @IBAction func deletePlayer(_ sender: Any) {
        self.delegate?.removeTapped(self)
    }
    
    func configureCell(name: String) {
        nameLabel.text = name
    }
    
    override func prepareForReuse() {
        super.prepareForReuse()
        self.delegate = nil
    }
}
