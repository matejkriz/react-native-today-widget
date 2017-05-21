/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const RNTodayWidgetExtension = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to React Native Extension!
    </Text>
  </View>
);

const TodayWidget = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to React Native Widget!
    </Text>
  </View>
);

AppRegistry.registerComponent('RNTodayWidgetExtension', () => RNTodayWidgetExtension);
AppRegistry.registerComponent('TodayWidget', () => TodayWidget);
