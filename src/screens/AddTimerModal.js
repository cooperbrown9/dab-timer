
import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, TextInput, ScrollView, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

import NavBar from '../ui-elements/nav-bar.js';
import PropTypes from 'prop-types';

class AddTimerModal extends Component {



  state = {
    min: 0,
    sec: 0,
    name: '',

  };

 _exitModalAndSaveTimer = (name, min, sec) =>{
   this.props.addTimerFunc(name, min, sec);
   console.log(name + min + sec); 
   this.props.dismissFunc();
 }

  render() {
    const frame = Dimensions.get('window');
    return(
      <View style={styles.container} >

        <NavBar title={'Dab Timer'}
                rightButton={<Image source={require('../../assets/close.png')} style={{height: 20, width: 20, tintColor: 'black'}}/>}
                rightOnPress={this.props.dismissFunc.bind(this)}
          />
        <TextInput
          style={{height: 40, width: 100,  borderColor: 'black', borderWidth: 2}}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />
        <TextInput
          style={{height: 40, width: 100, borderColor: 'blue', borderWidth: 2}}
          onChangeText={(min) => this.setState({min})}
          value={this.state.min}
        />
        <TextInput
          style={{height: 40, width: 100, borderColor: 'red', borderWidth: 2}}
          onChangeText={(sec) => this.setState({sec})}
          value={this.state.sec}
        />
        <TouchableOpacity
          onPress={() => this._exitModalAndSaveTimer(this.state.name, this.state.min, this.state.sec)}
          disabled={this.state.startTouchable}
          style={{backgroundColor: '#DDDDDD', height: 100, width: 100,
          marginBottom: 40, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 30, color: 'white'}}>Save</Text>
        </TouchableOpacity>


      </View>
    )
  }
}

AddTimerModal.propTypes = {
  dismissFunc: PropTypes.func.isRequired,
  addTimerFunc: PropTypes.func.isRequired,

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  navBarLeftButton:{
    height: 12,
    width: 12,
    marginRight: 36
  },
  navBarRightButton:{
    height: 16,
    width: 64,
    marginLeft: 36,
    color: 'red',
  },
});


export default (AddTimerModal);
