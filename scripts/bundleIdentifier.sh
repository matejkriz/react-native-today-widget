#!/bin/bash

if [ -n "$1" ]
then
    echo "You provided CFBundleIdentifier: "$1
    BUNDLE_ID_NEW='"'$1'"'
else
    PACKAGE_NAME=$(sed -nE 's/^\s*"name": "(.*?)",$/\1/p' ../../package.json)
    PLIST_PATH=$(pwd)../../ios/${PACKAGE_NAME}/Info.plist

    echo "Reading CFBundleIdentifier from: "$PLIST_PATH
    BUNDLE_ID=$(defaults read $PLIST_PATH CFBundleIdentifier)

    WIDGET_EXT='.TodayWidgetExtension'
    BUNDLE_ID_NEW='"'$BUNDLE_ID$WIDGET_EXT'"'
fi
echo "setting "$BUNDLE_ID_NEW" as CFBundleIdentifier for TodayWidgetExtension"
defaults write $(pwd)/node_modules/react-native-today-widget/ios/TodayWidgetExtension/Info.plist CFBundleIdentifier $BUNDLE_ID_NEW
