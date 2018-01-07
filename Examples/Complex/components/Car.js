// @flow
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import config from '../config';
import { openInApp } from '../lib/openInApp';

type CarProps = {
  id: number,
  manufacturer: string,
  model: string,
  price: string,
};

const Car = ({ id, manufacturer, model, price }: CarProps) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={() => openInApp({ id: `${config.inappLinks.car}${id}` })}
    >
      <View style={styles.viewContainer}>
        <Text style={styles.header} numberOfLines={1}>
          {`${manufacturer} ${model}`}
        </Text>
        <Text style={[styles.header, styles.price]}>{price}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: 'darkgray',
    flex: 1,
    minHeight: config.rowHeight,
    paddingHorizontal: config.paddingHorizontal,
  },
  header: {
    color: '#2d2d2d',
    flex: 3,
    fontSize: 16,
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
  viewContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: config.rowHeight,
  },
});

export default Car;
