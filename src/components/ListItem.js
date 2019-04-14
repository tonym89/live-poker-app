import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from './common';
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

      return totalhours + ' hours ' + minutes + ' minutes ';
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

   return 'Sunday, ' + day + ' ' + monthName;
}


    return (
      <View>
        <View style={styles.dateViewStyle}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.timeStyle}> { getTextDate(new Date(sessionstart)) }</Text>
            <Text style={styles.locationStyle}>{location} </Text>
          </View>
        </View>
        <CardSection>
            <View style={{flexDirection: 'row', padding: 5}}>
              <Text style={( netResult>= 0) ? styles.green : styles.red}>{( netResult>= 0) ? '+$' + netResult + '   ': '-$' + Math.abs(netResult) + '   '}</Text>
              <Text style={styles.titleStyle}>{smallblind}-{bigblind} {limit} {gametype} </Text>
            </View>
        </CardSection>
        <CardSection>
            <View style={{flexDirection: 'row', padding: 5}}>
              <Text style={styles.green}> </Text>
              <Text style={styles.titleStyle}>{msToTimeWords(new Date(differenceInMs))}played</Text>
            </View>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    fontFamily: Fonts.Cabin,
    paddingRight: 15
  },
  timeStyle: {
    fontSize: 18,
    paddingLeft: 15,
    color: '#13233B'
  },
  locationStyle: {
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#13233B'
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
    width: 100,
    fontSize: 20,
    fontFamily: Fonts.CabinBold,
    color: 'green'
  },
  red: {
    width: 100,
    fontSize: 20,
    fontFamily: Fonts.CabinBold,
    color: '#ff0000'
  },
};

export default ListItem;
