/* @flow */
import { NativeModules } from 'react-native';
import DevMenuComponent from './DevMenu';

export const DevMenu = DevMenuComponent;

export const setExpandable = (expandable: boolean = true, maxHeight: number = 110) => {
  NativeModules.DisplayMode.setExpandable(expandable, maxHeight);
};
