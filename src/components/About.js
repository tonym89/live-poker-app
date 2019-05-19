import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Fonts } from '../utils/Fonts';

class About extends Component {
    render() {
      return (
        <View style={styles.mainViewStyle}>
          <Text style={{ color: '#FCFDFC', font: Fonts.Cabin }}>Poker Dex is an app developed by Tony McShane under the company Eden Rose London Limited.  It aims to deliver a cutting edge user interface facilitating the tracking of live poker results.</Text>
        </View>
      )
      }
    }


    const styles = {
      mainViewStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#274272',
        color: '#FCFDFC',
        padding: 20,
      },
      statSection: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: 0.5,
        color: 'white',
        borderColor: '#274272',
        backgroundColor: '#3B5889',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20
      },
      statTextStyle: {
        color: '#FCFDFC',
        fontFamily: Fonts.Cabin,
        fontSize: 18
      },
      }


export default About;
