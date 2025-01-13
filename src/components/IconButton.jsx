import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const Button = ({Icon = false, onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {Icon && React.isValidElement(Icon) && Icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});

Button.propTypes = {
  Icon: PropTypes.element,
  onPress: PropTypes.func,
};

export default Button;
