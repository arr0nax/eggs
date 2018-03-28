import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';


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

export default class Hard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: 1234,
      timerRunning: false,
      done: false,
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
  }

  startTimer() {
    this.setState({timerRunning: !this.state.timerRunning})
    if (this.state.timerRunning) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.runTimer()
      }, 1000);
    }
  }

  runTimer() {
    if (this.state.timeRemaining < 1) {
      this.setState({done: true});
    } else {
      this.setState({timeRemaining: this.state.timeRemaining - 1})
    }
  }

  finishTimer() {
    this.setState({timeRemaining: 0, timerRunning: false, done: true})
  }

  resetTimer() {
    this.setState({timeRemaining: 5, timerRunning: false, done: false})
    clearInterval(this.timer);
  }

  interpretTime(position) {
    const minutes = (Math.floor(this.state.timeRemaining / 60));
    const seconds = (this.state.timeRemaining % 60);
    switch (position) {
      case 0:
        return this.state.images[(Math.floor(minutes / 10))]
      case 1:
        return this.state.images[(minutes % 10)]
      case 2:
        return this.state.images[(Math.floor(seconds/10))]
      case 3:
        console.log(seconds%10);
        return this.state.images[(seconds % 10)]
    }

  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.timeContainer}>
            <Image source={this.interpretTime(0)} />
            <Image source={this.interpretTime(1)} />
            <Image source={this.interpretTime(2)} />
            <Image source={this.interpretTime(3)} />
          </View>
        </View>
        <View style={styles.container}>
          {this.state.done ? (
            <Text style={styles.whiteText}>All done!</Text>
          ) : (null)}
          <Text style={styles.whiteText}>{this.state.timeRemaining}</Text>
          <TouchableOpacity onPress={this.startTimer.bind(this)}>
            <Text style={styles.whiteText}>{this.state.timerRunning ? "Pause" : "Start"} Hard Boiled</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.resetTimer.bind(this)}>
            <Text style={styles.whiteText}>Reset Timer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  whiteText: {
    color: "#fff"
  }
});
