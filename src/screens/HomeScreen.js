import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import colors from '../components/colors';
import Header from '../components/Header';
import LoadingOverlay from '../components/LoadingOverlay';
import TransactionItem from '../components/TransactionItem';
import {DETAILS_SCREEN} from '../routes/navigationConstant';
import {fetchTransactions} from '../services/api';
import {insertString} from '../utils';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const _getTransactions = useCallback(async () => {
    try {
      const response = await fetchTransactions();
      const results = response.data;
      setTransactions(results);
    } catch (err) {
      console.log(err);
    } finally {
      if (initialLoading) {
        setInitialLoading(false);
      }
      setIsLoading(false);
    }
  }, [initialLoading]);

  const _onRefresh = async () => {
    setIsLoading(true);
    await _getTransactions();
  };

  useEffect(() => {
    _getTransactions();
  }, [_getTransactions]);

  const _onPressItem = item => {
    console.log('[DEBUG] >> ', {item});
    navigation.navigate(DETAILS_SCREEN, {
      data: item,
    });
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
        onPress={() =>
          _onPressItem({
            ...item,
            amount: parsedAmount,
            transferDate: parsedDate,
            isIncoming,
          })
        }
        isIncoming={isIncoming}
      />
    );
  };

  return (
    <View style={styles.container}>
      {initialLoading && <LoadingOverlay />}
      <Header title="Transactions" />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={transactions}
        renderItem={_renderItem}
        refreshing={isLoading}
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
