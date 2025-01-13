// In App.js in a new project

import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../components/constants/colors';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import {DETAILS_SCREEN, HOME_SCREEN} from './navigationConstant';

const RootStack = createNativeStackNavigator({
  initialRouteName: HOME_SCREEN,
  screenOptions: {
    headerShown: false,
  },
  screens: {
    [HOME_SCREEN]: HomeScreen,
    [DETAILS_SCREEN]: DetailsScreen,
  },
});

const NavigationStack = createStaticNavigation(RootStack);

const Routes = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <NavigationStack />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default Routes;
