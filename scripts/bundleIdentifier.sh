#!/bin/bash

if [ -n "$1" ]
then
    echo "You provided CFBundleIdentifier: \n\e[7"$1"\n"
    BUNDLE_ID_NEW='"'$1'"'
else
    PACKAGE_NAME=$(sed -nE 's/^\s*"name": "(.*?)",$/\1/p' ../../package.json)
    PLIST_PATH=$(pwd)/ios/${PACKAGE_NAME}/Info.plist

    echo "Reading CFBundleIdentifier from: \n"$PLIST_PATH"\n"
    BUNDLE_ID=$(defaults read $PLIST_PATH CFBundleIdentifier)

    WIDGET_EXT='.TodayWidgetExtension'
    BUNDLE_ID_NEW='"'$BUNDLE_ID$WIDGET_EXT'"'
fi
echo "setting \e[7"$BUNDLE_ID_NEW"\e[24m as CFBundleIdentifier for TodayWidgetExtension\n"
defaults write $(pwd)/node_modules/react-native-today-widget/ios/TodayWidgetExtension/Info.plist CFBundleIdentifier $BUNDLE_ID_NEW
