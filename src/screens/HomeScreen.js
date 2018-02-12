import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal,  Slider, StyleSheet, TextInput, AsyncStorage, Image } from 'react-native';
import NavBar from '../ui-elements/nav-bar.js';
import SideMenu from 'react-native-side-menu';
import AddTimerModal from './AddTimerModal.js';
import Menu from './Menu.js';


class HomeScreen extends Component {
  state = {
    sec: 0,
    minutes: 0,
    seconds: 0,
    value: 0,
    startTouchable: false,
    stopTouchable: true,
    timers: [],
    isOpen: false,
    timerName: "My Timer",
    formattedTime: "00:00",
    addTimerPresented: false,
  }

  async componentWillMount() {
     let g = await AsyncStorage.getItem('69');
     array = [];
     if(g == null){
       await AsyncStorage.setItem('69', JSON.stringify(array));
     } else{
       console.log("anything: " + g);
       let c = JSON.parse(g);
       this.setState({timers: c });
     }

     //this._getArrayOfTimers();

    console.log(this.state.timers);

  }

  _getArrayOfTimers = async() => {
     AsyncStorage.getItem('69', (err, result) =>{
       console.log(result);
       this.state.timers = result;
       this.setState({timers: this.state.timers});
     });


    // const array = await AsyncStorage.getItem('69');
    // if(array == null){
    //   var newArray = [];
    //    await AsyncStorage.setItem('69', JSON.stringify(newArray));
    //  } else {
    //    this.state.timers = array;
    //    this.setState({timers: this.state.timers});
    //    console.log(this.state.timers);
    //  }


  }



  async stop(){
    console.log("it works");
    await this.stopTimer();
  }


  _saveTimer = async(name, min, sec) => {
    let newItem = {
      name: name,
      value: sec+(min*60),
      min: min,
      sec: sec

    }


    let array = await AsyncStorage.getItem('69').then(req => JSON.parse(req));

    array.push(newItem);
    this.setState({timers: array});
    await AsyncStorage.setItem('69', JSON.stringify(array));

    let test = await AsyncStorage.getItem('69').then(req => JSON.parse(req));
    console.log("This is the updated array: \n");
    for(let i = 0; i < test.length; i++){
      console.log(test[i].name);
    }


  }

  startTimer = () => {
    console.log(this.state.value + "hello");
    if(this.state.value!=0){
      this.state.startTouchable = true;
      this.state.stopTouchable = false;
      this.setState({startTouchable: this.state.startTouchable, stopTouchable: this.state.stopTouchable});
      let _this = this;
      ninterval = setInterval(() => {
          if(this.state.value < 1){

            this.state.value = 0;
            this.setState({value: this.state.value});
            _this.stop();

          }

          this.state.sec--,
          this.state.value--,
          this.setState({sec: this.state.sec, value: this.state.value})
          this.formattedTime(this.state.value);

      }, 1000);

    }
  }

  stopTimer = () => {
    this.state.startTouchable = false;
    this.state.stopTouchable = true;
    this.setState({startTouchable: this.state.startTouchable, stopTouchable: this.state.stopTouchable});
    clearInterval(ninterval);
  }

  _navigate = (name, sec, min) => {
    this.state.timerName = name;
    let s = Number(sec);
    let m = Number(min);
    let seconds = s + (60*m);

    this.formattedTime(seconds);
    // let ft = min + " : " + sec;
    // this.setState({formattedTime: ft});
    // let seconds = sec + (60*min);
    // this.state.value = sec;
    // this.setState({value: this.state.value});

    this.toggleMenu();
  }

  toggleMenu = () => {
    console.log("Hello");
    this.state.isOpen =  !this.state.isOpen;
    this.setState({isOpen: this.state.isOpen});
  }

  getItems = async() => {
  return await AsyncStorage.getItem('69').then(req => JSON.parse(req));

  }

  formattedTime = (value) => {
    this.setState({value: value});
    let min = ((value/60) < 10) ? '0' + Math.floor((value/60)) : Math.floor((value/60));
    let sec = ((value%60) < 10) ? '0' + (value%60).toFixed(0) : (value%60).toFixed(0);
    let ft = min + " : " + sec;
    this.setState({formattedTime: ft});
  }

  _dismissAddTimerModal = () =>{
    this.setState({addTimerPresented: false});
  }

  _presentAddTimerModal = () => {
    this.setState({addTimerPresented: true});

  }

  render() {


    return(
      <SideMenu onChange={() => this.toggleMenu} disableGestures={true} menu={<Menu navigateFunc={this._navigate.bind(this)} options={(this.state.timers) ? this.state.timers : []}/>} isOpen={this.state.isOpen}>
      <View style={styles.container} >
        <NavBar title={'Dab Timer'}
                leftButton={<Image source={require('../../assets/bars.png')} style={{height: 20, width: 20, tintColor: 'black'}}/>}
                leftOnPress={this.toggleMenu}
                rightButton={<Image source={require('../../assets/plus-button.png')} style={{height: 20, width: 20, tintColor: 'black'}}/>}
                rightOnPress={this._presentAddTimerModal}

          />
        <Modal animationType={'slide'} transparent={false} visible={this.state.addTimerPresented} styles={{marginTop: 0}}>
            <AddTimerModal addTimerFunc={(name, min, sec) => this._saveTimer(name, min, sec)} dismissFunc={this._dismissAddTimerModal.bind(this)} />
        </Modal>
        <View style={styles.timerContainer}>
          <Text style={{color: 'white', fontSize: 24, paddingTop: 40}}>{this.state.timerName}</Text>
          <Text style={{color:'white', fontSize: 34, paddingTop: 20}}>{this.state.formattedTime}</Text>
          <View style={styles.timer}>

            <View style={{flex: 1, width: 100, alignItems: 'center', justifyContent: 'center'}}>
              <Slider
                style={{width: 200}}
                minimumValue={0}
                maximumValue={300}
                value={this.state.value}
                onValueChange={(value) => this.formattedTime(value)} />

            </View>


          </View>
          <TouchableOpacity
            onPress={this.startTimer}
            disabled={this.state.startTouchable}
            style={{backgroundColor: '#DDDDDD', height: 100, width: 100,
            marginBottom: 40, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, color: 'white'}}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.stopTimer}
            disabled={this.state.stopTouchable}
            style={{backgroundColor: '#DDDDDD', height: 100, width: 100,
            marginBottom: 40, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, color: 'white'}}>Stop</Text>
          </TouchableOpacity>
        </View>

      </View>
      </SideMenu>
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
