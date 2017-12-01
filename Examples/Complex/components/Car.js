// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'darkgray',
    flex: 1,
    flexDirection: 'row',
    height: 55,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
