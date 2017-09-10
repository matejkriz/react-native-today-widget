/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import widget from 'react-native-today-widget';

export default class Expandable extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

class ExpandableTodayWidget extends Component {
  constructor() {
    super();
    const isExpandable = true;
    const maxHeight = 500;
    widget.setExpandable(isExpandable, maxHeight);
    this.onLayout = (event) => {
      const height = event.nativeEvent.layout.height;
      if (height <= 110) {
        console.log('widget is in compact mode');
      } else if (height > 110) {
        console.log('widget is in expanded mode');
      }
    };
  }

  render() {
    return (
      <View
        onLayout={this.onLayout}
        style={styles.widget}
      >
        <Text style={styles.welcome}>
          Hello expandable world!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  widget: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Expandable', () => Expandable);
AppRegistry.registerComponent('TodayWidgetExtension', () => ExpandableTodayWidget);
