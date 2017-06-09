//
//  DisplayMode.h
//  RNTodayWidgetExtension
//
//  Created by Matej Kriz on 07.06.17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>

@interface DisplayMode : NSObject <RCTBridgeModule>

- (id)initWithContext:(NSExtensionContext*)context;

+ (float)getMaxHeight;

@end
