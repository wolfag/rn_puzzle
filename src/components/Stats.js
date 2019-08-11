import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import formatElapsedTime from '../utils/formatElapsedTime';

export default function Stats({ time, moves }) {
  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <Text style={[styles.text, styles.textMargin]}>Time</Text>
        <Text style={styles.text}>Moves</Text>
      </View>
      <View>
        <Text style={[styles.text, styles.textMargin, styles.value]}>
          {formatElapsedTime(time)}
        </Text>
        <Text style={[styles.text, styles.value]}>{moves.toString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  labels: {
    alignItems: 'flex-end',
    marginRight: 15,
  },
  values: {
    alignItems: 'flex-end',
    minWidth: 56,
  },
  text: {
    fontSize: 24,
    color: '#69b8ff',
    backgroundColor: 'transparent',
  },
  value: {
    fontWeight: 'bold',
  },
  textMargin: {
    marginBottom: 10,
  },
});
