//
//  CardsViewController.swift
//  Canolo
//
//  Created by SimranJot on 28/02/21.
//

import UIKit

class CardsViewController: UIViewController {
    
    @IBOutlet weak var cardTitle: UILabel!
    @IBOutlet weak var cardDescription: UILabel!
    
    var players = [Player]()
    var allCards = [Cards]()
    var playingCards = [Cards]()
    
    override func viewDidLoad() {
        super.viewDidLoad()        
        navigationController?.navigationBar.isHidden = true
        
        setupTapGesture()
        playingCards = allCards.shuffled()
        setCard(card: getNextCard(), players: getPlayers())
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        Utility.lockOrientation(.landscape, andRotateTo: .landscapeRight)
        view.layoutIfNeeded()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        Utility.lockOrientation(.all)
        navigationController?.navigationBar.isHidden = false
    }
}


// MARK: View Setups

extension CardsViewController {
    
    fileprivate func setCard(card: Cards?, players: (playerOne: Player, playerTwo: Player)) {
        if let card = card {
            cardTitle.text = card.properties.cardType.value == "NORMAL" ? "" : "\(card.properties.cardType.label)!"
            cardDescription.text = card.statement.replacingOccurrences(of: "{{playerName}}", with: players.playerOne.name).replacingOccurrences(of: "{{playerBuddy}}", with: players.playerTwo.name)
        }
        else {
            cardTitle.text = "The End !!"
            cardDescription.text = ""
        }
        
        self.view.backgroundColor = getCardColor(card: card)
    }
    
    fileprivate func setupTapGesture() {
        let tap = UITapGestureRecognizer(target: self, action: #selector(nextCard))
        view.addGestureRecognizer(tap)
    }
}

// MARK: Actions

extension CardsViewController {
    
    @IBAction func crossClicked(_ sender: Any) {
        navigationController?.popViewController(animated: true)
    }
    
    @objc func nextCard() {
        setCard(card: getNextCard(), players: getPlayers())
    }
}


// MARK: Helpers

extension CardsViewController {
    
    fileprivate func getPlayers() -> (playerOne: Player, playerTwo: Player) {
        
        var playerOne, playerTwo: (player: Player?, index: Int)
        var allPlayers = players.shuffled()
        
        playerOne = getRandomPlayer(players: allPlayers)
        allPlayers.remove(at: playerOne.index)
        playerTwo = getRandomPlayer(players: allPlayers)
        return (playerOne.player!, playerTwo.player!)
    }
    
    fileprivate func getNextCard() -> Cards? {
        let cardDetails = getRandomCard()
        if let card = cardDetails.card {
            if isCardEligible(card) {
                return getNextCard()
            } else {
                playingCards.remove(at: cardDetails.index)
                return card
            }
        } else {
            return nil
        }
    }
    
    fileprivate func getRandomPlayer(players: [Player]) -> (player: Player?, index: Int) {
        if let nextPlayer = players.randomElement(),
           let index = players.firstIndex(where: { (player) -> Bool in
            player.name == nextPlayer.name
           }) {
            return (nextPlayer, index)
        } else {
            return (nil, 0)
        }
    }
    
    fileprivate func getRandomCard() -> (card: Cards?, index: Int) {
        if let nextCard = playingCards.randomElement(),
           let index = playingCards.firstIndex(where: { (card) -> Bool in
            card.id == nextCard.id
           }) {
            return (nextCard, index)
        } else {
            return (nil, 0)
        }
    }
    
    fileprivate func partnerCardPlayed(partnerCardId: String) -> Bool {
        if let _ = playingCards.firstIndex(where: { (card) -> Bool in
            card.id == partnerCardId
        }) {
            return false
        } else {
            return true
        }
    }
    
    fileprivate func isCardEligible(_ card: Cards) -> Bool {
        if card.properties.cardType.value == "VIRUS" &&
            card.properties.order?.value == "STOP" && !partnerCardPlayed(partnerCardId: card.properties.partnerCard!) {
            return true
        } else {
            return false
        }
    }
    
    fileprivate func getCardColor(card: Cards?) -> UIColor {
        switch card?.properties.cardType.value {
        case "NORMAL":
            return UIColor(rgb: 0x227093)
        case "VIRUS":
            return UIColor(rgb: 0xff5252)
        case "BOTTOMS_UP":
            return UIColor(rgb: 0xffb142)
        case "GAME":
            return UIColor(rgb: 0x218c74)
        default:
            return UIColor.systemIndigo
        }
    }
}
