import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, WebView, Linking } from 'react-native';
import Expo from 'expo';
import sluts from '../assets/images/sluts.png'
import iconsheep from '../assets/images/iconsheep.png'

const tileSize = 12;
const gameSize = 10;


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
      position: {
        x: 0,
        y: 0,
      },
      egg: this.randPos(),
      direction: 'up',
      speed: 1,
      gameOn: false,
    };
    this.gameTimer;
  }

  randPos() {
    const min = 0;
    const max = gameSize;
    const randx = (min + Math.floor(Math.random() * (max - min))) * tileSize;
    const randy = (min + Math.floor(Math.random() * (max - min))) * tileSize;
    return { x: randx, y: randy }
  }

  changeDirection(direction) {
    if (direction === 'pause') {
      clearInterval(this.gameTimer);
      this.setState({gameOn: !this.state.gameOn});
    }
    if (!this.state.gameOn) {
      this.setState({gameOn: true});
      this.run();
    }
    this.setState({direction});
  }

  collision() {
    console.log(this.state.position, this.state.egg);
    if (this.state.position.x === this.state.egg.x && this.state.position.y === this.state.egg.y) {
      this.setState({egg: this.randPos()});
    }
  }

  run() {
    this.gameTimer = setInterval(() => {
      this.collision();
      switch(this.state.direction) {
        case 'up':
          this.setState({position: {
            x: this.state.position.x,
            y: this.state.position.y - tileSize,
          }})
          break;
        case 'down':
          this.setState({position: {
            x: this.state.position.x,
            y: this.state.position.y + tileSize,
          }})
                    break;
        case 'left':
          this.setState({position: {
            x: this.state.position.x - tileSize,
            y: this.state.position.y,
          }})
                    break;
        case 'right':
          this.setState({position: {
            x: this.state.position.x + tileSize,
            y: this.state.position.y,
          }})
                    break;
      }
    }, 500 * this.state.speed)
  }



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.score}>
        <Text>{this.state.direction}</Text>
        </View>
        <View style={styles.gameContainer}>
          <View style={styles.gameScreen}>
            <View style={{
              height: tileSize,
              width: tileSize,
              backgroundColor: 'black',
              position: 'absolute',
              top: this.state.position.y,
              left: this.state.position.x,
            }} />
            <View style={{
              height: tileSize,
              width: tileSize,
              backgroundColor: 'yellow',
              position: 'absolute',
              top: this.state.egg.y,
              left: this.state.egg.x,
            }} />
          </View>
        </View>
        <View style={styles.buttons}>
          <View style={styles.row}>
          <TouchableOpacity
            onPress={() => this.changeDirection('up')}
            style={styles.button}
          >
            <Text>
              up
            </Text>
          </TouchableOpacity>
          </View>
          <View style={styles.row}>
          <TouchableOpacity
            onPress={() => this.changeDirection('left')}
            style={styles.button}
          >
            <Text>
              left
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.changeDirection('pause')}
            style={styles.button}
          >
            <Text>
              pause
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.changeDirection('right')}
            style={styles.button}
          >
            <Text>
              right
            </Text>
          </TouchableOpacity>
          </View>
          <View style={styles.row}>
          <TouchableOpacity
            onPress={() => this.changeDirection('down')}
            style={styles.button}
          >
            <Text>
              down
            </Text>
          </TouchableOpacity>
          </View>
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
  score: {
    height: 100,
    backgroundColor: 'red',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center'
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
  gameScreen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: (gameSize * tileSize),
    width: (gameSize * tileSize),
    borderWidth: 1,
    borderColor: 'blue',
  },
  snake: {
    height: 12,
    width: 12,
    backgroundColor: 'black',
    position: 'absolute',
  },
  buttons: {
    height: '40%',
    width: "100%",
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  button: {
    width:100,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center'
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
