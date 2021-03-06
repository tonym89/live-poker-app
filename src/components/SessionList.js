import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, Image, Dimensions } from 'react-native';
import { sessionsFetch } from '../actions';
import ListItem from './ListItem';
import HomeGraph from './HomeGraph';
import Chart from './Chart';
import { Fonts } from '../utils/Fonts';
import mainIcon from './common/mainIcon.png';


const { height } = Dimensions.get('window');

class SessionList extends Component {

  componentDidMount() {
    this.props.sessionsFetch();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.sessions.length !== this.props.sessions.length)
    {
      return true
    }
    else {
      return false
    }
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
      if (cumulativeData[1]){
      cumulativeData.unshift({x: new Date(cumulativeData[0].x - 1), y: 0})
      }
    return cumulativeData;
  }



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
    console.log(this.props.sessions);


      const cumulativeData = createCumulativeData(graphData)

    const dates = testData.map(a => a.x);

var maxDate=new Date(Math.max.apply(null,dates));
var minDate=new Date(Math.min.apply(null,dates));

const results = testData.map(a => a.y);
const ymax = Math.max.apply(null, results);

    return (
      <View style={styles.mainViewStyle}>
      { this.props && this.props.sessions[1] &&
     <Chart data={cumulativeData} style={styles.homeGraphStyle}/>
     }
     { !this.props.sessions[0] &&
    <View style={{height, margin: 0, backgroundColor: '#274272', color: '#FCFDFC', padding: 0}}>
        <Text style={{color: '#FCFDFC', padding: 20, paddingBottom: 0, fontFamily: Fonts.Cabin, fontSize: 26, textAlign: 'center' }}>Welcome to</Text>
        <View style={{alignSelf: 'center', marginTop: 0}}>
          <Image style={{width: 250, height: 250}} source={mainIcon} />
        </View>
        <Text style={{color: '#FCFDFC', padding: 20, fontFamily: Fonts.Cabin, fontSize: 20, textAlign: 'center' }}>To add your first session, click the 'Add' button on the top right.</Text>
        <Text style={{color: '#FCFDFC', padding: 20, fontFamily: Fonts.Cabin, fontSize: 20, textAlign: 'center' }}>If you are seeing this screen and it is not your first time using Poker Dex you may need to check your internet connection.</Text>

    </View>
      }

      { this.props.sessions[0] && !this.props.sessions[1] &&
     <View style={{height: 250, justifyContent: 'center', alignItems: 'center'}}>

       <Text style={{color: 'black', padding: 20, fontFamily: Fonts.Cabin, fontSize: 20, textAlign: 'center', }}>A minimum of two sessions are required to render sessions graph.</Text>

     </View>
       }
         <FlatList windowSize={80} data={sessionsData.reverse()} keyExtractor={(item, index) => index.toString()} renderItem={({item}) => <ListItem session={item}/>} style={styles.sessionsListStyle}/>
      </View>
    );
  };
}

const styles = {
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  homeGraphStyle: {

  },
  sessionsListStyle:{

  }
}

const mapStateToProps = state => {
  const sessions = _.map(state.sessions, (val, uid) => {
    return { ...val, uid }
  });
  return { sessions };
}

export default connect(mapStateToProps, { sessionsFetch })(SessionList);
