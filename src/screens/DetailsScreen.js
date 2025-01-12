import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, Share} from 'react-native';
import Header from '../components/Header';
import {NavArrowLeft, ShareAndroid} from 'iconoir-react-native';
import colors from '../components/colors';
import Button from '../components/IconButton';
import Typo from '../components/Typo';
import {objectToArray} from '../utils';

const DetailsItem = ({label, value, seperator = false}) => {
  return (
    <>
      <View style={styles.detailsItem}>
        <Typo text={label} align="left" />
        <Typo text={value} align="right" />
      </View>
      {seperator && <View style={styles.seperator} />}
    </>
  );
};

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [data, setData] = useState(null);

  const _onBack = () => {
    if (navigation.canGoBack) {
      navigation.goBack();
    }
  };

  const _onShare = () => {
    try {
      const parsedMessage = {
        ['Reference Id']: data?.refId,
        ['Transfer Date']: data?.transferDate,
        ['Recipient Name']: data?.recipientName,
        ['Transfer Type']: data?.transferName,
        ['Amount']: data?.amount,
      };

      Share.share({
        title: "Transfer's Details",
        message: JSON.stringify(parsedMessage),
      });
    } catch (error) {
      console.log('Details >> _onShare >> Error >>', error);
    }
  };

  useEffect(() => {
    const _handleData = () => {
      setData(route.params?.data);
    };

    _handleData();
  }, [route]);

  return (
    <View style={styles.container}>
      <Header
        title="Details"
        LeftAction={
          <Button
            onPress={_onBack}
            Icon={
              <NavArrowLeft
                color={colors.white}
                width={30}
                height={30}
                strokeWidth={2}
              />
            }
          />
        }
        RightAction={
          <Button
            onPress={_onShare}
            Icon={
              <ShareAndroid
                color={colors.white}
                width={24}
                height={24}
                strokeWidth={1}
              />
            }
          />
        }
      />
      <Typo text={data?.amount} style={styles.amount(data?.isIncoming)} />
      <View style={styles.content}>
        <DetailsItem label="Reference ID" value={data?.refId} seperator />
        <DetailsItem label="Date/Time" value={data?.transferDate} seperator />
        <DetailsItem
          label="Recipient Name"
          value={data?.recipientName}
          seperator
        />
        <DetailsItem label="Transfer Type" value={data?.transferName} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 20,
    backgroundColor: '#20242c',
  },
  detailsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  amount: isIncoming => ({
    marginTop: 100,
    fontSize: 30,
    fontWeight: 600,
    color: isIncoming ? colors.green : colors.red,
    textAlign: 'center',
  }),
  seperator: {
    height: 1,
    backgroundColor: colors.darkGrey,
  },
});

export default DetailsScreen;
