//
//  CanonicClient.swift
//  Flashy
//
//  Created by SimranJot on 09/05/21.
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
    
    func getAllCategories(success: @escaping (_ categories: [Category]) -> Void,
                          faliure: @escaping (_ error: String?) -> Void) {
        
        let requestURL = urlForRequest(pathExtension: DataPoints.categories)
        makeRequest(forURL: requestURL, requestMethod: .GET) { (data, response) in
            
            do {
                let categoriesList = try JSONDecoder().decode(Categories.self, from: data ?? Data())
                success(categoriesList.categories)
                
            } catch {
                print(error)
                faliure(error.localizedDescription)
                return
            }
        } faliure: { (errorString) in
            faliure(errorString)
        }
    }
    
    func getFlashListsForCategory(categoryId: String,
                                  success: @escaping (_ flashlists: [FlashList]) -> Void,
                                  faliure: @escaping (_ error: String?) -> Void) {
        
        let requestURL: URL = urlForRequest(pathExtension: "\(DataPoints.flashListsInCategory)\(categoryId)")
        makeRequest(forURL: requestURL, requestMethod: .GET) { (data, response) in
            
            do {
                let flashLists = try JSONDecoder().decode(FlashLists.self, from: data ?? Data())
                success(flashLists.flashLists)
            } catch {
                print(error)
                faliure(error.localizedDescription)
                return
            }
        } faliure: { (errorString) in
            faliure(errorString)
        }
    }
    
    
    func getCardsForList(listID: String,
                         success: @escaping (_ categories: [Card]) -> Void,
                         faliure: @escaping (_ error: String?) -> Void) {
        
        let requestURL: URL = urlForRequest(pathExtension: "\(DataPoints.cardsInList)\(listID)")
        makeRequest(forURL: requestURL, requestMethod: .GET) { (data, response) in
            
            do {
                let cardsList = try JSONDecoder().decode(Cards.self, from: data ?? Data())
                success(cardsList.cards)
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
        static let host = "flash-cards-96d5b8.staging.canonic.dev"
        static let path = "/api"
        
    }
    
    struct DataPoints {
        static let categories = "/categories/"
        static let flashListsInCategory = "/flashLists/category/"
        static let cardsInList = "/cards/list/"
    }
}
