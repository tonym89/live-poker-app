import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from '@firebase/app'
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';
import Router from './Router';

class App extends Component {
  componentWillMount(){
    const config = {
       apiKey: 'AIzaSyA8sdbBOWGCDCHr5P_HGq4wMHeWRTjKw_0',
       authDomain: 'poker-manager-52c12.firebaseapp.com',
       databaseURL: 'https://poker-manager-52c12.firebaseio.com',
       projectId: 'poker-manager-52c12',
       storageBucket: 'poker-manager-52c12.appspot.com',
       messagingSenderId: '676330139298'
 };
 firebase.initializeApp(config);
  };

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <View style = {styles.background}>
        <Router />
      </View>
    </Provider>
    );
  }
}

const styles = StyleSheet.create ({
   text: {
      color: '#41cdf4',
   },
   background: {
      padding: 0,
      flex: 1,
      backgroundColor: '#FFF'
   },
})

export default App;
