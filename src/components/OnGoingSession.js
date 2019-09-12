import React, { Component } from 'react';
import { Picker, Text, TouchableOpacity, StyleSheet, View, Dimensions, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { sessionUpdate, sessionCreate } from '../actions';
import { Card, CardSection, Button, NumericInput, NumericInputSb, Input, FormSectionBottomCard, TimerSvgLarge, EarthSvg, EarthSvgSmall, BuyinInput, BlindInputOngoing } from './common';
import { Fonts } from '../utils/Fonts';
import moment from 'moment';

const { height, width } = Dimensions.get('window');
const detailsHeight = height / 4


function Timer({ interval, style }) {
  const pad = (n) => n < 10 ? '0' + n : n
  const duration = moment.duration(interval)
  const centiseconds = Math.floor(duration.milliseconds() / 10)
  return (
    <View style={styles.timerContainer}>
      {pad(duration.days()) > 0 && (
      <Text style={style}>{pad(duration.days())}:</Text>
      )}
      <Text style={style}>{pad(duration.hours())}:</Text>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())},</Text>
      <Text style={style}>{pad(centiseconds)}</Text>
    </View>
  )
}

function SessionTimer({ interval, style }) {
  const pad = (n) => n < 10 ? '0' + n : n
  const duration = moment.duration(interval)
  const centiseconds = Math.floor(duration.milliseconds() / 10)
  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())},</Text>
      <Text style={style}>{pad(centiseconds)}</Text>
    </View>
  )
}

function RoundButton({ title, color, background, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[ styles.button, { backgroundColor: background }]}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <View style={styles.buttonBorder}>
        <Text style={[ styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

function Lap({ number, interval, fastest, slowest }) {
  const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest,
  ]
  return (
    <View style={styles.lap}>
      <Text style={lapStyle}>Lap {number}</Text>
      <Timer style={[lapStyle, styles.lapTimer]} interval={interval}/>
    </View>
  )
}

function LapsTable({ laps, timer }) {
  const finishedLaps = laps.slice(1)
  let min = Number.MAX_SAFE_INTEGER
  let max = Number.MIN_SAFE_INTEGER
  if (finishedLaps.length >= 2) {
    finishedLaps.forEach(lap => {
      if (lap < min) min = lap
      if (lap > max) max = lap
    })
  }
  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap
          number={laps.length - index}
          key={laps.length - index}
          interval={index === 0 ? timer + lap : lap}
          fastest={lap === min}
          slowest={lap === max}
        />
      ))}
    </ScrollView>
  )
}

function ButtonsRow({ children }) {
  return (
    <View style={styles.buttonsRow}>{children}</View>
  )
}

class OnGoingSession extends Component {
  constructor() {
    super();
    this.state = {
      isStartVisible: false,
      isEndVisible: false,
      isModalVisible: false,
      isLimitModalVisible: false,
      chosenDate: '',
      venue: '',
      venueDetails: '',
      start: 0,
      now: 0,
      laps: [ ],
      recording: 'start',
      locationFocused: false,
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });


  _toggleLimitModal = () =>
    this.setState({ isLimitModalVisible: !this.state.isLimitModalVisible });

    onButtonPress() {
      if (this.props.buyin === '') {
        Alert.alert(
          'Please enter valid buy in value',
      );
    } else if (this.props.cashedout === '') {
        Alert.alert(
          'Please enter valid cashed out value',
          );
      } else if (this.props.bigblind === '' || this.props.smallblind === '') {
          Alert.alert(
            'Please enter valid blind values',
            );
      }
      if (new Date(this.props.sessionstart) > new Date(this.props.sessionend)) {
        Alert.alert(
          'Please enter valid session times',
      );
      } else if (this.state.venue === '') {
        Alert.alert(
          'Please enter a location',
          );
      }  else {
      let { buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit, venue, venueDetails, sessionBegin, sessionEnd } = this.props;



      console.log(venue);
      console.log('hello');
      console.log(sessionend);
      console.log(sessionstart);

      this.props.sessionCreate({
        buyin: buyin || 0,
        cashedout: cashedout || 0,
        sessionstart,
        sessionend,
        gametype: gametype || 'Hold em',
        time: time || 'Monday',
        bigblind,
        smallblind,
        location,
        limit: limit || 'No Limit',
        venue: this.state.venue,
        venueDetails: this.state.venueDetails
      });
      }
    }

  start = () => {
   const nowDate = new Date()
   const now = nowDate.getTime();
   console.log(new Date());
   console.log(now);
   const value = nowDate.toISOString();
   console.log(value)
   this.props.sessionUpdate({ prop: 'sessionstart', value: now });
   console.log(this.props.sessionstart);
   this.setState({
     start: now,
     now,
     laps: [0],
   })
   this.timer = setInterval(() => {
     this.setState({ now: new Date().getTime()})
   }, 100)
 }

  componentWillMount() {
    const {sessionstart, sessionend} = this.props;
    this.setState({
      start: sessionstart,
      recording: sessionend ? 'end' : 'start',
    })
    if(sessionstart && !sessionend) {
      this.timer = setInterval(() => {
        this.setState({ now: new Date().getTime()})
      }, 100);
    }
  }

 lap = () => {
   const timestamp = new Date().getTime()
   const { laps, now, start } = this.state
   const [firstLap, ...other] = laps
   this.setState({
     laps: [0, firstLap + now - start, ...other],
     start: timestamp,
     now: timestamp,
   })
 }

 stop = () => {
   const timestampDate = new Date()
   const timestamp = timestampDate.getTime()
   const value = timestampDate.toISOString();
   console.log(value)
   this.props.sessionUpdate({ prop: 'sessionend', value: timestamp });
   console.log(this.props.sessionend);
   clearInterval(this.timer)
   const { laps, now, start } = this.state
   const [firstLap, ...other] = laps
  console.log(this.props.sessionstart);
   this.setState({
     laps: [firstLap + now - start, ...other],
     start: 0,
     now: 0,
     recording: 'end'
   })
 }

 reset = () => {
  this.props.sessionUpdate({ prop: 'sessionstart', value: 0 });
  this.props.sessionUpdate({ prop: 'sessionend', value: 0 });
   this.setState({
     laps: [],
     start: 0,
     now: 0,
     recording: 'start'
   })
 }
 resume = () => {
   const now = new Date().getTime()
   this.setState({
     start: now,
     now,
   })
   this.timer = setInterval(() => {
     this.setState({ now: new Date().getTime()})
   }, 100)
 }

  onNextPress() {
    if (new Date(this.props.sessionstart) > new Date(this.props.sessionend)) {
      Alert.alert(
        'Please enter valid session times',
    );
    } else if (this.state.venue === '') {
      Alert.alert(
        'Please enter a location',
        );
    }
    else {
      Actions.sessionCreate({ venue: this.state.venue, venueDetails: this.state.venueDetails, sessionBegin: this.props.sessionstart, sessionEnd: this.props.sessionend  });
    }
  };

  startDateHandler = (starttime) => {
    console.log('A start date has been picked: ', starttime);
    const value = starttime.toISOString();
    console.log(value)
    this.props.sessionUpdate({ prop: 'sessionstart', value: starttime.getTime()});
    this.setState({
        isStartVisible: false,
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
    this.props.sessionUpdate({ prop: 'sessionend', value: endtime.getTime()});
    this.setState({
        isEndVisible: false,
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

    const PickerItem = Picker.Item;
    const netResult = this.props.cashedout - this.props.buyin;

    const { now, start, laps, recording } = this.state
    const timer = now - start

    const differenceInMs = new Date(this.props.sessionend) - new Date(this.props.sessionstart);

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

        locationFocusFunction = () => {
          this.setState({
              locationFocused: true
          });
        }

          locationUnfocusFunction = () => {
            this.setState({
                locationFocused: false
            });
        }





    return (

      <View style={styles.mainViewStyle}>
      <ScrollView style={{flex: 0.8}}>
      <View style={styles.statSection}>
        <Text style={styles.statTextStyle}>Start Time:</Text>

        {this.props.sessionstart === 0 && (
        <Text style={styles.startStatTextStyle}>Press 'Start'</Text>
        )}

        {this.props.sessionstart > 0 && (
          <TouchableOpacity onPress={this.showPicker}>
                  <Text style={styles.startStatTextStyle}>{getFormattedDate(new Date(this.props.sessionstart))}</Text>
          </TouchableOpacity>
        )}

        <DateTimePicker
           isVisible={this.state.isStartVisible}
           onConfirm={this.startDateHandler}
           onCancel={this.hidePicker}
           mode={'datetime'}
        />

      </View>
      <View style={styles.statSection}>
        <Text style={styles.statTextStyle}>End Time:</Text>
        {this.props.sessionend === 0 && (
        <Text style={styles.statTextStyle}></Text>
        )}

        {this.props.sessionend === 0 && start > 0 && (
        <Text style={styles.endStatTextStyle}>Press 'Stop'</Text>
        )}
        {this.props.sessionend > 0 && (
          <TouchableOpacity onPress={this.showEndPicker}>
                  <Text style={styles.endStatTextStyle}>{getFormattedDate(new Date(this.props.sessionend))}</Text>
          </TouchableOpacity>
        )}
        <DateTimePicker
           isVisible={this.state.isEndVisible}
           onConfirm={this.handleEndPicker}
           onCancel={this.hideEndPicker}
           mode={'datetime'}
        />
      </View>
        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Time Played:</Text>

          {this.state.recording === 'start' && (
          <Timer
            interval={laps.reduce((total, curr) => total + curr, 0) + timer}
            style={styles.timer}
          />
          )}
          {this.state.recording === 'end' && (
              <Text style={styles.timePlayedText}>{msToTime(new Date(differenceInMs))}</Text>

          )}
        </View>

        <View style={( this.state.locationFocused === false ) ? styles.statSection : styles.locationStatSection}>

          {(this.state.locationFocused === false &&
            <Text style={styles.statTextStyle}>Location:</Text>
          )}


            {this.state.venueDetails.name == undefined && this.state.locationFocused === false && (start === 0 || recording === 'end') &&(
              <TouchableOpacity onPress={locationFocusFunction}>
                <EarthSvgSmall />
              </TouchableOpacity>
              )}

          {this.state.venueDetails.name !== undefined && this.state.locationFocused === false && (
            <TouchableOpacity onPress={locationFocusFunction}>
              <Text style={styles.venueStatTextStyle}>{this.state.venueDetails.name}  <EarthSvgSmall /></Text>
            </TouchableOpacity>
            )}

          {( this.state.locationFocused === true &&

          <GooglePlacesAutocomplete
          placeholder='Enter Location'
          minLength={2} // minimum length of text to search
          autoFocus={true}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          listViewDisplayed='false'    // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render

          textInputProps={{
              onFocus: () => locationFocusFunction(),
          }}

          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              this.setState({
                  venue: data,
                  venueDetails: details,
                  locationFocused: false
              });
              console.log(this.state.venue)
          }}

          getDefaultValue={() => ''}

          query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyDkIWixhcpMisJ3Ua73U1G5HcEsEq-mzQs',
          language: 'en', // language of the results
          // default: 'geocode'
          }}
          styles={(this.state.locationFocused === false) ? {
          container: {
          width: width - 50,
          shadowOpacity: 0,
          flex: 0,
          top: 0,
          marginLeft: 10
          },
          listView: {
            height: 100,
          },
          textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderRadius: 5
          },

          } : {
          container: {
          width: width - 50,
          shadowOpacity: 0,
          flex: 0,
          top: 0,
          },
          listView: {
            height: 100,
          },
          textInputContainer: {
          backgroundColor: '#FA7E7E',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderRadius: 5
          },
          listView: {
         position: 'absolute',
         zIndex: 9999,
         top: 40
          },
          row: {
          backgroundColor: 'white'
          },
          }}
          />
          )}

        </View>

        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Bought in:</Text>
          <BuyinInput
            label="$"
            placeholder="1000"
            value={this.props.buyin}
            onChangeText={value => this.props.sessionUpdate({ prop: 'buyin', value })}
          />
        </View>

        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Cashed Out:</Text>
          <BuyinInput
            label="$"
            placeholder="1500"
            value={this.props.cashedout}
            onChangeText={value => this.props.sessionUpdate({ prop: 'cashedout', value })}
          />
        </View>

        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Net Result:</Text>
          <Text style={( netResult>= 0) ? styles.green : styles.red}>{( netResult>= 0) ? '+$' + netResult : '-$' + Math.abs(netResult) }</Text>
        </View>



        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Blinds:</Text>
          <View style={{flexDirection: 'row'}}>
            <BlindInputOngoing
              style={{marginRight: 20}}
              label="$ "
              placeholder="5"
              value={this.props.smallblind}
              onChangeText={value => this.props.sessionUpdate({ prop: 'smallblind', value })}
            />
            <BlindInputOngoing
              placeholder="10"
              value={this.props.bigblind}
              onChangeText={value => this.props.sessionUpdate({ prop: 'bigblind', value })}
            />
          </View>
        </View>

        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Limit:</Text>
          <TouchableOpacity onPress={this._toggleLimitModal}>

            <View style={{justifyContent: 'flex-end'}}>
              <Text style={styles.statTextStyle}>
               {this.props.limit ? this.props.limit : 'No Limit'}
               </Text>
            </View>
          </TouchableOpacity>


          <Modal isVisible={this.state.isLimitModalVisible} style={{ flexDirection: 'column', justifyContent: 'flex-end',
              marginBottom: 100
           }}>
           <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ width: 200,
      height: 200, bottom: 0, justifyContent: 'flex-end',
          margin: 20, }}>

<Picker
  selectedValue={this.props.limit}
  onValueChange={value => this.props.sessionUpdate({ prop: 'limit', value })}
  itemStyle={{ color: "#FCFDFC", fontFamily:"Cabin", fontSize:17 }}
>
    <PickerItem label="No Limit" value='No Limit' />
    <PickerItem label="Pot Limit" value="Pot Limit" />
    <PickerItem label="Fixed Limit" value="Fixed Limit" />
</Picker>

<TouchableOpacity onPress={this._toggleLimitModal}>
  <Text style={{ textAlign: 'center', color: '#FCFDFC'}}>Confirm</Text>
</TouchableOpacity>

              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Game Type:</Text>
          <TouchableOpacity onPress={this._toggleModal}>

            <View style={{justifyContent: 'flex-end'}}>
              <Text style={styles.statTextStyle}>
               {this.props.gametype ? this.props.gametype : 'Hold em'}
               </Text>
            </View>
          </TouchableOpacity>



          <Modal isVisible={this.state.isModalVisible} style={{ flexDirection: 'column', justifyContent: 'flex-end',
              marginBottom: 100
           }}>
           <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ width: 200,
      height: 200, bottom: 0, justifyContent: 'flex-end',
          margin: 20, }}>

<Picker
  selectedValue={this.props.gametype}
  onValueChange={value => this.props.sessionUpdate({ prop: 'gametype', value })}
  itemStyle={{ color: "#FCFDFC", fontFamily:"Cabin", fontSize:17 }}
>
  <PickerItem label="Hold em" value='Hold em' />
  <PickerItem label="Omaha" value="Omaha" />
  <PickerItem label="Omaha Hi/Lo" value="Omaha Hi/Lo" />
  <PickerItem label="Short Deck" value="Short Deck" />
  <PickerItem label="Mix" value="Mix" />
  <PickerItem label="Stud" value="Stud" />
  <PickerItem label="2-7 Triple Draw" value="2-7 Triple Draw" />
  <PickerItem label="Razz" value="Razz" />
</Picker>

<TouchableOpacity onPress={this._toggleModal}>
  <Text style={{ textAlign: 'center', color: '#FCFDFC'}}>Confirm</Text>
</TouchableOpacity>

              </View>
            </View>
          </Modal>
        </View>



      </ScrollView>

            {recording == 'start' && start == 0 &&
              <TouchableOpacity style={styles.saveButton} onPress={this.start}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#03ADB0', '#03ADB0', '#03ADB0']} style={styles.linearGradient}>
                      <Text style={styles.saveText}>Start</Text>
                  </LinearGradient>
              </TouchableOpacity>}
            {recording == 'start' && start > 0 && 
              <TouchableOpacity style={styles.saveButton} onPress={this.stop}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FA7E7E', '#FA7E7E', '#FA7E7E']} style={styles.linearGradient}>
                      <Text style={styles.saveText}>Stop</Text>
                  </LinearGradient>
              </TouchableOpacity>}
            {recording == 'end' && 
              <TouchableOpacity style={styles.saveButton} onPress={this.onButtonPress.bind(this)}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2D6BEC', '#1888E5', '#04A6E0']} style={styles.linearGradient}>
                      <Text style={styles.saveText}>Save</Text>
                  </LinearGradient>
              </TouchableOpacity>}

      </View>
  );
}

saveStartTime(){
  let startTime = new Date();
  AsyncStorage.setItem('startTime', JSON.stringify(startTime));
}

displayStartTime = async () => {
  try{
    let startTime = await AsyncStorage.getItem('startTime')
    alert(startTime)
  }
  catch(error) {
    alert(error);
  }
}
}

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#274272',
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
    marginRight: 15,
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
   color: '#FCFDFC',
   fontFamily: Fonts.Cabin,
   fontSize: 18
 },
 headerText: {
   fontFamily: Fonts.CabinBold,
   fontSize: 30,
   color: '#13233B',
   textAlign: 'center',
 },
 saveButton: {
   width: width - 50,
   height: 50,
   backgroundColor: '#330066',
   borderRadius: 15,
   justifyContent: 'center',
   alignSelf: 'center',
   margin: 30
 },
 saveText: {
   fontFamily: Fonts.CabinBold,
   fontSize: 27,
   color: '#FCFDFC',
   textAlign: 'center',
 },
 locationCard: {
   margin: 10,
   borderWidth: 0.2,
   borderRadius: 5,
   shadowColor: '#ccc',
   shadowOpacity: 1,
   shadowRadius: 5,
 },
 venueBoxStyle: {
   flexDirection: 'row',
   height: 40,
   fontFamily: Fonts.Cabin,
   fontSize: 20,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#3B5889',
   borderWidth: 0.2,
   borderColor: 'grey',
   shadowOpacity: 0,
   borderTopLeftRadius: 5,
   borderTopRightRadius: 5,
 },
 detailsBoxStyle: {
   paddingVertical: 20,
   fontFamily: Fonts.Cabin,
   fontSize: 20,
   justifyContent: 'flex-start',
   alignItems: 'center',
   backgroundColor: 'white',
   borderWidth: 0.2,
   borderColor: 'grey',
   shadowOpacity: 0,
   borderBottomLeftRadius: 5,
   borderBottomRightRadius: 5,
   height: detailsHeight
 },
 timeBoxStyle: {
   paddingVertical: 20,
   fontFamily: Fonts.Cabin,
   fontSize: 20,
   justifyContent: 'space-between',
   backgroundColor: 'white',
   borderWidth: 0.2,
   borderColor: 'grey',
   shadowOpacity: 0,
   borderBottomLeftRadius: 5,
   borderBottomRightRadius: 5,
   height: detailsHeight
 },
 detailsCard: {
   margin: 10,
   marginTop: 20,
   borderWidth: 0.2,
   borderRadius: 5,
   shadowColor: '#ccc',
   shadowOpacity: 1,
   shadowRadius: 5,
 },
 dateStyle: {
     fontSize: 20,
     color: '#FCFDFC'
 },
 statSection:{
   flexDirection: 'row',
   height: 50,
   borderBottomWidth: 0.5,
   color: 'white',
   borderColor: '#274272',
   backgroundColor: '#3B5889',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingLeft: 20,
   paddingRight: 20,
 },
 locationStatSection:{
   flexDirection: 'row',
   height: 150,
   borderBottomWidth: 0.5,
   color: 'white',
   borderColor: '#274272',
   backgroundColor: '#3B5889',
   justifyContent: 'center',
   paddingTop: 18,
   paddingLeft: 20,
   paddingRight: 20,
 },
 statTextStyle: {
   color: '#FCFDFC',
   fontFamily: Fonts.Cabin,
   fontSize: 18
 },
 venueStatTextStyle: {
   color: '#FCFDFC',
   fontFamily: Fonts.Cabin,
   fontSize: 18,
 },
startStatTextStyle: {
  color:'#03ADB0',
  fontFamily: Fonts.Cabin,
  fontSize: 18
},
endStatTextStyle: {
  color:'#FA7E7E',
  fontFamily: Fonts.Cabin,
  fontSize: 18
},
green: {
  fontSize: 18,
  fontFamily: Fonts.CabinBold,
  color: '#03ADB0'
},
red: {
  fontSize: 20,
  fontFamily: Fonts.CabinBold,
  color: '#FA7E7E'
},
 container: {
  flex: 1,
  backgroundColor: '#0D0D0D',
  alignItems: 'center',
  paddingTop: 130,
  paddingHorizontal: 20,
},
timer: {
  color: '#FFFFFF',
  fontSize: 76,
  fontWeight: '200',
  width: 110,
},
button: {
  width: 80,
  height: 80,
  borderRadius: 40,
  justifyContent: 'center',
  alignItems: 'center',
},
buttonTitle: {
  fontSize: 18,
},
buttonBorder: {
  width: 76,
  height: 76,
  borderRadius: 38,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
buttonsRow: {
  flexDirection: 'row',
  alignSelf: 'stretch',
  justifyContent: 'space-between',
  marginTop: 80,
  marginBottom: 30,
},
lapText: {
  color: '#FFFFFF',
  fontSize: 18,
},
lapTimer: {
  width: 30,
},
lap: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderColor: '#151515',
  borderTopWidth: 1,
  paddingVertical: 10,
},
scrollView: {
  alignSelf: 'stretch',
},
fastest: {
  color: '#4BC05F',
},
slowest: {
  color: '#CC3531',
},
timerContainer: {
  flexDirection: 'row',
},
timer: {
  color: '#FCFDFC',
  fontFamily: Fonts.Cabin,
  fontSize: 18
},
});

const mapStateToProps = (state) => {
  const { buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit } = state.sessionForm;

  return { buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit };
};

export default connect(mapStateToProps, {
  sessionUpdate, sessionCreate
})(OnGoingSession);
