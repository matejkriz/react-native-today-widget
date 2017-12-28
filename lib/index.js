/* @flow */
import { NativeModules } from 'react-native';
import DevMenuComponent from './DevMenu';

export const DevMenu = DevMenuComponent;

export const setExpandable = (
  expandable: boolean = true,
  maxHeight: number = 110,
) => {
  if (NativeModules && NativeModules.DisplayMode) {
    NativeModules.DisplayMode.setExpandable(expandable, maxHeight);
  }
};

export const openURL = (url: string) => {
  NativeModules.Linking.openURL(url);
};
