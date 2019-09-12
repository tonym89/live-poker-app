import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { Fonts } from '../utils/Fonts';
import { connect } from 'react-redux';

class SessionType extends Component {
    render() {
      const {sessionstart, sessionend} = this.props;
      return (
        <View style={styles.mainViewStyle}>
          <View style={styles.sectionTitle}>
            <View style={styles.statSection}>
              <Text style={styles.statTextStyle}>Live Session</Text>
            </View>
          </View>

            <TouchableOpacity style={styles.saveButton} onPress={Actions.onGoingSession}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#03ADB0', '#03ADB0', '#03ADB0']} style={styles.linearGradient}>
                    <Text style={styles.saveText}>{sessionstart ? "Current Session" : "Start New"}</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={Actions.setLocation}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FA7E7E', '#FA7E7E', '#FA7E7E']} style={styles.linearGradient}>
                    <Text style={styles.saveText}>Add Completed</Text>
                </LinearGradient>
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
   },
   saveButton: {
     alignSelf: 'center',
     width: 300,
     height: 40,
     borderRadius: 15,
     justifyContent: 'center',
     bottom: 30,
     marginTop: 20,
     marginBottom: 20,
   },
   saveText: {
     fontFamily: Fonts.CabinBold,
     fontSize: 23,
     color: '#FCFDFC',
     textAlign: 'center',
   },
   linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionTitle:{
    alignItems: 'center',
    flex: 0.2
  },
      statSection: {
        flexDirection: 'row',
        height: 50,
        width: 500,
        borderBottomWidth: 0.5,
        color: 'white',
        borderColor: '#274272',
        backgroundColor: '#3B5889',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
      },
      statTextStyle: {
        color: '#FCFDFC',
        fontFamily: Fonts.Cabin,
        fontSize: 18
      },
 }

 const mapStateToProps = (state) => {
  const { sessionstart, sessionend} = state.sessionForm;

  return { sessionstart, sessionend };
};

export default connect(mapStateToProps, {

})(SessionType);

