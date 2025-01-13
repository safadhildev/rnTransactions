import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import colors from '../components/constants/colors';
import Header from '../components/Header';
import LoadingOverlay from '../components/LoadingOverlay';
import TransactionItem from '../components/TransactionItem';
import {DETAILS_SCREEN} from '../routes/navigationConstant';

import useTransactionsStore from '../services/useTransactionsStore';
import {insertString} from '../utils';

const HomeScreen = () => {
  const navigation = useNavigation();

  const {fetchTransactions, isLoading, transactions} = useTransactionsStore();

  const _getTransactions = useCallback(async () => {
    try {
      await fetchTransactions();
    } catch (error) {
      console.log('Home >> _getTransactions >> Error >>', error);
    } finally {
    }
  }, [fetchTransactions]);

  const _onRefresh = async () => {
    await _getTransactions();
  };

  useEffect(() => {
    _getTransactions();
  }, [_getTransactions]);

  const _onPressItem = id => {
    navigation.navigate(DETAILS_SCREEN, {id});
  };

  const _renderItem = ({item}) => {
    const isIncoming = item?.amount > 0;
    const parsedAmount =
      item?.amount < 0
        ? `${insertString(item?.amount?.toFixed(2), 'RM ', 1)}`
        : `RM ${item?.amount?.toFixed(2)}`;

    const parsedDate = moment(item?.transferDate).format('DD/MM/YYYY hh:mm:ss');

    return (
      <TransactionItem
        id={item?.refId}
        title={item?.recipientName}
        amount={parsedAmount}
        description={parsedDate}
        onPress={() => _onPressItem(item?.refId)}
        isIncoming={isIncoming}
      />
    );
  };

  return (
    <View style={styles.container}>
      {isLoading && <LoadingOverlay />}
      <Header title="Transactions" />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={transactions}
        renderItem={_renderItem}
        refreshing={isLoading}
        refreshControl={null}
        onRefresh={_onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    flex: 1,
    gap: 20,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
