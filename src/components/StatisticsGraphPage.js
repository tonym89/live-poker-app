import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, Button, Picker, PickerItem, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { sessionsFetch } from '../actions';
import ListItem from './ListItem';
import HomeGraph from './HomeGraph';
import Chart from './Chart';
import StatisticsChart from './StatisticsChart';
import StatisticsChartLinear from './StatisticsChartLinear';
import StatisticsChartStepBefore from './StatisticsChartStepBefore';
import StatisticsChartLineGraph from './StatisticsChartLineGraph';
import { Fonts } from '../utils/Fonts';

const { width } = Dimensions.get('window');


class StatisticsGraphPage extends Component {
  constructor(props){
    super();
    this.state={
      graphType: 'curveBasis',
      theme: 'light'
    }
  }

  onButtonPress = () => {
    this.setState({
      graphType: "curveLinear"
    });
  }

  onCurveBasisPress = () => {
    this.setState({graphType: "curveBasis"})
  };
  onTypePress = (value) => {
    this.setState({graphType: value})
  };
  onThemePress = (value) => {
    this.setState({theme: value})
  };



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
      { this.props && this.props.sessions[0] && this.state.graphType==="curveBasis" && this.state.theme==="light" &&
     <StatisticsChart data={cumulativeData} theme={'light'} style={styles.homeGraphStyle}/>
     }

     { this.props && this.props.sessions[0] && this.state.graphType==="curveBasis" && this.state.theme==="dark" &&
    <StatisticsChart data={cumulativeData} theme={'dark'} style={styles.homeGraphStyle}/>
    }


     { this.props && this.props.sessions[0] && this.state.graphType==="curveLinear" &&
    <StatisticsChartLinear data={cumulativeData} theme={'light'} style={styles.homeGraphStyle}/>
    }


    { this.props && this.props.sessions[0] && this.state.graphType==="curveStepBefore" &&
   <StatisticsChartStepBefore data={cumulativeData} style={styles.homeGraphStyle}/>
    }

     { this.props && this.props.sessions[0] && this.state.graphType==="svgLineGraph" &&
    <StatisticsChartLineGraph data={cumulativeData} style={styles.homeGraphStyle}/>
    }
    <View style={{flexDirection: 'column', backgroundColor: '#274272', width: 500, marginTop: 30, alignItems: 'center', justifyContent: 'center', shadowColor: '#ccc',

  shadowOpacity: 1, }}>



    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 60, backgroundColor: '#274272', width: width, padding: 20 }}>




      <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>




        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
        <TouchableOpacity style={styles.graphTypeButton} onPress={this.onCurveBasisPress}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#3B5889', '#3B5889', '#3B5889']} style={styles.linearGradient}>
              <Text style={styles.grapthTypeText}>Modern Curve</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.graphTypeButton} onPress={this.onTypePress.bind(this,'curveLinear')}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FA7E7E', '#FA7E7E', '#FA7E7E']} style={styles.linearGradient}>
              <Text style={styles.grapthTypeText}>Modern Linear</Text>
          </LinearGradient>
        </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
        <TouchableOpacity style={styles.graphTypeButton} onPress={this.onTypePress.bind(this,'curveStepBefore')}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#03ADB0', '#03ADB0', '#03ADB0']} style={styles.linearGradient}>
              <Text style={styles.grapthTypeText}>Modern Step</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.graphTypeButton} onPress={this.onTypePress.bind(this,'svgLineGraph')}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#13223C', '#13223C', '#13223C']} style={styles.linearGradient}>
              <Text style={styles.grapthTypeText}>Traditional</Text>
          </LinearGradient>
        </TouchableOpacity>
        </View>

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
            <Picker.Item label="No axes" value="noAxesCurve" />
          </Picker>

          </View>

      </View>
    );
  };
}

const styles = {
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  homeGraphStyle: {

  },
  sessionsListStyle: {

  },
  categoryHeader: {
    color: '#FCFDFC',
    fontSize: 20,
    fontFamily: Fonts.CabinBold
  },
  graphTypeButton: {
    marginHorizontal: 20,
    marginVertical: 10,
    width: 125,
    height: 60,
    backgroundColor: '#330066',
    borderRadius: 15,
    justifyContent: 'center',
    bottom: 40
  },
  linearGradient: {
   flex: 1,
   paddingLeft: 15,
   paddingRight: 15,
   borderRadius: 10,
   justifyContent: 'center',
   alignItems: 'center'
 },
 grapthTypeText: {
   fontFamily: Fonts.CabinBold,
   fontSize: 18,
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

export default connect(mapStateToProps, { sessionsFetch })(StatisticsGraphPage);
