//
//  Util.swift
//  therapeace
//
//  Created by John Sparks on 3/6/16.
//  Copyright © 2016 John Sparks. All rights reserved.
//

import Foundation

func pl() {
    func s(string:String) -> NSString { return string as NSString }
    let file = s(s(__FILE__).lastPathComponent).stringByDeletingPathExtension
    print("\(__FUNCTION__) in \(file)")
}


