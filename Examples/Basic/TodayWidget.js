import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DevMenu } from 'react-native-today-widget';

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
  widget: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const TodayWidget = () => (
  <View style={styles.container}>
    <View
      style={styles.widget}
    >
      <Text style={styles.welcome}>
      Hello basic world!
    </Text>
    </View>
    {__DEV__ && <DevMenu title="Developer Menu" />}
  </View>
);

export default TodayWidget;
