 /* @flow */
import { NativeModules } from 'react-native';

export default {
  setExpandable: (expandable: boolean = true, maxHeight: number = 110) => {
    NativeModules.DisplayMode.setExpandable(expandable, maxHeight);
  },
};
