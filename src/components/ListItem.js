import React, { Component } from 'react';
import { Text } from 'react-native';
import { CardSection } from './common';

class ListItem extends Component {
  render() {
    const { time } = this.props.session;
    const { cashedout } = this.props.session;
    const { buyin } = this.props.session;
    const { sessionstart } = this.props.session;
    const { sessionend } = this.props.session;

    const dateNewer = new Date(sessionstart);
    const dateOlder = new Date(sessionend);

    const differenceInMs = dateOlder - dateNewer;

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

    return (
      <CardSection>
          <Text style={styles.timeStyle}> { getFormattedDate(new Date(sessionstart)) } </Text>
          <Text style={styles.titleStyle}> result: {cashedout - buyin} time: {msToTime(differenceInMs)}</Text>
      </CardSection>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingRight: 15
  },
  timeStyle: {
    color: 'red',
    fontSize: 18,
    paddingLeft: 15
  }
};

export default ListItem;
