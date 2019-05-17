import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, Button, Picker, PickerItem } from 'react-native';
import { sessionsFetch } from '../actions';
import ListItem from './ListItem';
import HomeGraph from './HomeGraph';
import StatisticsChart from './StatisticsChart';
import StatisticsChartLinear from './StatisticsChartLinear';
import StatisticsChartStepBefore from './StatisticsChartStepBefore';
import StatisticsChartLineGraph from './StatisticsChartLineGraph';


class StatisticsGraphPage extends Component {
  constructor(props){
    super();
    this.state={
      graphType: "curveBasis"
    }
  }

  onButtonPress = () => {
    this.setState({
      graphType: "curveLinear"
    });
  }


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

    const dates = testData.map(a => a.x);

var maxDate=new Date(Math.max.apply(null,dates));
var minDate=new Date(Math.min.apply(null,dates));

const results = testData.map(a => a.y);
const ymax = Math.max.apply(null, results);

    return (
      <View style={styles.mainViewStyle}>


      { this.props && this.props.sessions[0] && this.state.graphType==="curveBasis" &&
     <StatisticsChart data={cumulativeData} style={styles.homeGraphStyle}/>
     }

     { this.props && this.props.sessions[0] && this.state.graphType==="curveLinear" &&
    <StatisticsChartLinear data={cumulativeData} style={styles.homeGraphStyle}/>
    }


    { this.props && this.props.sessions[0] && this.state.graphType==="curveStepBefore" &&
   <StatisticsChartStepBefore data={cumulativeData} style={styles.homeGraphStyle}/>
    }

     { this.props && this.props.sessions[0] && this.state.graphType==="svgLineGraph" &&
    <StatisticsChartLineGraph data={cumulativeData} style={styles.homeGraphStyle}/>
    }

    <View style={{flexDirection: 'column', marginTop: 50}}>
      <View style={{flexDirection: 'row'}}>
        <Text> Curve </Text>
        <Text> Step </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text> Linear </Text>
        <Text> Traditional </Text>
      </View>
    </View>

          <Text style={{color:"#FCFDFC", marginTop: 120}}>Graph Type</Text>

          <Picker
            selectedValue={this.state.graphType}
            onValueChange={(itemValue, itemIndex) =>
                    this.setState({graphType: itemValue})
                  }
            style={{width:'80%', color: "white"}}
            itemStyle={{ color: "#FCFDFC", fontFamily:"Cabin", fontSize:17 }}
          >
            <Picker.Item label="Curve" value='curveBasis' />
            <Picker.Item label="Linear" value="curveLinear" />
            <Picker.Item label="Step" value="curveStepBefore" />
            <Picker.Item label="Line Graph" value="svgLineGraph" />
          </Picker>

      </View>
    );
  };
}

const styles = {
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#274272',
    alignItems: 'center',
    justifyContent: 'flex-start'
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

export default connect(mapStateToProps, { sessionsFetch })(StatisticsGraphPage);
