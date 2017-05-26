#!/bin/bash

SCRIPT_PATH=$(dirname $(realpath -s $0))
PROJECT_PATH=$SCRIPT_PATH'/../../../'
LIBRARY_PATH=$SCRIPT_PATH'/../'

echo $PROJECT_PATH

if [ -n "$1" ]
then
    echo "You provided CFBundleIdentifier: "$1
    BUNDLE_ID_NEW='"'$1'"'
else
    PACKAGE_NAME=$(sed -nE 's/^\s*"name": "(.*?)",$/\1/p' $PROJECT_PATH'package.json')
    PLIST_PATH_PARENT=$PROJECT_PATH'ios/'${PACKAGE_NAME}'/Info.plist'

    echo "Reading CFBundleIdentifier from: "$PLIST_PATH_PARENT
    BUNDLE_IDENTIFIER=$(defaults read $PLIST_PATH_PARENT CFBundleIdentifier)
    BUNDLE_ID=${BUNDLE_IDENTIFIER/\$\(PRODUCT_NAME:rfc1034identifier\)/$PACKAGE_NAME}

    WIDGET_EXT='.TodayWidgetExtension'
    BUNDLE_ID_NEW='"'$BUNDLE_ID$WIDGET_EXT'"'
fi
PLIST_PATH_LIBRARY=$LIBRARY_PATH'ios/TodayWidgetExtension/Info.plist'
echo "setting "$BUNDLE_ID_NEW" as CFBundleIdentifier for " $PLIST_PATH_LIBRARY
defaults write $PLIST_PATH_LIBRARY CFBundleIdentifier $BUNDLE_ID_NEW
