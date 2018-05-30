import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, WebView, Linking } from 'react-native';
import Expo from 'expo';
import sluts from '../assets/images/sluts.png'
import iconsheep from '../assets/images/iconsheep.png'


export default class Info extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
    headerStyle: {
        borderBottomWidth: 0,
    }
  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }


  navigateToAlbum() {
    const url = 'https://diysluts.bandcamp.com/';
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }


  render() {
    return (
      <View style={styles.container}>
        <Image source={sluts} style={styles.backgroundImage} />
        <Text style={styles.italicText}>Made with love for the DIY Sloots</Text>
        <TouchableOpacity onPress={() => this.navigateToAlbum()}>
          <Text style={styles.underlineText}>Download the album here</Text>
        </TouchableOpacity>
        <View style={styles.onlineContainer}>
          <Image source={iconsheep} style={styles.sheepicon} />
          <Text style={styles.sheepText}>App by Clayton Online</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
  backgroundImage: {
    height: 120,
    width: 120
  },
  italicText: {
    fontStyle: "italic"
  },
  underlineText: {
    textDecorationLine: "underline"
  },

  onlineContainer: {
    position: 'absolute',
    width: 150,
    height: 100,
    bottom: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheepicon: {
    height: 50,
    resizeMode: "contain"
  },
  sheepText: {
    fontStyle: "italic",
  }

});
