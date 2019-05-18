import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, ScrollView } from 'react-native';
import { sessionsFetch } from '../actions';
import ListItem from './ListItem';
import HomeGraph from './HomeGraph';
import Chart from './Chart';
import { Fonts } from '../utils/Fonts';
import LinearGradient from 'react-native-linear-gradient';


class Statistics extends Component {


  componentDidMount() {
    this.props.sessionsFetch();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.sessions.length !== this.props.sessions.length) {
      this.props.sessionsFetch();
    }
  }


  render() {

    function sortByDate(sessionsData) {
   let sortedSessions = sessionsData.sort(function(a,b){return new Date(a.sessionstart)<new Date(b.sessionstart) ? -1 : new Date(a.sessionstart)>new Date(b.sessionstart) ? 1 : 0 ;})
   return sortedSessions;
 }

      const sessionsData = sortByDate(this.props.sessions);

    function createData(sessionsData) {
  let graphData = [];
  for (let i=0; i<sessionsData.length; i+=1) {
   graphData.push({x: new Date(sessionsData[i].sessionstart), y: parseFloat(sessionsData[i].cashedout) - parseFloat(sessionsData[i].buyin)});
  }
  return graphData;
}

  const graphData = createData(sessionsData);




  function createCumulativeData(graphData) {
    let cumulativeData = [];
    for (let i=0; i<graphData.length; i+=1)  if(i===0){
      cumulativeData.push({x: graphData[i].x, y: graphData[i].y })
    } else {
      cumulativeData.push({x: graphData[i].x, y: graphData[i].y + cumulativeData[i-1].y})
    }
    return cumulativeData;
  }

  function calculateWinningSessions(sessionsData) {
  let winningSessions = 0;
  for (let i=0; i<sessionsData.length; i+=1) {
    if (sessionsData[i].cashedout > sessionsData[i].buyin) {
      winningSessions += 1;
    }
  }
  return winningSessions
  }

  const totalWinningSessions = calculateWinningSessions(sessionsData);

  function bigBlindsEarned(sessionsData) {
  let bigBlinds = 0;
  let totalSessionEnd = 0;
  for (let i=0; i<sessionsData.length; i+=1) {
  bigBlinds = bigBlinds + ((sessionsData[i].cashedout - sessionsData[i].buyin)/sessionsData[i].bigblind)
  console.log(bigBlinds)
  }
  return bigBlinds
  }

  const totalBigBlinds = bigBlindsEarned(sessionsData)


function totalTimePlayed(sessionsData) {
let totalSessionStart = 0;
let totalSessionEnd = 0;
for (let i=0; i<sessionsData.length; i+=1) {
totalSessionStart = totalSessionStart + new Date(sessionsData[i].sessionstart).getTime()
totalSessionEnd = totalSessionEnd + new Date(sessionsData[i].sessionend).getTime()
console.log(totalSessionStart)
}
const totalMsPlayed = (totalSessionEnd - totalSessionStart)
const milliseconds = parseInt((totalMsPlayed % 1000) / 100);
const seconds = Math.floor((totalMsPlayed / 1000) % 60);
const minutes = Math.floor((totalMsPlayed / (1000 * 60)) % 60);
const hours = Math.floor((totalMsPlayed / (1000 * 60 * 60)) % 24);
const days = Math.floor((totalMsPlayed / (1000 * 60 * 60 * 24)) );
const totalhours = ((days * 24) + hours);

if (totalhours === 1) {
  return totalhours + ' hour ' + minutes + ' minutes';
}
else {
  return totalhours + ' hours ' + minutes + ' minutes';
}
}

function totalTimePlayedHours(sessionsData) {
let totalSessionStart = 0;
let totalSessionEnd = 0;
for (let i=0; i<sessionsData.length; i+=1) {
totalSessionStart = totalSessionStart + new Date(sessionsData[i].sessionstart).getTime()
totalSessionEnd = totalSessionEnd + new Date(sessionsData[i].sessionend).getTime()
console.log(totalSessionStart)
}
const totalMsPlayed = (totalSessionEnd - totalSessionStart)
const milliseconds = parseInt((totalMsPlayed % 1000) / 100);
const seconds = Math.floor((totalMsPlayed / 1000) % 60);
const minutes = Math.floor((totalMsPlayed / (1000 * 60)) % 60);
const hours = Math.floor((totalMsPlayed / (1000 * 60 * 60)) % 24);
const days = Math.floor((totalMsPlayed / (1000 * 60 * 60 * 24)) );
const totalhours = ((days * 24) + hours) + (minutes / 60);
return totalhours
}

const totalMsPlayed = totalTimePlayed(sessionsData)
const totalHoursPlayed = totalTimePlayedHours(sessionsData)




    console.log(graphData);

    const testData =
      [
      { x: new Date(2018, 9, 1), y: 0 },
      { x: new Date(2018, 9, 16), y: -100 },
      { x: new Date(2018, 9, 17), y: 200 },
      { x: new Date(2018, 10, 1), y: 200 },
      { x: new Date(2018, 10, 2), y: 300 },
      { x: new Date(2018, 10, 3), y: 0 },
      { x: new Date(2018, 10, 4), y: 200 },
      { x: new Date(2018, 10, 5), y: 300 },
      { x: new Date(2018, 10, 6), y: 100 },
      { x: new Date(2018, 10, 7), y: 100 },
      { x: new Date(2018, 10, 8), y: 200 },
      { x: new Date(2018, 10, 9), y: 0 },
      { x: new Date(2018, 10, 10), y: 200 },
      { x: new Date(2018, 10, 11), y: 100 },
      { x: new Date(2018, 10, 12), y: 100 },
      { x: new Date(2018, 10, 13), y: 100 },
      { x: new Date(2018, 10, 14), y: 300 },
      { x: new Date(2018, 10, 15), y: 300 },
      { x: new Date(2018, 10, 16), y: 200 },
      { x: new Date(2018, 10, 17), y: 0 },
    ];
    console.log(testData);


      const cumulativeData = createCumulativeData(graphData)

      const totalResults = cumulativeData[(cumulativeData.length - 1)].y

    const dates = testData.map(a => a.x);

var maxDate=new Date(Math.max.apply(null,dates));
var minDate=new Date(Math.min.apply(null,dates));

const results = testData.map(a => a.y);
const ymax = Math.max.apply(null, results);

    return (
      <View style={styles.mainViewStyle}>

      <View style={styles.totalResultsCard}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#03ADB0', '#01CCAD']} style={styles.linearGradient}>
        <Text style={styles.headingText}>Total Profit:</Text>
        <Text style={styles.resultText}>+${totalResults}</Text>
        </LinearGradient>
      </View>


      <ScrollView style={{flex: 0.8}}>
        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Total Time Played</Text>
          <Text style={styles.statTextStyle}>{totalMsPlayed}</Text>
        </View>
        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>$/Hour</Text>
          <Text style={styles.statTextStyle}>${(totalResults / totalHoursPlayed).toFixed(2)}</Text>
        </View>
        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Big Blinds/Hour</Text>
          <Text style={styles.statTextStyle}>{(totalBigBlinds / totalHoursPlayed).toFixed(2)}</Text>
        </View>
        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Sessions Played</Text>
          <Text style={styles.statTextStyle}>{sessionsData.length}</Text>
        </View>
        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Winning Sessions</Text>
          <Text style={styles.statTextStyle}>{totalWinningSessions} ({((totalWinningSessions / sessionsData.length)*100).toFixed(2)}%)</Text>
        </View>
        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Average Session Length</Text>
          <Text style={styles.statTextStyle}>{(totalHoursPlayed/sessionsData.length).toFixed(2)} hours</Text>
        </View>

        <View style={styles.statSection}>
          <Text style={styles.statTextStyle}>Average Session Result</Text>
          <Text style={styles.statTextStyle}>${(totalResults / sessionsData.length).toFixed(2)}</Text>
        </View>

      </ScrollView>



      </View>
    );
  };
}

const styles = {
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#274272',
    color: '#FCFDFC'
  },
  totalResultsCard: {
    flex: 0.2,
    flexDirection: 'column',
    margin: 20,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center'
  },
  linearGradient: {
    borderRadius: 5,
    width: 250,
    padding: 5
  },
  resultText: {
    color: '#FCFDFC',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: Fonts.CabinBold,
    padding: 3
  },
  headingText: {
    color: '#FCFDFC',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: Fonts.CabinBold
  },
  sessionsListStyle:{
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
  }
}

const mapStateToProps = state => {
  const sessions = _.map(state.sessions, (val, uid) => {
    return { ...val, uid }
  });
  return { sessions };
}

export default connect(mapStateToProps, { sessionsFetch })(Statistics);
