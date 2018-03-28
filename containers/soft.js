import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Soft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: 5,
      timerRunning: false,
      done: false
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

  render() {

    return (
      <View style={styles.container}>
      {this.state.done ? (
        <Text>All done!</Text>
      ) : (null)}
      <Text>{this.state.timeRemaining}</Text>
        <TouchableOpacity onPress={this.startTimer.bind(this)}>
          <Text>{this.state.timerRunning ? "Pause" : "Start"} Soft Boiled</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.resetTimer.bind(this)}>
          <Text>Reset Timer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
