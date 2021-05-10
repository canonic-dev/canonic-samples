//
//  AppDelegate.swift
//  Flashy
//
//  Created by SimranJot on 08/05/21.
//

import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {



    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
//        CanonicClient.sharedInstance().getAllCategories { (cagetories) in
//            print(cagetories)
//        } faliure: { (error) in
//            print(error ?? "")
//        }
//
//        CanonicClient.sharedInstance().getCardsForList(listID: "60965010d7a25b0009c792b0") { (cards) in
//            print(cards)
//        } faliure: { (error) in
//            print(error ?? "")
//        }

        
        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }


}

