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

NSExtensionContext* widgetContext;

// To export a module named Linking
RCT_EXPORT_MODULE();

- (id)initWithContext:(NSExtensionContext*)context {
  self = [super init];
  widgetContext = context;
  return self;
}

RCT_EXPORT_METHOD(openURL:(NSURL *)url )
{
  [widgetContext openURL:url completionHandler:nil];
}

@end
