//
//  GenericViews.swift
//  therapeace
//
//  Created by John Sparks on 3/5/16.
//  Copyright © 2016 John Sparks. All rights reserved.
//

import Foundation
import UIKit

class View<T>: UIView {
    
    init() {
        super.init(frame: CGRectZero)
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        translatesAutoresizingMaskIntoConstraints = true
    }
}

class Text<T>: UILabel {
    
}

class Image<T>: UIImageView {
    
}

struct Style {
    let backgroundColor:UIColor?
    let size:CGSize?
    let origin:CGPoint?
    let frame:CGRect?
    let padding:UIEdgeInsets?
    let margin:UIEdgeInsets?
}
