import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import { calculateItemSize, itemMargin } from '../utils/grid';

export default function Preview({ image, boardSize }) {
  const itemSize = calculateItemSize(boardSize);
  const scaledSize = itemSize < 80 ? itemSize * 2 + itemMargin : itemSize;

  const style = {
    width: scaledSize,
    height: scaledSize,
  };

  return (
    <View style={styles.container}>
      <Image style={[styles.image, style]} source={image} />
    </View>
  );
}

Preview.propTypes = {
  image: Image.propTypes.source,
  boardSize: PropTypes.number.isRequired,
};

Preview.defaultProps = {
  image: null,
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#1f1e2a',
  },
  image: {
    resizeMode: 'contain',
  },
});
