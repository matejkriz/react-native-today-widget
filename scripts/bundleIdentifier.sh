#!/bin/bash

if [ -n "$1" ]
then
    echo "You provided CFBundleIdentifier: "$1
    BUNDLE_ID_NEW='"'$1'"'
else
    PACKAGE_NAME=$(sed -nE 's/^\s*"name": "(.*?)",$/\1/p' ../../package.json)
    PLIST_PATH_PARENT=$(pwd)/../../ios/${PACKAGE_NAME}/Info.plist

    echo "Reading CFBundleIdentifier from: "$PLIST_PATH_PARENT
    BUNDLE_ID=$(defaults read $PLIST_PATH_PARENT CFBundleIdentifier)

    WIDGET_EXT='.TodayWidgetExtension'
    BUNDLE_ID_NEW='"'$BUNDLE_ID$WIDGET_EXT'"'
fi
PLIST_PATH_LIBRARY=$(pwd)/ios/TodayWidgetExtension/Info.plist
echo "setting "$BUNDLE_ID_NEW" as CFBundleIdentifier for " $PLIST_PATH_LIBRARY
defaults write $PLIST_PATH_LIBRARY CFBundleIdentifier $BUNDLE_ID_NEW
