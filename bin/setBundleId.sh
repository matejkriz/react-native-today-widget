#!/bin/bash

SCRIPT_PATH=$(dirname $(realpath -s $0))
LIBRARY_PATH=$SCRIPT_PATH'/../'

WIDGET_EXT='.TodayWidgetExtension'

if [ -n "$1" ]
then
    echo "You provided CFBundleIdentifier: "$1
    BUNDLE_ID_NEW='"'$1$WIDGET_EXT'"'
    PLIST_PATH_LIBRARY=$LIBRARY_PATH'react-native-today-widget/ios/TodayWidgetExtension/Info.plist'
else
    PROJECT_PATH=$SCRIPT_PATH'/../../../'

    PACKAGE_NAME=$(sed -nE 's/^\s*"name": "(.*?)",$/\1/p' $PROJECT_PATH'package.json')
    PLIST_PATH_PARENT=$PROJECT_PATH'ios/'${PACKAGE_NAME}'/Info.plist'

    echo "Reading CFBundleIdentifier from: "$PLIST_PATH_PARENT
    BUNDLE_IDENTIFIER=$(defaults read $PLIST_PATH_PARENT CFBundleIdentifier)
    BUNDLE_ID=${BUNDLE_IDENTIFIER/\$\(PRODUCT_NAME:rfc1034identifier\)/$PACKAGE_NAME}


    BUNDLE_ID_NEW='"'$BUNDLE_ID$WIDGET_EXT'"'
    PLIST_PATH_LIBRARY=$LIBRARY_PATH'ios/TodayWidgetExtension/Info.plist'
fi

echo "setting "$BUNDLE_ID_NEW" as CFBundleIdentifier for " $PLIST_PATH_LIBRARY
defaults write $PLIST_PATH_LIBRARY CFBundleIdentifier $BUNDLE_ID_NEW
