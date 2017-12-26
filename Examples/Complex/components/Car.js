// @flow
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import config from '../config';

type CarProps = {
  manufacturer: string,
  model: string,
  price: string,
};

const Car = ({ manufacturer, model, price }: CarProps) => (
  <View style={styles.container}>
    <Text style={styles.header} numberOfLines={1}>
      {`${manufacturer} ${model}`}
    </Text>
    <Text style={[styles.header, styles.price]}>{price}</Text>
  </View>
);

const { width } = Dimensions.get('window');
const paddingHorizontal = 16;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'darkgray',
    flexDirection: 'row',
    height: config.rowHeight,
    justifyContent: 'space-between',
    paddingHorizontal,
    width: width - paddingHorizontal,
  },
  header: {
    color: '#2d2d2d',
    flex: 2,
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
});

export default Car;
