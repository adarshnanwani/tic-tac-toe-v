import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const cell = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Text>{props.value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    width: 80,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 4,
  },
});

export default cell;
