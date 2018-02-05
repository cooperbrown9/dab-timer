import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import AppNavigatorWithState from './src/navigation/app-navigator';
import MainReducer from './src/reducers/MainReducer';

import HomeScreen from './src/screens/HomeScreen';

export default class App extends Component {

  store = createStore(MainReducer, applyMiddleware(thunk));

  render() {
    return (
      <Provider store={this.store}>
        <HomeScreen />
      </Provider>
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
