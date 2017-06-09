//
//  DisplayMode.m
//  RNTodayWidgetExtension
//
//  Created by Matej Kriz on 07.06.17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "DisplayMode.h"

#import <NotificationCenter/NotificationCenter.h>
#import <Foundation/Foundation.h>

@implementation DisplayMode

static float maxHeight = 110;

NSExtensionContext* extensionContext;

// To export a module named DisplayMode
RCT_EXPORT_MODULE();

- (id)initWithContext:(NSExtensionContext*)context {
  self = [super init];
  extensionContext = context;
  return self;
}

+ (float)getMaxHeight {
  return maxHeight;
}

RCT_EXPORT_METHOD(setExpandable:(BOOL)expandable height:(float)height )
{
  maxHeight = height;
  if (expandable) {
    [extensionContext setWidgetLargestAvailableDisplayMode:NCWidgetDisplayModeExpanded];
  } else {
    [extensionContext setWidgetLargestAvailableDisplayMode:NCWidgetDisplayModeCompact];
  }
}

@end
