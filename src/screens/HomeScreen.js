import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class HomeScreen extends Component {

  componentDidMount() {
    console.log('yuh');
  }

  render() {
    return(
      <View style={styles.container} >
        <Text>ne9ro</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  }
})

export default HomeScreen;
