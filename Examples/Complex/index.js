import { Platform, AppRegistry } from 'react-native';
import App from './App';
import TodayWidget from './TodayWidget';

AppRegistry.registerComponent('HoppyGoWidget', () => App);
if (Platform.OS === 'ios') {
  AppRegistry.registerComponent('TodayWidgetExtension', () => TodayWidget);
}
