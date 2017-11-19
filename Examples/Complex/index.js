import { Platform, AppRegistry } from 'react-native';
import App from './App';
import TodayWidget from './TodayWidget';

if ('geolocation' in navigator) {
  navigator.geolocation.requestAuthorization();
}

AppRegistry.registerComponent('HoppyGoWidget', () => App);
if (Platform.OS === 'ios') {
  AppRegistry.registerComponent('TodayWidgetExtension', () => TodayWidget);
}
