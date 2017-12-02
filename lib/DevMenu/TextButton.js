// @flow
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

type TextButtonProps = {
  onPress: () => void,
  title: string,
};

const TextButton = ({ onPress, title }: TextButtonProps) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 2,
    opacity: 0.5,
  },
  text: {
    alignItems: 'center',
    color: 'black',
    fontSize: 11,
    paddingHorizontal: 2,
    textAlign: 'center',
  },
});

export default TextButton;
