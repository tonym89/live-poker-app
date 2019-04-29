import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GoogleStaticMap from './GoogleStaticMap';






class Map extends Component {

  static propTypes = {
  }

  render() {
    console.log(this.props.data.lat)
    return (
      <GoogleStaticMap
          style={styles.map}
          latitude={this.props.data.lat.toString()}
          longitude={this.props.data.lng.toString()}
          zoom={15}
          size={{ width: 400, height: 240 }}
          apiKey={'AIzaSyDkIWixhcpMisJ3Ua73U1G5HcEsEq-mzQs'}
      />
    );
  }
}


const styles = StyleSheet.create({

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4d4d4d'
  },

  title: {
    color: 'white',
    fontSize: 32,
    paddingVertical: 15
  },

  map: {
    borderRadius: 5,
    borderColor: 'black',

  }

});

export { Map };
