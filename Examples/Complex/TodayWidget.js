// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DevMenu } from 'react-native-today-widget';
import CarsNearby from './components/CarsNearby';

const TodayWidget = () => (
  <View style={styles.container}>
    <CarsNearby />
    {__DEV__ && <DevMenu />
    /* Has to be a last element to be clickable,
      because it has absolute position */
    }
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TodayWidget;
