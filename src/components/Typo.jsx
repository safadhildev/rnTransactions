import React from 'react';
import {StyleSheet, Text} from 'react-native';
import colors from './constants/colors';

const Typo = ({
  text,
  size = 16,
  weight = 400,
  color = colors.white,
  style = {},
  align = 'left',
}) => {
  return (
    <Text style={[styles.text({size, weight, color, align}), style]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: ({size, weight, color, align}) => ({
    fontSize: size,
    fontWeight: weight,
    color: color,
    textAlign: align,
  }),
});

export default Typo;
