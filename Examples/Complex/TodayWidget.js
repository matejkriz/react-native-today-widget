// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DevMenu, setExpandable } from 'react-native-today-widget';
import config from './config';
import CarsNearby from './components/CarsNearby';

const isExpandable = true;
const maxHeight = config.rowHeight * (config.maxCountOfCars + 1);
setExpandable(isExpandable, maxHeight);

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
