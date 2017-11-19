// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CarsNearby from './components/CarsNearby';

const TodayWidget = () => (
  <View style={styles.container}>
    <CarsNearby />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TodayWidget;
