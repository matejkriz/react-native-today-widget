// @flow
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import config from '../config';
import { openInApp } from '../lib/openInApp';

const LinkToMainApp = () => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => openInApp({})}>
      <View style={styles.viewContainer}>
        <Image
          style={styles.image}
          source={{
            uri: config.linkToMainApp.icon,
          }}
        />
        <Text style={styles.title} numberOfLines={1}>
          {config.linkToMainApp.title}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: config.rowHeight,
    paddingHorizontal: config.paddingHorizontal,
  },
  image: {
    height: 24,
    width: 24,
  },
  title: {
    color: '#505050',
    fontSize: 14,
    paddingHorizontal: config.paddingHorizontal,
  },
  viewContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: config.rowHeight,
  },
});

export default LinkToMainApp;
