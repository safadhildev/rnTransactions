import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import colors from './constants/colors';

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color={colors.darkGrey} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 99,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

export default LoadingOverlay;
