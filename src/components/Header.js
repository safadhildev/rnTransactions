import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import Typo from './Typo';
import colors from './colors';

const Header = ({title = null, LeftAction = null, RightAction = null}) => {
  return (
    <View style={styles.container}>
      <View style={styles.actionWrapper}>
        {React.isValidElement(LeftAction) && LeftAction}
      </View>
      {title && <Typo text={title} style={styles.title} />}
      <View style={styles.actionWrapper}>
        {React.isValidElement(RightAction) && RightAction}
      </View>
    </View>
  );
};

Header.propTypes = {
  LeftAction: PropTypes.element,
  RightAction: PropTypes.element,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionWrapper: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 3,
  },
});

export default Header;
