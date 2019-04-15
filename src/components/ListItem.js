import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { CardSection, TimerSvg, OmahaSvg, ChipsSvg, HoldEmSvg } from './common';
import { Fonts } from '../utils/Fonts';


class ListItem extends Component {
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

    const dateNewer = new Date(sessionstart);
    const dateOlder = new Date(sessionend);

    const differenceInMs = dateOlder - dateNewer;

    const netResult = cashedout - buyin;

    function msToTimeWords(duration) {
    const milliseconds = parseInt((duration % 1000) / 100);
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor((duration / (1000 * 60 * 60 * 24)) );
    const totalhours = ((days * 24) + hours);


    if (hours === 1) {
      return totalhours + ' hour ' + minutes + ' minutes';
    }
    else {
      return totalhours + ' hours ' + minutes + ' minutes';
    }
    }


    function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes;
}

function getFormattedDate(date) {
 var year = date.getFullYear();

 var month = (1 + date.getMonth()).toString();
 month = month.length > 1 ? month : '0' + month;

 var day = date.getDate().toString();
 day = day.length > 1 ? day : '0' + day;

 return month + '/' + day + '/' + year;
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


    return (
      <View>
        <View style={styles.dateViewStyle}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.timeStyle}> { getTextDate(new Date(sessionstart)) }</Text>
            <Text style={styles.locationStyle}>{location} </Text>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
        <View style={{flex: 0.7, padding: 4, paddingLeft: 15}}>


              <View style={{flexDirection:'row', padding: 2}}>
                <ChipsSvg />
                <Text style={styles.titleStyle}>  ${smallblind} / ${bigblind}</Text>
              </View>

              { gametype === 'Hold em' &&

              <View style={{flexDirection:'row', padding: 2}}>
                <HoldEmSvg />
                <Text style={styles.titleStyle}>  {limit} {gametype}</Text>
              </View>

            }

            { gametype === 'Omaha' &&
            <View style={{flexDirection:'row', padding: 2}}>
              <OmahaSvg />
              <Text style={styles.titleStyle}>  {limit} {gametype}</Text>
            </View>
          }

          { gametype === 'Razz' &&
          <View style={{flexDirection:'row', padding: 2}}>
            <OmahaSvg />
            <Text style={styles.titleStyle}>  {limit} {gametype}</Text>
          </View>
        }

              <View style={{flexDirection:'row', padding: 2}}>
                <TimerSvg />
                <Text style={styles.titleStyle}>  {msToTimeWords(new Date(differenceInMs))}</Text>
              </View>
        </View>

          <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
               <Text style={( netResult>= 0) ? styles.green : styles.red}>{( netResult>= 0) ? '+$' + netResult + '   ': '-$' + Math.abs(netResult) + '   '}</Text>
          </View>

        </View>

      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 20,
    fontFamily: Fonts.Cabin,
    paddingRight: 15,
    color: '#030303'
  },
  timeStyle: {
    fontSize: 18,
    paddingLeft: 15,
    color: '#030303'
  },
  locationStyle: {
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#030303'
  },
  dateViewStyle: {
    height: 40,
    fontFamily: Fonts.Cabin,
    fontSize: 20,
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    borderWidth: 0.2,
    borderColor: 'grey'
  },
  green: {
    fontSize: 20,
    fontFamily: Fonts.CabinBold,
    color: 'green'
  },
  red: {
    fontSize: 20,
    fontFamily: Fonts.CabinBold,
    color: '#ff0000'
  },
};

export default ListItem;
