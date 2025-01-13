import React from 'react';
import PropTypes from 'prop-types';
import Typo from './Typo';
import {StyleSheet, View} from 'react-native';
import colors from './constants/colors';

const DetailsItem = ({label, value, seperator = false}) => {
  return (
    <>
      <View style={styles.detailsItem}>
        <Typo text={label} align="left" color={colors.grey} />
        <Typo text={value} align="right" />
      </View>
      {seperator && <View style={styles.seperator} />}
    </>
  );
};

const styles = StyleSheet.create({
  detailsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  seperator: {
    height: 1,
    backgroundColor: colors.darkGrey,
  },
});

DetailsItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  seperator: PropTypes.bool,
};

export default DetailsItem;
