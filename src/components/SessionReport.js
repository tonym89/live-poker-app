import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { Map } from './Map';
import { Fonts } from '../utils/Fonts';
import { CardSection } from './common';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class SessionReport extends Component {

  onButtonPress() {
    Actions.editLocation({ session: this.props.session });
  };

  componentDidMount(){
  }

  render() {

    const { time } = this.props.session;
    const { cashedout } = this.props.session;
    const { buyin } = this.props.session;
    const { sessionstart } = this.props.session;
    const { sessionend } = this.props.session;
    const { gametype } = this.props.session;
    const { bigblind } = this.props.session;
    const { smallblind } = this.props.session;
    const { location } = this.props.session;
    const { limit } = this.props.session;
    const { venue } = this.props.session;
    const { venueDetails } = this.props.session;

    console.log(this.props);

    const netResult = cashedout - buyin;



    const dateNewer = new Date(sessionstart);
    const dateOlder = new Date(sessionend);
    const differenceInMs = dateOlder - dateNewer;

    function msToTimeWords(duration) {
      const milliseconds = parseInt((duration % 1000) / 100);
      const seconds = Math.floor((duration / 1000) % 60);
      const minutes = Math.floor((duration / (1000 * 60)) % 60);
      const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      const days = Math.floor((duration / (1000 * 60 * 60 * 24)) );
      const totalhours = ((days * 24) + hours);
      if (totalhours === 1) {
        return totalhours + ' hour ' + minutes + ' minutes';
      }
      else {
        return totalhours + ' hours ' + minutes + ' minutes';
      }
    }

    function msToHours(duration) {
      const milliseconds = parseInt((duration % 1000) / 100);
      const seconds = Math.floor((duration / 1000) % 60);
      const minutes = Math.floor((duration / (1000 * 60)) % 60);
      const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      const days = Math.floor((duration / (1000 * 60 * 60 * 24)) );
      const totalhours = ((days * 24) + hours);
      const decimalhours = totalhours + minutes/60;
      return decimalhours
    }


    function getTextDate(date) {
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ];
       var year = date.getFullYear();
       var month = (1 + date.getMonth()).toString();
       month = month.length > 1 ? month : '0' + month;
       var day = date.getDate().toString();
       day = day;
       var hours = date.getHours().toString();
       var minutes = date.getMinutes().toString();
       var time = date.toTimeString().substr(0,5);
       var monthName = monthNames[date.getMonth()];
       var dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
       var dayOfWeek = dayNames[ date.getDay() ];
       var todaysDate = new Date();
       var yesterdaysDate =  new Date(Date.now() - 864e5);
       if(date.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
        return 'Today'
    }
      if(date.setHours(0,0,0,0) == yesterdaysDate.setHours(0,0,0,0)) {
       return 'Yesterday'
      }
       return dayOfWeek + ' ' + day + ' ' + monthName;
    }

    const hourly = (netResult/msToHours(new Date(differenceInMs))).toFixed(2);

    return(
        <View style={styles.mainViewStyle}>

        <View style={{flex: 0.3}}>





          <Map data={this.props.session.venueDetails.geometry.location}/>


        </View>

        <View style={{flex: 0.7}}>

        <View style={styles.detailsCard}>

        <View style={styles.venueBoxStyle}>
          <Text style={styles.dateStyle}>{ getTextDate(new Date(sessionstart)) }</Text>


        </View>

        <View style={styles.detailsBoxStyle}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={( netResult>= 0) ? styles.green : styles.red}>{( netResult>= 0) ? '+$' + netResult: '-$' + Math.abs(netResult)}</Text>
        </View>



          <View style={styles.sessionDetailsRow}>
            <Text style={styles.timeStyle}>Buy in:</Text>
            <Text style={styles.locationStyle}>${buyin}</Text>
          </View>

          <View style={styles.sessionDetailsRow}>
            <Text style={styles.timeStyle}>Cashed out:</Text>
            <Text style={styles.locationStyle}>${cashedout}</Text>
          </View>


          <View style={styles.sessionDetailsRow}>
            <Text style={styles.timeStyle}>Stakes:</Text>
            <Text style={styles.locationStyle}>${smallblind}/{bigblind}</Text>
          </View>

          <View style={styles.sessionDetailsRow}>
            <Text style={styles.timeStyle}>Session length:</Text>
            <Text style={styles.locationStyle}>{msToTimeWords(new Date(differenceInMs))}</Text>
          </View>

          <View style={styles.sessionDetailsRow}>
            <Text style={styles.timeStyle}>$/hour:</Text>
            <Text style={styles.locationStyle}>{( hourly>= 0) ? '+$' + hourly: '-$' + Math.abs(hourly)}</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.saveButton} onPress={this.onButtonPress.bind(this)}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#DE4150', '#FF6978', '#DE4150']} style={styles.linearGradient}>
                  <Text style={styles.saveText}>Edit Session</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>


          </View>

          </View>

          </View>

        </View>
      )
    }
}

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FDFDFD',
  },
  sessionDetailsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderBottomWidth: 0.2,
  borderColor: '#F1F2F4',
  padding: 5
  },
  timeStyle: {
    fontSize: 20,
    paddingLeft: 15,
    color: '#030303'
  },
  locationStyle: {
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#030303',
  },
  venueBoxStyle: {
    height: 40,
    fontFamily: Fonts.Cabin,
    fontSize: 20,
    justifyContent: 'space-between',
    backgroundColor: '#274272',
    borderWidth: 0.2,
    borderColor: 'grey',
    shadowOpacity: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'center',
  },
  detailsBoxStyle: {
    paddingVertical: 20,
    fontFamily: Fonts.Cabin,
    fontSize: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 0.2,
    borderColor: 'grey',
    shadowOpacity: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  dateStyle: {
      fontSize: 18,
      paddingLeft: 15,
      color: '#FCFDFC'
  },
  mapTextStyle: {
    fontFamily: Fonts.CabinBold,
    fontSize: 24,
    padding: 10,
    color: '#030303',
    backgroundColor: '#FDFDFD',
    textAlign: 'center'
  },
  green: {
    fontSize: 28,
    fontFamily: Fonts.CabinBold,
    color: 'green'
  },
  red: {
    fontSize: 28,
    fontFamily: Fonts.CabinBold,
    color: '#ff0000'
  },
  mapCard: {
    margin: 10,
    borderRadius: 10,
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  detailsCard: {
    margin: 10,
    marginTop: 50,
    borderWidth: 0.2,
    borderRadius: 5,
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  saveButton: {
    width: 180,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
  },
  linearGradient: {
   flex: 1,
   paddingLeft: 15,
   paddingRight: 15,
   borderRadius: 10,
   justifyContent: 'center',
   alignItems: 'center',
   margin: 10
 },
 saveText: {
   fontFamily: Fonts.CabinBold,
   fontSize: 22,
   color: '#FCFDFC',
   textAlign: 'center',
 },
});

export default SessionReport;
