import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Fonts } from '../utils/Fonts';

class About extends Component {
    render() {
      return (
        <View style={styles.mainViewStyle}>
          <Text style={styles.settingTextStyle}>Poker Dex is an app developed by poker player and coder Tony McShane.  The app aims to deliver a cutting edge user interface facilitating the tracking of live poker results.  This version is a minimum viable product and further features, such as more filters, additional languages and full multi-currency support, will be added imminently.  This is my first native mobile app and I am very eager to hear all feedback (positive and negative).  I am also looking to guage demand for additional features in the future.  Possible new features include:</Text>
          <Text style={styles.settingTextStyle}>- Nearby casinos with a real-time list of what games are running</Text>
          <Text style={styles.settingTextStyle}>- Tournament functionality (Tournament mode with upcoming schedules)</Text>
          <Text style={styles.settingTextStyle}>- Player notes - with possible camera usage to take picture of opponent</Text>
          <Text style={styles.settingTextStyle}>- Opening ranges/shoving ranges</Text>
          <Text style={styles.settingTextStyle}>- Facility to organise meet up games - i.e. connect with a casino, book a dealer and a table and show up with friends (deposit required)</Text>
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
      settingTextStyle: {
        color: '#FCFDFC',
        fontFamily: Fonts.Cabin,
        marginBottom: 5
      },
      }


export default About;
