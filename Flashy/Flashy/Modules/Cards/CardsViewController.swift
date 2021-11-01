//
//  CardsViewController.swift
//  Flashy
//
//  Created by SimranJot on 17/05/21.
//

import UIKit

class CardsViewController: UIViewController {
    
    var flashCards: [Card] = []
    var cardViewMapping = [String: Bool]()
    var list: FlashList!
    var fetchState: NetworkState = .loading

    @IBOutlet weak var retryButton: UIButton!
    @IBOutlet weak var revealButton: UIButton!
    @IBOutlet weak var retryStackView: UIStackView!
    @IBOutlet weak var loadingStackView: UIStackView!
    @IBOutlet weak var cardsCollectionView: UICollectionView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.backgroundColor = UIColor(rgb: 0xe1e5ea)
        setupRetryButtton()
        setupRevealButtton()
        setupCollectionView()
        
        updateViewState()
        fetchCards()
    }
}


// MARK: View Setup

extension CardsViewController {
    
    fileprivate func setupRetryButtton() {
        retryButton.layer.cornerRadius = 8
        retryButton.contentEdgeInsets = UIEdgeInsets(top: 10, left: 20, bottom: 10, right: 20)
    }
    
    fileprivate func setupRevealButtton() {
        revealButton.layer.cornerRadius = 8
        revealButton.contentEdgeInsets = UIEdgeInsets(top: 10, left: 40, bottom: 10, right: 40)
    }
    
    fileprivate func setupCollectionView() {
        cardsCollectionView.backgroundColor = .clear
        cardsCollectionView.isPagingEnabled = false
        cardsCollectionView.decelerationRate = .fast
        
        let layout = PagingCollectionViewFlowLayout()
        layout.scrollDirection = .horizontal
        layout.minimumInteritemSpacing = 0
        layout.minimumLineSpacing = 10
        layout.itemSize = CGSize(width: cardsCollectionView.frame.width - 40, height: cardsCollectionView.frame.height - 100)
        cardsCollectionView.collectionViewLayout = layout
    }
    
    fileprivate func updateViewState() {
        switch fetchState {
        case .success:
            revealButton.isHidden = false
            retryStackView.isHidden = true
            loadingStackView.isHidden = true
            cardsCollectionView.isHidden = false
            break;
            
        case .loading:
            revealButton.isHidden = true
            retryStackView.isHidden = true
            loadingStackView.isHidden = false
            cardsCollectionView.isHidden = true
            
        case .failure:
            revealButton.isHidden = true
            retryStackView.isHidden = false
            loadingStackView.isHidden = true
            cardsCollectionView.isHidden = true
            break
            
        }
    }
}


// MARK: Action Helpers

extension CardsViewController {
    
    fileprivate func postCardsFetchActions() {
        switch fetchState {
        case .success:
            cardsCollectionView.reloadSections(IndexSet(integer: 0))
            break
        default:
            break
        }
        updateViewState()
    }
    
    @IBAction func retryButtonTapped(_ sender: Any) {
        fetchCards()
        updateViewState()
    }
}


// MARK: UICollectionView Delegates

extension CardsViewController: UICollectionViewDataSource, UICollectionViewDelegate {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return flashCards.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: CellIdentifiers.FlashCardCollectionCell, for: indexPath) as! CardsCollectionViewCell
        cell.configureCell(card: flashCards[indexPath.row], reveal: cardViewMapping[flashCards[indexPath.row].id]!)
        return cell
    }
    
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        cardViewMapping[flashCards[indexPath.row].id] = !(cardViewMapping[flashCards[indexPath.row].id]!)
        collectionView.reloadItems(at: [indexPath])
    }
}


// MARK: Networking

extension CardsViewController {
        
    fileprivate func fetchCards() {
        fetchState = .loading
        
        CanonicClient.sharedInstance().getCardsForList(listID: list.id) { [weak self] cards in
            self?.flashCards = cards
            let _ = self?.flashCards.map { card in
                self?.cardViewMapping[card.id] = false
            }
            self?.fetchState = .success
            DispatchQueue.main.async {
                self?.postCardsFetchActions()
            }
        } faliure: { [weak self] errorString in
            self?.fetchState = .failure
            DispatchQueue.main.async {
                self?.postCardsFetchActions()
            }
        }
    }
}
