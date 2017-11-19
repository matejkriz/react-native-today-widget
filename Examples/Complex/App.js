/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const instructions = Platform.select({
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
});

const App = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome to React Native!</Text>
    <Text style={styles.instructions}>To get started, edit App.js</Text>
    <Text style={styles.instructions}>{instructions}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
});

export default App;
