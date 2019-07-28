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
import { Card, CardSection, Button, NumericInput, NumericInputSb, Input, FormSectionBottomCard, TimerSvgLarge, EarthSvg, EarthSvgSmall, BuyinInput } from './common';
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
      startTime: 0,
      endTime: 0,
      venue: '',
      venueDetails: '',
      start: 0,
      now: 0,
      laps: [ ],
      recording: 'start',
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  start = () => {
   const now = new Date().getTime()
   this.setState({
     start: now,
     startTime: now,
     now,
     laps: [0],
   })
   this.timer = setInterval(() => {
     this.setState({ now: new Date().getTime()})
   }, 100)
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
   const timestamp = new Date().getTime()
   clearInterval(this.timer)
   const { laps, now, start } = this.state
   const [firstLap, ...other] = laps
   this.setState({
     laps: [firstLap + now - start, ...other],
     start: 0,
     now: 0,
     endTime: timestamp,
     recording: 'end'
   })
 }
 reset = () => {
   this.setState({
     laps: [],
     start: 0,
     now: 0,
     startTime: 0,
     endTime: 0,
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
    if (new Date(this.state.startTime) > new Date(this.state.endTime)) {
      Alert.alert(
        'Please enter valid session times',
    );
    } else if (this.state.venue === '') {
      Alert.alert(
        'Please enter a location',
        );
    }
    else {
      Actions.sessionCreate({ venue: this.state.venue, venueDetails: this.state.venueDetails, sessionBegin: this.state.startTime, sessionEnd: this.state.endTime  });
    }
  };

  startDateHandler = (starttime) => {
    console.log('A start date has been picked: ', starttime);
    const value = starttime.toISOString();
    this.props.sessionUpdate({ prop: 'sessionstart', value });
    this.setState({
        isStartVisible: false,
        startTime: new Date(value),
        start: new Date(value)
    });
    console.log(new Date(this.state.startTime));
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
        endTime: new Date(value),
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

    const { now, start, laps } = this.state
    const timer = now - start

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

      <View style={styles.container}>
        <Timer
          interval={laps.reduce((total, curr) => total + curr, 0) + timer}
          style={styles.timer}
        />
        {laps.length === 0 && (
          <ButtonsRow>
            <RoundButton
              title='Lap'
              color='#8B8B90'
              background='#151515'
              disabled
            />
            <RoundButton
              title='Start'
              color='#50D167'
              background='#1B361F'
              onPress={this.start}
            />
          </ButtonsRow>
        )}
        {start > 0 && (
          <ButtonsRow>
            <RoundButton
              title='Lap'
              color='#FFFFFF'
              background='#3D3D3D'
              onPress={this.lap}
            />
            <RoundButton
              title='Stop'
              color='#E33935'
              background='#3C1715'
              onPress={this.stop}
            />
          </ButtonsRow>
        )}
        {laps.length > 0 && start === 0 && (
          <ButtonsRow>
            <RoundButton
              title='Reset'
              color='#FFFFFF'
              background='#3D3D3D'
              onPress={this.reset}
            />
            <RoundButton
              title='Start'
              color='#50D167'
              background='#1B361F'
              onPress={this.resume}
            />
          </ButtonsRow>
        )}
        <LapsTable laps={laps} timer={timer}/>
      </View>


      {laps.length === 0 && (
      <TouchableOpacity style={styles.saveButton} onPress={this.start}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#03ADB0', '#03ADB0', '#03ADB0']} style={styles.linearGradient}>
              <Text style={styles.saveText}>Start</Text>
          </LinearGradient>
      </TouchableOpacity>
      )}

      {start > 0 && (

        <TouchableOpacity style={styles.saveButton} onPress={this.stop}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FA7E7E', '#FA7E7E', '#FA7E7E']} style={styles.linearGradient}>
                <Text style={styles.saveText}>Stop</Text>
            </LinearGradient>
        </TouchableOpacity>


          )}


          {laps.length > 0 && start === 0 && (

            <TouchableOpacity style={styles.saveButton} onPress={this.stop}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FA7E7E', '#FA7E7E', '#FA7E7E']} style={styles.linearGradient}>
                    <Text style={styles.saveText}>Save</Text>
                </LinearGradient>
            </TouchableOpacity>


              )}

      <ScrollView style={{flex: 0.8}}>
      <View style={styles.statSection}>
        <Text style={styles.statTextStyle}>Start Time:</Text>

        {this.state.startTime === 0 && (
        <Text style={styles.statTextStyle}></Text>
        )}

        {this.state.startTime > 0 && (
          <TouchableOpacity onPress={this.showPicker}>
                  <Text style={styles.startStatTextStyle}>{getFormattedDate(new Date(this.state.startTime))}</Text>
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
        {this.state.endTime === 0 && (
        <Text style={styles.statTextStyle}></Text>
        )}
        {this.state.endTime > 0 && (
          <TouchableOpacity onPress={this.showEndPicker}>
                  <Text style={styles.endStatTextStyle}>{getFormattedDate(new Date(this.state.endTime))}</Text>
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
        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Bought in:</Text>
          <BuyinInput
            placeholder="$1000"
            value={this.props.buyin}
            onChangeText={value => this.props.sessionUpdate({ prop: 'buyin', value })}
          />
        </View>

        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Start Time:</Text>
          <Text style={styles.statTextStyle}>Whenever timer clicks</Text>
        </View>

        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>End Time:</Text>
          <Text style={styles.statTextStyle}></Text>
        </View>



      </ScrollView>






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
 statTextStyle: {
   color: '#FCFDFC',
   fontFamily: Fonts.Cabin,
   fontSize: 18
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
