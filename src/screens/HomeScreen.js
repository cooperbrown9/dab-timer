import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Slider, StyleSheet, TextInput } from 'react-native';
import NavBar from '../ui-elements/nav-bar.js';
import TimerCountdown from 'react-native-timer-countdown'


class HomeScreen extends Component {
  state = {
    sec: 10,
    minutes: 0,
    seconds: 0,
    value: 0


  }
  componentDidMount() {

  }

  decrementTimer = () =>{
    this.setState({sec: sec-1});
    if(this.state.sec == 0 && (this.state.min >= 1)){
      this.setState({min: min -1, sec: 59});
    }
  }

  startTimer = () => {
    ninterval = setInterval(() => {
      this.state.sec--,
      this.setState({sec: this.state.sec})
    }, 1000);
    this.setState({timeLeft: ((this.state.min*60)*1000) + this.state.sec*1000});

  }

  stopTimer = () => {
    clearInterval(ninterval);
  }


  render() {
    return(
      <View style={styles.container} >
        <NavBar title={'Dab Timer'}/>
        <View style={styles.timerContainer}>
          <Text style={{color: 'white', fontSize: 24, paddingTop: 40}}>MyTimer</Text>
          <View style={styles.timer}>

            <View style={{flex: 1, width: 100, alignItems: 'center', justifyContent: 'center'}}>
              <Slider
                style={{width: 200}}
                minimumValue={0}
                maximumValue={300}
                value={this.state.value}
                onValueChange={(value) => this.setState({value})} />
              <Text style={{color:'white'}}>sec: {(this.state.value%60).toFixed(0)} min: {(this.state.value/60).toFixed(0)}</Text>
            </View>


          </View>
          <TouchableOpacity
            onPress={this.startTimer}
            style={{backgroundColor: '#DDDDDD', height: 100, width: 100,
            marginBottom: 40, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, color: 'white'}}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.stopTimer}
            style={{backgroundColor: '#DDDDDD', height: 100, width: 100,
            marginBottom: 40, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, color: 'white'}}>Stop</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000080'
  },
  timerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#000080',

  },
  timer:{
    flex:1,
    flexDirection: 'row',

  },
  text: {
    fontSize: 34,
    textAlign: 'center'
  }
})

export default HomeScreen;
