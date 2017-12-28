//
//  DisplayMode.h
//  RNTodayWidgetExtension
//
//  Created by Matej Kriz on 07.06.17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>

@interface Linking : NSObject <RCTBridgeModule>

- (void)openURL:(NSURL *)URL
completionHandler:(void (^)(BOOL success))completionHandler;

@end
