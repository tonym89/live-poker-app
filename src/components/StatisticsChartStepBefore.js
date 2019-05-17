import Svg,{
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';

/* Use this if you are using Expo
import { Svg } from 'expo';
const { Circle, Rect } = Svg;
*/
import LinearGradient2 from 'react-native-linear-gradient';

import React, { Component } from 'react';
import {
 StyleSheet, View, SafeAreaView, Dimensions, Animated, TextInput, Button, Text as TextNormal
} from 'react-native';
import * as path from 'svg-path-properties';
import * as shape from 'd3-shape';

import {
  scaleTime,
  scaleLinear,
  scaleQuantile,
} from 'd3-scale';
import { Fonts } from '../utils/Fonts';

const d3 = {
  shape,
};

const height = 275;
const { width } = Dimensions.get('window');
const graphWidth = width - 30;
const containerWidth = width - 10;
const verticalPadding = 45;
const cursorRadius = 10;
const labelWidth = graphWidth;

function getLabelResult(date, testData){
  let result = ''
    if (date.getTime() >= testData[testData.length-1].x.getTime()){
      result = testData[testData.length-1].y
    }

  for (let i=0; i<testData.length; i+=1)
    if(i < testData.length-1 && date.getTime() < testData[i+1].x.getTime() && date.getTime() >= testData[i].x.getTime()) {
      result = testData[i].y
   }
   return result
  }


function createLabelData(graphData) {
  let labelData = []
  for (let i=0; i<graphData.length; i+=1) {
   labelData.push(graphData[i].y);
  }
  return labelData;
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

   var year = date.getFullYear().toString().substring(2);

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

   return ' ' + day + ' ' + monthName + ' ' + year;
}

export default class StatisticsChartStepBefore extends React.Component {
  constructor(props){
    super();
    this.state={
      data: [],
      x: new Animated.Value(0),
      ready: false,
      curveType: "curveBasis"
    }
  }








  cursor = React.createRef();

  label = React.createRef();

  xdate = React.createRef();





  moveCursor(value) {

      const { data } = this.props;
      const dates = data.map(a => a.x);
      const results = data.map(a => a.y);
      const maxDate=new Date(Math.max.apply(null,dates));
      const minDate=new Date(Math.min.apply(null,dates));
      const yMax = Math.max.apply(null, results);
      const yMin = Math.min.apply(null, results);

    const scaleX = scaleTime().domain([minDate, maxDate]).range([0, graphWidth]);
    const { x, y } = this.properties.getPointAtLength(this.lineLength - value);
    if (this.cursor.current) {
      this.cursor.current.setNativeProps({ top: y - cursorRadius, left: x - cursorRadius });
    }
    if (this.label.current) {
      const label = getLabelResult(scaleX.invert(x), data);
      this.label.current.setNativeProps({ text: `${( label>= 0) ? '$' + label + '   ': '-$' + Math.abs(label) + '   '}` });
    }
    if (this.xdate.current) {
      const datevalue = getTextDate(scaleX.invert(x));
      this.xdate.current.setNativeProps({ text: `${datevalue}` });
    }

    console.log(scaleX.invert(x))
  }

  componentDidMount() {
    this.setState({data: this.props.data });
    console.log(this.state.data);
    const { data } = this.props;

            console.log(data);

    const dates = data.map(a => a.x);
    const results = data.map(a => a.y);
    const maxDate = new Date(Math.max.apply(null,dates));
    const minDate = new Date(Math.min.apply(null,dates));
    const yMax = Math.max.apply(null, results);
    const yMin = Math.min.apply(null, results);


    const scaleX = scaleTime().domain([minDate, maxDate]).range([0, graphWidth]);
    this.scaleY = scaleLinear().domain([yMin, yMax]).range([height - verticalPadding, verticalPadding]);
    this.scaleLabel = scaleQuantile().domain([yMin, yMax]).range(createLabelData(data));
    this.line = d3.shape.line()
      .x(d => scaleX(d.x))
      .y(d => this.scaleY(d.y))
      .curve(d3.shape.curveStepBefore)(data);
    this.properties = path.svgPathProperties(this.line);
    this.lineLength = this.properties.getTotalLength();
    this.setState({ ready: true }, () => {
      this.state.x.addListener(({ value }) => this.moveCursor(value));
      this.moveCursor(0);

        console.log(dates);
    });
  }

  componentWillReceiveProps(nextProps){
        if(nextProps.data !== this.props.data){
            this.setState({data:nextProps.data});
            const { data } = this.props;
              const curveStyle = this.state.curveType;
                    console.log(createLabelData(data));

            const dates = data.map(a => a.x);
            const results = data.map(a => a.y);
            const maxDate=new Date(Math.max.apply(null,dates));
            const minDate=new Date(Math.min.apply(null,dates));
            const yMax = Math.max.apply(null, results);
            const yMin = Math.min.apply(null, results);

            const scaleX = scaleTime().domain([minDate, maxDate]).range([0, graphWidth]);
            this.scaleY = scaleLinear().domain([yMin, yMax]).range([height - verticalPadding, verticalPadding]);
            this.scaleLabel = scaleQuantile().domain([yMin, yMax]).range(createLabelData(data));
            this.line = d3.shape.line()
              .x(d => scaleX(d.x))
              .y(d => this.scaleY(d.y))
              .curve(d3.shape.curveStepBefore)(data);
            this.properties = path.svgPathProperties(this.line);
            this.lineLength = this.properties.getTotalLength();
            this.setState({ ready: true }, () => {
              this.state.x.addListener(({ value }) => this.moveCursor(value));
              this.moveCursor(0);

            });
        }
    }

  render() {
    console.log(this.state.data);
    const { line, lineLength } = this;
    const { ready, x } = this.state;
    if (!ready) {
      return null;
    }
    const translateX = x.interpolate({
      inputRange: [0, lineLength],
      outputRange: [graphWidth - labelWidth, 0],
      extrapolate: 'clamp',
    });

    console.log("Chart rendering")
    return (
      <View style={styles.container}>
      <View style={{flexDirection: 'row' }}>
        <TextNormal style={{color: 'white', marginRight: 3 }}>$</TextNormal>
        <Svg {...{ width: graphWidth, height: 500 }}>



          <Defs>
            <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
              <Stop stopColor="#274272" offset="0%" />
              <Stop stopColor="#274272" offset="80%" />
              <Stop stopColor="#274272" offset="100%" />
            </LinearGradient>
          </Defs>
          <Path d={line} fill="transparent" stroke="#3B5889" strokeWidth={5} />
          <Path d={`${line} L ${graphWidth} ${height} L 0 ${height}`} fill="url(#gradient)" />
          <View ref={this.cursor} style={styles.cursor} />

          <G y={height}>
            {/* bottom axis */}
            <Line
              x1="0"
              y1="0"
              x2={graphWidth}
              y2="0"
              stroke='white'
              strokeWidth="0.5"
            />
            <Text
             x={graphWidth}
             y="20"
             stroke="white"
             fill="white"
             textAnchor="end"
             >
             Date
             </Text>


          </G>

          <G y={height}>
            {/* Vertical axis */}
            <Line
              x1="0"
              y1="0"
              x2="0"
              y2={-height}
              stroke='white'
              strokeWidth="0.5"
            />

          </G>



        </Svg>


        <Animated.View style={[styles.label]}>


            <View style={{flexDirection: 'row', padding: 10}}>
              <View style={{flex:0.5}}>
                <LinearGradient2 start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#03ADB0', '#01CCAD']} style={styles.linearGradient}>
                <TextInput ref={this.label} style={styles.resultText}/>
                <TextInput ref={this.xdate} style={styles.dateText}/>
                </LinearGradient2>
              </View>
              <View style={{flex:0.5}}>
              </View>
            </View>
        </Animated.View>
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{ width: lineLength * 2 }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          horizontal
        />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    marginTop: 20,
    height,
    width: containerWidth,
  },
  cursor: {
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
    borderColor: '#FA7E7E',
    borderWidth: 3,
    backgroundColor: '#FA7E7E',
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 25,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    width: labelWidth,
  },
  bottomhalf: {
    backgroundColor: 'red',
  },
  linearGradient: {
    borderRadius: 5,
    width: 130,
    padding: 5
  },
  resultText: {
    color: '#FCFDFC',
    textAlign: 'center',
    fontSize: 26,
    fontFamily: Fonts.CabinBold
  },
  dateText: {
    color: '#CEFFF8',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Fonts.CabinBold
  }
});
