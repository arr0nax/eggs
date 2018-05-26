import React from 'react';
import { Button, View, Text, TouchableOpacity, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import hardboiled from './assets/images/hardboiled.png'
import poached from './assets/images/poached.png'
import softboiled from './assets/images/softboiled.png'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
  };

  constructor(props) {
    super(props);

  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 0, backgroundColor: "#f7b900" }}>
        <TouchableOpacity
          title="POACHED"
          onPress={() => this.props.navigation.navigate('Poach')}
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <Image
            resizeMode="contain"
            source={poached}
            pointerEvents="none"
            style={{width: "130%"}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Hard')}
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            resizeMode="contain"
            source={hardboiled}
            pointerEvents="none"
            style={{width: "145%"}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Soft')}
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            resizeMode="contain"
            source={softboiled}
            pointerEvents="none"
            style={{width: "130%"}}

          />
        </TouchableOpacity>

      </View>
    );
  }
}
