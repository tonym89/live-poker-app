import React, { Component } from 'react';
import { Picker, Text, TouchableOpacity, StyleSheet, View, Dimensions, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { sessionUpdate, sessionCreate } from '../actions';
import { Card, CardSection, Button, NumericInput, NumericInputSb, Input, FormSectionBottomCard, TimerSvgLarge, EarthSvg } from './common';
import { Fonts } from '../utils/Fonts';
const { width } = Dimensions.get('window');

class SetLocation extends Component {
  constructor() {
    super();
    this.state = {
      isStartVisible: false,
      isEndVisible: false,
      isModalVisible: false,
      isLimitModalVisible: false,
      chosenDate: '',
      startTime: new Date().getTime(),
      endTime: (new Date().getTime() + 3.6e+6),
    };
  }

  onNextPress() {
    Actions.sessionCreate();
  };

  startDateHandler = (starttime) => {
    console.log('A start date has been picked: ', starttime);
    const value = starttime.toISOString();
    this.props.sessionUpdate({ prop: 'sessionstart', value });
    this.setState({
        isStartVisible: false,
        startTime: value,
    });
  }

  showPicker = () => {
      console.log("triggered")
    this.setState({
        isStartVisible: true
    })
  }

  hidePicker = () => {
    this.setState({
        isStartVisible: false
    })
  }

  handleEndPicker = (endtime) => {
    console.log('An end date has been picked: ', endtime);
    const value = endtime.toISOString();
    this.props.sessionUpdate({ prop: 'sessionend', value });
    this.setState({
        isEndVisible: false,
        endTime: value,
    });
  }

  showEndPicker = () => {
    this.setState({
        isEndVisible: true
    })
  }

  hideEndPicker = () => {
    this.setState({
        isEndVisible: false
    })
  }

  render() {

    const differenceInMs = new Date(this.state.endTime) - new Date(this.state.startTime);

    function msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
   seconds = Math.floor((duration / 1000) % 60),
   minutes = Math.floor((duration / (1000 * 60)) % 60),
   hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
   days = Math.floor((duration / (1000 * 60 * 60 * 24)) );


           if (days == 0) {
               return hours + ' hours and ' + minutes + ' minutes';
           } else if (days == 0 && hours == 0) {
               return minutes + ' minutes';
           } else {
               return days + ' days ' + hours + ' hours and ' + minutes + ' minutes';
           }

}


    function getFormattedDate(date) {
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ];

       var year = date.getFullYear();

       var month = (1 + date.getMonth()).toString();
       month = month.length > 1 ? month : '0' + month;

       var day = date.getDate().toString();
       day = day.length > 1 ? day : '0' + day;

       var hours = date.getHours().toString();

       var minutes = date.getMinutes().toString();

       var time = date.toTimeString().substr(0,5);

       var monthName = monthNames[date.getMonth()];

       return monthName + ' ' + day + ' ' + year + ' ' + time;
    }





    return (

      <View style={styles.mainViewStyle}>

      <View style={{flex: 0.4}}>
      <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10, marginTop: 10}}>

              <Text style={styles.headerText}>Location  </Text>
        <EarthSvg />
      </View>




          <GooglePlacesAutocomplete
          placeholder='Enter Location'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          listViewDisplayed='false'    // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log(data, details);
          }}

          getDefaultValue={() => ''}

          query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyDkIWixhcpMisJ3Ua73U1G5HcEsEq-mzQs',
          language: 'en', // language of the results
          // default: 'geocode'
          }}
          styles={{
          container: {
          flex: 0,
          marginLeft: 10,
          marginRight: 10
          },
          listView: {
            height: 100
          }

          }}
          />
          </View>

          <View style={{flex: 0.7, justifyContent: 'center'}}>


            <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
              <Text style={styles.headerText}>Time </Text>
              <TimerSvgLarge />
            </View>




          <View style={{flex: 0.5}}>
            <CardSection style={{flexDirection: 'row'}}>

              <TouchableOpacity style={styles.startButton} onPress={this.showPicker}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#03ADB0', '#01CCAD']} style={styles.linearGradient}>
                      <Text style={styles.startText}>Start</Text>
                      <Text style={styles.dateText}>{getFormattedDate(new Date(this.state.startTime))}</Text>
                  </LinearGradient>
              </TouchableOpacity>

              <DateTimePicker
                 isVisible={this.state.isStartVisible}
                 onConfirm={this.startDateHandler}
                 onCancel={this.hidePicker}
                 mode={'datetime'}
              />


              <TouchableOpacity style={styles.endButton} onPress={this.showEndPicker}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#F4873D', '#EC165A']} style={styles.linearGradient}>
                      <Text style={styles.startText}>Finish</Text>
                      <Text style={styles.dateText}>{getFormattedDate(new Date(this.state.endTime))}</Text>
                  </LinearGradient>
              </TouchableOpacity>

              <DateTimePicker
                 isVisible={this.state.isEndVisible}
                 onConfirm={this.handleEndPicker}
                 onCancel={this.hideEndPicker}
                 mode={'datetime'}
              />
            </CardSection>

            </View>

            <View style={{flex: 0.3}}>

              <CardSection style={{justifyContent: 'center'}}>
                <Text style={styles.timePlayedText}>{msToTime(new Date(differenceInMs))} played</Text>
              </CardSection>

            </View>

            </View>



                  <CardSection style={ {alignItems: 'center', justifyContent: 'center', bottom: 0, backgroundColor: '#FDFDFD' } }>
                      <TouchableOpacity style={styles.saveButton} onPress={this.onNextPress.bind(this)}>
                          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2D6BEC', '#1888E5', '#04A6E0']} style={styles.linearGradient}>
                              <Text style={styles.saveText}>Next</Text>
                          </LinearGradient>
                      </TouchableOpacity>
                  </CardSection>



      </View>
);
}
}

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FDFDFD',
  },
  startButton: {
    width: 150,
    height: 70,
    backgroundColor: '#330066',
    borderRadius: 15,
    justifyContent: 'center',
    marginLeft: 10
  },
  endButton: {
    width: 150,
    height: 70,
    backgroundColor: '#330066',
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 5,
    position: 'absolute',
    marginRight: 10,
    right: 0
  },
  startText: {
    fontFamily: Fonts.CabinBold,
    fontSize: 27,
    color: '#FCFDFC',
    textAlign: 'center',
  },
  dateText: {
    fontFamily: Fonts.CabinBold,
    fontSize: 12,
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
 timePlayedText: {
   fontFamily: Fonts.Cabin,
   fontSize: 20,
   color: 'black',
   textAlign: 'center',
   marginBottom: 5,
   marginTop: 5
 },
 headerText: {
   fontFamily: Fonts.CabinBold,
   fontSize: 30,
   color: '#13233B',
   textAlign: 'center',
 },
 saveButton: {
   width: width - 20,
   height: 50,
   backgroundColor: '#330066',
   borderRadius: 15,
   justifyContent: 'center',
   bottom: 40
 },
 saveText: {
   fontFamily: Fonts.CabinBold,
   fontSize: 27,
   color: '#FCFDFC',
   textAlign: 'center',
 },
});

const mapStateToProps = (state) => {
  const { buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit } = state.sessionForm;

  return { buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit };
};

export default connect(mapStateToProps, {
  sessionUpdate, sessionCreate
})(SetLocation);
