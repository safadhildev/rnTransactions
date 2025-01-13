import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from './constants/colors';
import Typo from './Typo';

const TransactionItem = ({
  id = null,
  title = null,
  description = null,
  amount = null,
  isIncoming = true,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity key={id} onPress={onPress}>
      <View style={styles.itemContainer}>
        <View style={styles.itemInfo}>
          {title && <Typo text={title} />}
          {description && (
            <Typo text={description} size={14} color={colors.grey} />
          )}
        </View>
        {amount && (
          <Typo
            text={amount}
            size={20}
            weight={600}
            color={isIncoming ? colors.green : colors.red}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

TransactionItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  amount: PropTypes.string,
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#20242c',
    borderRadius: 30,
  },
  itemInfo: {
    flex: 1,
  },
  itemAmount: isIncoming => ({
    fontWeight: 600,
    fontSize: 20,
    color: isIncoming ? colors.green : colors.red,
  }),
});

export default TransactionItem;
