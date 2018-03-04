import { AppRegistry, Platform } from 'react-native';
import App from './App';
import TodayWidget from './TodayWidget';

AppRegistry.registerComponent('Basic', () => App);
if (Platform.OS === 'ios') {
  AppRegistry.registerComponent('TodayWidgetExtension', () => TodayWidget);
}
