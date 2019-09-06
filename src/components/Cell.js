import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

const cell = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      disabled={props.disabled}>
      {props.playerData ? <Image source={props.playerData.image} style={styles.cellImage}/> : null}
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
    margin:1
  },
  cellImage: {
    height: 80,
    width: 80,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default cell;
