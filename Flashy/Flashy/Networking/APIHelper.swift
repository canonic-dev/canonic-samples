//
//  APIHelper.swift
//  Flashy
//
//  Created by SimranJot on 09/05/21.
//

import Foundation

//MARK: HTTP Request Method Enum

enum HTTPMethod: String {
    case GET, POST, PUT, DELETE
}


//MARK: APIUrlData

struct APIURLData {
    let scheme: String
    let host: String
    let path: String
}

class APIHelper {
    
    //MARK: Proprties
    
    fileprivate let session: URLSession
    fileprivate let URLData: APIURLData
    
    
    //MARK: Initializer
    
    init(apiData: APIURLData) {
        
        session = URLSession.shared
        URLData = apiData
    }
    
    
    //MARK: Data Request
    
    func makeRequest(forURL Url: URL, requestMethod: HTTPMethod, requestHeaders: [String:String]? = nil, requestBody: [String:AnyObject]? = nil,
                                                                        setCompletionClosureWithSuccess success: @escaping (_ data: Data?, _ response: URLResponse?) -> Void,
                                                                        faliure: @escaping (_ errorString: String) -> Void) {
        
        // Create request from passed URL
        var request = URLRequest(url: Url)
        request.httpMethod = requestMethod.rawValue
        
        // Add headers if present
        if let requestHeaders = requestHeaders {
            for (key, value) in requestHeaders {
                request.addValue(value, forHTTPHeaderField: key)
            }
        }
        
        // Add body if present
        if let requestBody = requestBody {
            request.httpBody = try! JSONSerialization.data(withJSONObject: requestBody, options: JSONSerialization.WritingOptions())
        }
        
        let task = session.dataTask(with: request) { (data, response, error) in
            
            guard error == nil else {
                faliure(error.debugDescription)
                return
            }
            
            guard let _ = data else {
                faliure(Errors.DataError)
                return
            }
            
            success(data as Data?, response)
        }
        
        task.resume()
    }
}


//MARK: Request Helper

extension APIHelper {
    
    func urlForRequest(apiMethod: String? = nil, pathExtension: String? = nil, parameters: [String : AnyObject]? = nil) -> URL {
        
        var components = URLComponents()
        components.scheme = URLData.scheme
        components.host = URLData.host
        components.path = URLData.path + (apiMethod ?? "") + (pathExtension ?? "")
        
        if let parameters = parameters {
            
            components.queryItems = [URLQueryItem]()
            
            for (key, value) in parameters {
                
                let queryItem = URLQueryItem(name: key, value: "\(value)")
                components.queryItems?.append(queryItem)
            }
        }
        
        return components.url!
    }
}

extension APIHelper {
    
    struct Errors {
        static let DataError = "Unable to get Data"
    }
}
