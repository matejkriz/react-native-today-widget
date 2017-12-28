// @flow
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import config from '../config';
import { openURL } from 'react-native-today-widget';

type CarProps = {
  id: string,
  manufacturer: string,
  model: string,
  price: string,
};

const openInApp = ({ id }) => {
  const url = `${config.inappLink}${id}`;
  openURL(url);
};

const Car = ({ id, manufacturer, model, price }: CarProps) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => openInApp({ id })}>
      <View style={styles.viewContainer}>
        <Text style={styles.header} numberOfLines={1}>
          {`${manufacturer} ${model}`}
        </Text>
        <Text style={[styles.header, styles.price]}>{price}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const { width } = Dimensions.get('window');
const paddingHorizontal = 16;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: 'darkgray',
    height: config.rowHeight,
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
  viewContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: config.rowHeight,
  },
});

export default Car;
