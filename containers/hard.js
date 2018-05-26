import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Expo from 'expo';



import zero from "../assets/images/0.png"
import one from "../assets/images/1.png"
import two from "../assets/images/2.png"
import three from "../assets/images/3.png"
import four from "../assets/images/4.png"
import five from "../assets/images/5.png"
import six from "../assets/images/6.png"
import seven from "../assets/images/7.png"
import eight from "../assets/images/8.png"
import nine from "../assets/images/9.png"
import colon from "../assets/images/colon.png"
import background1 from "../assets/images/background1.png"
import background3 from "../assets/images/background3.png"
import background2 from "../assets/images/background2.png"
import DrumEggBut from "../assets/images/DrumEggBut.png"
import gudetamaegg from "../assets/images/gudetamaegg.png"
import guitaregg from "../assets/images/guitaregg.png"

export default class Hard extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
  };

  constructor(props) {
    super(props);
    var timeRemaining;
    var background;
    var doneImage;
    var mascot;
    switch (this.props.navigation.state.routeName) {
      case "Hard":
        timeRemaining = 360;
        background = background1;
        doneImage = guitaregg;
        mascot = 'jules';
        break;
      case "Soft":
        timeRemaining = 270;
        background = background2;
        doneImage = gudetamaegg;
        mascot = 'andrea';
        break;
      case "Poach":
        timeRemaining = 180;
        background = background3;
        doneImage = DrumEggBut;
        mascot = 'kate';
        break;
    }

    this.state = {
      mascot,
      timeRemaining: timeRemaining,
      background: background,
      timerRunning: false,
      doneImage: doneImage,
      done: false,
      textBlink: false,
      images: [
        zero,
        one,
        two,
        three,
        four,
        five,
        six,
        seven,
        eight,
        nine
      ]
    };

    this.timer = null;
    // this.playSound();
    this.blinkTimer = null;
    this.song = new Expo.Audio.Sound();
    this.alarm = new Expo.Audio.Sound();
    this.song.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        this.replaySound();
      }
    });
    this.alarm.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        this.replayAlarm();
      }
    });
    this.loadSound();
    this.loadAlarm();
  }

  componentWillUnmount() {
    console.log('HELLO');
    this.stopSound();
    this.stopAlarm();
  }

  loadSound() {
    try {
      this.song.loadAsync(require('../assets/songs/eggs.mp3'));
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

  loadAlarm() {
    try {
      if (this.state.mascot === "kate") {
        this.alarm.loadAsync(require("../assets/songs/kate.mp3"))
      } else if (this.state.mascot === "andrea") {
        this.alarm.loadAsync(require("../assets/songs/andrea.mp3"))
      } else if (this.state.mascot === "jules") {
        this.alarm.loadAsync(require("../assets/songs/jules.mp3"))
      }
    } catch (error) {

    }
  }

  playSound() {
    try {
      this.song.playAsync();
    } catch(error) {

    }
  }

  playAlarm() {
    try {
      this.alarm.playAsync();
    } catch(error) {

    }
  }

  pauseSound() {
    try {
      this.song.pauseAsync();
    } catch(error) {

    }
  }

  stopSound() {
    try {
      this.song.stopAsync();
    } catch(error) {

    }
  }

  stopAlarm() {
    try {
      this.alarm.stopAsync();
    } catch(error) {

    }
  }

  replaySound() {
    try {
      this.song.replayAsync({ shouldPlay: true});
    } catch (error) {

    }

  }

  replayAlarm() {
    try {
      this.alarm.replayAsync({ shouldPlay: true});
    } catch (error) {

    }

  }


  startTimer() {
    this.setState({timerRunning: !this.state.timerRunning})
    this.playSound();
    if (this.state.timerRunning) {
      this.pauseSound();
      this.stopAlarm();
      clearInterval(this.timer);
      clearInterval(this.blinkTimer);
      this.blinkTimer = null;
    } else {
      this.timer = setInterval(() => {
        this.runTimer()
      }, 1000);
    }
  }

  runTimer() {
    if (this.state.timeRemaining < 1) {
      this.setState({done: true});
      this.pauseSound();
      this.playAlarm();
      if (this.blinkTimer === null) {
        this.blinkTimer = setInterval(() => {
          this.setState({textBlink: !this.state.textBlink})
        }, 1000)
      }
    } else {
      this.setState({timeRemaining: this.state.timeRemaining - 1})
    }
  }

  finishTimer() {
    this.setState({timeRemaining: 0, timerRunning: false, done: true})
    this.blinkTimer = setInterval(() => {
      this.setState({textBlink: !this.state.textBlink})
    }, 500)
    this.pauseSound();
    this.playAlarm();

  }

  resetTimer() {
    this.setState({timeRemaining: 1, timerRunning: false, done: false})
    this.stopSound();
    this.stopAlarm();
    clearInterval(this.timer);
    clearInterval(this.blinkTimer);
    this.blinkTimer = null;

  }

  interpretTime(position) {
    const minutes = (Math.floor(this.state.timeRemaining / 60));
    const seconds = (this.state.timeRemaining % 60);
    switch (position) {
      case 0:
        if ((Math.floor(minutes / 10)) === 0) {
          break;
        } else {
          return (
            <View style={styles.numberContainer}>
              <Image style={styles.numberImage} source={this.state.images[(Math.floor(minutes / 10))]}/>
            </View>
          )
        }
        break;
      case 1:
        return (
          <View style={styles.numberContainer}>
            <Image style={styles.numberImage} source={this.state.images[(minutes % 10)]}/>
          </View>
        )
        break;
      case 2:
        return (
          <View style={styles.numberContainer}>
            <Image style={styles.numberImage} source={this.state.images[(Math.floor(seconds/10))]}/>
          </View>
        )
        break;
      case 3:
        return (
          <View style={styles.numberContainer}>
          <Image style={styles.numberImage} source={this.state.images[(seconds % 10)]}/>
          </View>
        )
        break;
    }

  }

  render() {

    return (
      <View style={styles.container}>
        <Image source={this.state.background} style={styles.backgroundImage} />
        <View style={styles.container}>
          {
            this.state.done ? (
              this.state.textBlink ? (
                <View style={styles.doneContainer}>
                  <Image source={this.state.doneImage} style={styles.backgroundImage} />
                  <Text style={styles.doneText}>EGGS R READY!</Text>
                </View>
              ) : (
                null
              )
            ) : (
              <View style={styles.timeContainer}>
                {this.interpretTime(0)}
                {this.interpretTime(1)}
                <Image style={styles.colonImage}source={colon} />
                {this.interpretTime(2)}
                {this.interpretTime(3)}
              </View>
            )
          }
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.startButton} onPress={this.startTimer.bind(this)}>
            <Text style={styles.startText}>{this.state.timerRunning ? "Pause" : "Start"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={this.resetTimer.bind(this)}>
            <Text style={styles.resetText}>Reset Timer</Text>
          </TouchableOpacity>
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
  },
  backgroundImage: {
    position: "absolute",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  numberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 100,
  },
  colonImage: {
    height: 70
  },
  numberImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  whiteText: {
    color: "#fff"
  },
  startButton: {
    width: 300,
    height: 75,
    backgroundColor: "#f7b900",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  startText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  resetButton: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  resetText: {

  },
  doneContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    overflow: "visible",


  },
  doneImage: {
    position: "absolute",
    resizeMode: "contain",
    height: "100%",
    width: "100%",
    overflow: "visible",
  },
  doneText: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#f7b900",
    position: "absolute",
    zIndex: 1,
  }
});
