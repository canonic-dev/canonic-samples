//
//  LoadingButton.swift
//  Canolo
//
//  Created by SimranJot on 27/02/21.
//

import UIKit

class LoadingButton: UIButton {
    
    var originalButtonText: String?
    var activityIndicator: UIActivityIndicatorView!
    
    @IBInspectable
    let activityIndicatorColor: UIColor = .lightGray
    
    override func layoutSubviews() {
        super.layoutSubviews()
        NSLayoutConstraint.activate([widthAnchor.constraint(equalToConstant: frame.width)])
        
        if (activityIndicator == nil) {
            activityIndicator = createActivityIndicator()
        }
        
        originalButtonText = titleLabel?.text
    }

    func showLoading() {
        if !activityIndicator.isAnimating {
            setTitle("", for: .normal)
            showSpinning()
            self.isEnabled = false
        }
    }
    
    func hideLoading() {
        if activityIndicator.isAnimating {
            setTitle(originalButtonText, for: .normal)
            activityIndicator.stopAnimating()
            self.isEnabled = true
        }
    }
    
    private func createActivityIndicator() -> UIActivityIndicatorView {
        let activityIndicator = UIActivityIndicatorView()
        activityIndicator.hidesWhenStopped = true
        activityIndicator.color = activityIndicatorColor
        return activityIndicator
    }
    
    private func showSpinning() {
        activityIndicator.translatesAutoresizingMaskIntoConstraints = false
        addSubview(activityIndicator)
        centerActivityIndicatorInButton()
        activityIndicator.startAnimating()
    }
    
    private func centerActivityIndicatorInButton() {
        NSLayoutConstraint.activate([activityIndicator.centerXAnchor.constraint(equalTo: centerXAnchor, constant: 0),
                                     activityIndicator.centerYAnchor.constraint(equalTo: centerYAnchor, constant: 0)])
    }
    
}
