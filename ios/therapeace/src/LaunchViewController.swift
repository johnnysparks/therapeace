//
//  LaunchViewController.swift
//  therapeace
//
//  Created by John Sparks on 3/5/16.
//  Copyright © 2016 John Sparks. All rights reserved.
//

import Foundation
import UIKit
import SnapKit

extension UIView {
    func addSubviews(subviews:[UIView]) {
        subviews.forEach({ self.addSubview($0) })
    }
    
    convenience init(setup:((view:UIView) -> ())) {
        self.init(frame:CGRectZero)
        setup(view: self)
    }
}

extension UILabel {
    convenience init(setup:((view:UILabel) -> ())) {
        self.init(frame:CGRectZero)
        setup(view: self)
    }
}

extension UIImageView {
    convenience init(setup:((view:UIImageView) -> ())) {
        self.init(frame:CGRectZero)
        setup(view: self)
    }
}

protocol Navigator {
    func go(viewController:UIViewController)
    func back()
    func forward()
}

struct Session {
    
}

struct Client {
    
}



class SessionView: UIView {
}


let apiKey = "45517012"
let sessionId = "1_MX40NTUxNzAxMn5-MTQ1Njk5OTU0MTUzMH5KdWpZYTRPQXMwNnF0dXlwSFpNRzFEOHh-UH4"
let token = "T1==cGFydG5lcl9pZD00NTUxNzAxMiZzaWc9ZGJkNTkxZmVmNzRkZDQ1NjZiODQwOTBiNmUzNWRhNWYxMjNmYmRhNTpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5UVXhOekF4TW41LU1UUTFOams1T1RVME1UVXpNSDVLZFdwWllUUlBRWE13Tm5GMGRYbHdTRnBOUnpGRU9IaC1VSDQmY3JlYXRlX3RpbWU9MTQ1NzMzMTUwNiZub25jZT0wLjcyNjcxMjQ4NDk0ODY5NDImZXhwaXJlX3RpbWU9MTQ1NzQxNzkwNg=="

class LaunchViewController: UIViewController, OTSessionDelegate {
    
    let titleLabel = UILabel {
        $0.text = "Therapeace"
        $0.backgroundColor = UIColor.greenColor()
    }
    
    let sessionView = SessionView {
        $0.backgroundColor = UIColor.redColor()
    }
    
    var session:OTSession?
    var sessionError:OTError?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.backgroundColor = UIColor.whiteColor()
        view.addSubviews([sessionView, titleLabel])
        
        titleLabel.snp_makeConstraints { (make) -> Void in
            make.width.equalTo(view)
            make.height.equalTo(50)
        }
        
        sessionView.snp_makeConstraints { (make) -> Void in
            make.width.equalTo(view)
            make.height.equalTo(100)
            make.top.equalTo(100)
        }
        
        session = OTSession(apiKey: apiKey, sessionId: sessionId, delegate: self)
        
        session?.connectWithToken(token, error: &sessionError)
    }
    
    
    
    
    // MARK 
    /** @name Connecting to a session */
    
    /**
    * Sent when the client connects to the session.
    *
    * @param session The <OTSession> instance that sent this message.
    */
    func sessionDidConnect(session:OTSession) {
        print("\(sessionError)")
        pl()
    }
    
    /**
    * Sent when the client disconnects from the session.
    *
    * @param session The <OTSession> instance that sent this message.
    */
    func sessionDidDisconnect(session:OTSession) {
                print("\(sessionError)")
            pl()
    }
    
    /**
    * Sent if the session fails to connect, some time after your application
    * invokes [OTSession connectWithToken:].
    *
    * @param session The <OTSession> instance that sent this message.
    * @param error An <OTError> object describing the issue. The
    * `OTSessionErrorCode` enum
    * (defined in the OTError.h file) defines values for the `code` property of
    * this object.
    */
    func session(session:OTSession, didFailWithError error: OTError) {
               pl()
                print("\(sessionError)")
    }
    
    /** @name Monitoring streams in a session */
    
    /**
    * Sent when a new stream is created in this session.
    *
    * Note that if your application publishes to this session, your own session
    * delegate will not receive the [OTSessionDelegate session:streamCreated:]
    * message for its own published stream. For that event, see the delegate
    * callback [OTPublisherKit publisher:streamCreated:].
    *
    * @param session The OTSession instance that sent this message.
    * @param stream The stream associated with this event.
    */
    func session(session:OTSession, streamCreated stream:OTStream) {
                pl()
                print("\(sessionError)")
    }
    
    /**
    * Sent when a stream is no longer published to the session.
    *
    * @param session The <OTSession> instance that sent this message.
    * @param stream The stream associated with this event.
    */
    func session(session:OTSession, streamDestroyed stream:OTStream) {
                pl()
                print("\(sessionError)")
    }
    
    /**
    * Sent when the subscriber successfully connects to the stream.
    * @param subscriber The subscriber that generated this event.
    */
    func subscriberDidConnectToStream(subscriber subscriber:OTSubscriberKit) {
                pl()
                print("\(sessionError)")
    }
    
    /**
    * Sent if the subscriber fails to connect to its stream.
    * @param subscriber The subscriber that generated this event.
    * @param error The error (an <OTError> object) that describes this connection
    * error. The `OTSubscriberErrorCode` enum (defined in the OTError class)
    * defines values for the `code` property of this object.
    */
    func subscriber(subscriber:OTSubscriberKit, didFailWithError error:OTError) {
                pl()
                print("\(sessionError)")
    }
    
}
