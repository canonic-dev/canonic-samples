//
//  CategoriesViewController.swift
//  Flashy
//
//  Created by SimranJot on 09/05/21.
//

import UIKit

class CategoriesViewController: UIViewController {
    
    var categories: [Category] = []
    var fetchState: NetworkState = .loading
    
    
    @IBOutlet weak var loadingStackView: UIStackView!
    @IBOutlet weak var categoriesTableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        title = "Categories"
        fetchCategories()    
    }
}


// MARK: View Setup

extension CategoriesViewController {
    
    
    
}


// MARK: Helpers

extension CategoriesViewController {
    
    fileprivate func postCategoriesFetchActions() {
        switch fetchState {
        case .success:
            print("")
            break
        case .failure:
            print("")
            break
        default:
            break
        }
    }
}


// MARK: Networking

extension CategoriesViewController {
    
    fileprivate func fetchCategories() {
        fetchState = .loading
        CanonicClient.sharedInstance().getAllCategories { [weak self] (availableCategories) in
            self?.categories = availableCategories
            DispatchQueue.main.async {
                self?.postCategoriesFetchActions()
            }
        } faliure: { [weak self] (errorString) in
            DispatchQueue.main.async {
                self?.postCategoriesFetchActions()
            }
        }
    }
}
