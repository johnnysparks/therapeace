//
//  AppDelegate.swift
//  therapeace
//
//  Created by John Sparks on 3/5/16.
//  Copyright © 2016 John Sparks. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window:UIWindow? = UIWindow(frame: UIScreen.mainScreen().bounds)
    var launchViewController = LaunchViewController()

    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        window!.rootViewController = launchViewController
        window!.makeKeyAndVisible()
        return true
    }

    func applicationWillResignActive(application: UIApplication) { }

    func applicationDidEnterBackground(application: UIApplication) { }

    func applicationWillEnterForeground(application: UIApplication) { }

    func applicationDidBecomeActive(application: UIApplication) { }

    func applicationWillTerminate(application: UIApplication) { }
}

