import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { sessionsFetch } from '../actions';
import ListItem from './ListItem';
import HomeGraph from './HomeGraph';
import Chart from './Chart';
import { FilterModal } from './common';
import { Fonts } from '../utils/Fonts';


class Statistics extends Component {
  constructor(props){
    super();
    this.state={
      filter: 'none',
      startDate: '',
      endDate: '',
      showModal: false
    }
  }


  componentWillReceiveProps() {
    this.toggleModal();
  }


  componentDidMount() {
    this.props.sessionsFetch();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.sessions.length !== this.props.sessions.length) {
      this.props.sessionsFetch();
    }
  }



  onFilterPress = (value1, value2) => {
    this.setState({filter: 'on'})
    this.setState({startDate: value1})
    this.setState({endDate: value2})
    this.setState({showModal: false})
  };
  onClearFilterPress = () => {
    this.setState({filter: 'off'})
    this.setState({showModal: false})
    console.log(this.props)
  };


      toggleModal () {
        if (this.props.modalVisible === true){
          this.setState({ showModal: !this.state.showModal })
          this.props.modalVisible = false
            }
      }


  render() {

    const { filter, startDate, endDate } = this.state


    const sessionsData = sortByDate(this.props.sessions);


    function sortByDate(sessionsData) {
        let sortedSessions = sessionsData.sort(function(a,b){return new Date(a.sessionstart)<new Date(b.sessionstart) ? -1 : new Date(a.sessionstart)>new Date(b.sessionstart) ? 1 : 0 ;})

         var filteredData = [];
         for(var index in sortedSessions) {
         var obj = sortedSessions[index];
         var date = new Date(obj.sessionstart);
         if(date >= new Date(startDate) && date <= new Date(endDate))
          filteredData.push(obj);
       }
         console.log(sortedSessions)
         console.log(filteredData)

        if (filter === 'on'){
         return filteredData;
         }
        else {
         return sortedSessions
        }
   }


       if (this.props && sessionsData[0]) {

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
    if (parseInt(sessionsData[i].cashedout, 10) > parseInt(sessionsData[i].buyin, 10)) {
      winningSessions += 1;
      console.log(sessionsData[i])
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

function getTextDate(date) {
  let d = new Date(date)
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
   var year = d.getFullYear();
   var month = (1 + d.getMonth()).toString();
   month = month.length > 1 ? month : '0' + month;
   var day = d.getDate().toString();
   day = day;
   var hours = d.getHours().toString();
   var minutes = d.getMinutes().toString();
   var time = d.toTimeString().substr(0,5);
   var monthName = monthNames[d.getMonth()];
   var dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
   var dayOfWeek = dayNames[ d.getDay() ];
   var todaysDate = new Date();
   var yesterdaysDate =  new Date(Date.now() - 864e5);
   if(d.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
    return 'Today'
}
  if(d.setHours(0,0,0,0) == yesterdaysDate.setHours(0,0,0,0)) {
   return 'Yesterday'
  }
   return dayOfWeek + ' ' + day + ' ' + monthName + ' ' + hours + ':' + minutes;
}

    return (
      <View style={styles.mainViewStyle}>


      <View style={styles.totalResultsCard}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#03ADB0', '#01CCAD']} style={styles.linearGradient}>
        <Text style={styles.headingText}>Total Profit:</Text>
        <Text style={styles.resultText}>{( totalResults>= 0) ? '+$' + totalResults: '-$' + Math.abs(totalResults)}</Text>
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

        <View style={{alignItems: 'center', padding: 30}}>
          <TouchableOpacity style={styles.graphTypeButton} onPress={() => this.setState({ showModal: !this.state.showModal })}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2D6BEC', '#1888E5', '#04A6E0']} style={styles.linearGradient}>
                <Text style={styles.filtersText}>Filters</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </ScrollView>



      <FilterModal
        visible={this.state.showModal}
        onJanuaryFilterPress = {this.onFilterPress.bind(this, new Date('January 1 2019 00:00:00'), new Date('January 31 2019 23:59:00'))}
        onFebruaryFilterPress = {this.onFilterPress.bind(this, new Date('February 1 2019 00:00:00'), new Date('February 28 2019 23:59:00'))}
        onMarchFilterPress = {this.onFilterPress.bind(this, new Date('March 1 2019 00:00:00'), new Date('March 31 2019 23:59:00'))}
        onAprilFilterPress = {this.onFilterPress.bind(this, new Date('April 1 2019 00:00:00'), new Date('April 30 2019 23:59:00'))}
        onMayFilterPress = {this.onFilterPress.bind(this, new Date('May 1 2019 00:00:00'), new Date('May 31 2019 23:59:00'))}
        onJuneFilterPress = {this.onFilterPress.bind(this, new Date('June 1 2019 00:00:00'), new Date('June 30 2019 23:59:00'))}
        onJulyFilterPress = {this.onFilterPress.bind(this, new Date('July 1 2019 00:00:00'), new Date('July 31 2019 23:59:00'))}
        onAugustFilterPress = {this.onFilterPress.bind(this, new Date('August 1 2019 00:00:00'), new Date('August 31 2019 23:59:00'))}
        onSeptemberFilterPress = {this.onFilterPress.bind(this, new Date('September 1 2019 00:00:00'), new Date('September 30 2019 23:59:00'))}
        onOctoberFilterPress = {this.onFilterPress.bind(this, new Date('October 1 2019 00:00:00'), new Date('October 31 2019 23:59:00'))}
        onNovemberFilterPress = {this.onFilterPress.bind(this, new Date('November 1 2019 00:00:00'), new Date('November 30 2019 23:59:00'))}
        onDecemberFilterPress = {this.onFilterPress.bind(this, new Date('December 1 2019 00:00:00'), new Date('December 31 2019 23:59:00'))}
        onClearFilterPress = {this.onClearFilterPress.bind(this)}
        >
        Filter by month
      </FilterModal>

      </View>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#274272'}}>
        <Text style={styles.errorTextStyle}>Not enough data.  You may need to wait for data to load, add more sessions, or clear your filters.</Text>
        <TouchableOpacity style={styles.graphTypeButton} onPress={this.onClearFilterPress.bind(this)}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#3B5889', '#3B5889' ]} style={styles.linearGradient}>
              <Text style={styles.clearFiltersText}>Clear Filters</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  }
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
    fontSize: 26,
    fontFamily: Fonts.CabinBold,
    padding: 3
  },
  headingText: {
    color: '#FCFDFC',
    textAlign: 'center',
    fontSize: 32,
    fontFamily: Fonts.CabinBold
  },
  clearFiltersText:{
    color: '#FCFDFC',
    textAlign: 'center',
    fontSize: 18,
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
  },
  errorTextStyle: {
    color: '#FCFDFC',
    fontFamily: Fonts.Cabin,
    fontSize: 18,
    padding: 20
  },
  filtersText: {
    fontFamily: Fonts.CabinBold,
    fontSize: 22,
    color: '#FCFDFC',
    textAlign: 'center',
  },
}

const mapStateToProps = state => {
  const sessions = _.map(state.sessions, (val, uid) => {
    return { ...val, uid }
  });
  return { sessions };
}

export default connect(mapStateToProps, { sessionsFetch })(Statistics);
