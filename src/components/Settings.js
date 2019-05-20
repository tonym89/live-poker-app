import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Fonts } from '../utils/Fonts';

class Settings extends Component {
    render() {
      return (
        <View style={styles.mainViewStyle}>
          <TouchableOpacity onPress={Actions.about}>
            <View style={styles.statSection}>
              <Text style={styles.statTextStyle}>About</Text>
            </View>
          </TouchableOpacity>

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
        paddingVertical: 20,
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


export default Settings;
