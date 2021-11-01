//
//  CanonicClient.swift
//  Canolo
//
//  Created by SimranJot on 20/02/21.
//

import Foundation

class CanonicClient: APIHelper {
    
    
    //MARK: Singleton Class
    
    private static var sharedManager = CanonicClient()
    
    class func sharedInstance() -> CanonicClient {
        return sharedManager
    }
    
    
    //MARK: Init Method
    
    init() {
        let apiUrlData = APIURLData(scheme: APIComponents.scheme,
                                    host: APIComponents.host,
                                    path: APIComponents.path)
        super.init(apiData: apiUrlData)
    }
    
    
    //MARK: Data Fetchers
    
    func getAllCategories(success: @escaping (_ categories: [Categories]) -> Void,
                          faliure: @escaping (_ error: String?) -> Void) {
        
        let requestURL = urlForRequest(pathExtension: DataPoints.categories)
        makeRequest(forURL: requestURL, requestMethod: .GET) { (data, response) in
                        
            do {
                let category = try JSONDecoder().decode(Category.self, from: data ?? Data())
                success(category.categories)
                
            } catch {
                print(error)
                faliure(error.localizedDescription)
                return
            }
        } faliure: { (errorString) in
            faliure(errorString)
        }
    }
    
    func getCardForCategory(categoryId: String,
                            success: @escaping (_ categories: [Cards]) -> Void,
                            faliure: @escaping (_ error: String?) -> Void) {
        
        let requestURL: URL = urlForRequest(pathExtension: "\(DataPoints.cardsWithCategory)\(categoryId)")
        makeRequest(forURL: requestURL, requestMethod: .GET) { (data, response) in
            
            do {
                let card = try JSONDecoder().decode(Card.self, from: data ?? Data())                
                success(card.cards)
            } catch {
                print(error)
                faliure(error.localizedDescription)
                return
            }
        } faliure: { (errorString) in
            faliure(errorString)
        }
    }
}

extension CanonicClient {
    
    struct APIComponents {
        static let scheme = "https"
        static let host = "canolo.staging.canonic.dev"
        static let path = "/api"
        
    }
    
    struct DataPoints {
        static let categories = "/categories/"
        static let cards = "/cards/"
        static let cardsWithCategory = "/cards/category/"
    }
}
