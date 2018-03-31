import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import HomeScreen from './home.js';
import Poach from './containers/poach.js'
import Hard from './containers/hard.js'
import Soft from './containers/soft.js'

const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Poach: {
    screen: Hard
  },
  Hard: {
    screen: Hard
  },
  Soft: {
    screen: Hard
  }
}, {
    initialRouteName: 'Home',
    gesturesEnabled: true,
  });

export default class App extends React.Component {

  render() {
    return <RootStack style={{height: "100%", width: "100%"}} />;
  }
}
