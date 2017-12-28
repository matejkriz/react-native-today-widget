//
//  DisplayMode.m
//  RNTodayWidgetExtension
//
//  Created by Matej Kriz on 07.06.17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "Linking.h"

#import <NotificationCenter/NotificationCenter.h>
#import <Foundation/Foundation.h>

@implementation Linking


NSExtensionContext* extensionContext;

// To export a module named DisplayMode
RCT_EXPORT_MODULE();

- (id)initWithContext:(NSExtensionContext*)context {
  self = [super init];
  extensionContext = context;
  return self;
}

RCT_EXPORT_METHOD(openURL:(NSURL *)URL
completionHandler:(void (^)(BOOL success))completionHandler)
{
  [extensionContext openURL:URL];
}

@end
