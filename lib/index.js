 /* @flow */
import { NativeModules } from 'react-native';
import DevMenu from './DevMenu';

export default {
  setExpandable: (expandable: boolean = true, maxHeight: number = 110) => {
    NativeModules.DisplayMode.setExpandable(expandable, maxHeight);
  },
  DevMenu,
};
