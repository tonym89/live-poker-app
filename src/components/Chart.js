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
 StyleSheet, View, SafeAreaView, Dimensions, Animated, TextInput,
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

const height = 200;
const { width } = Dimensions.get('window');
const verticalPadding = 5;
const cursorRadius = 10;
const labelWidth = 400;



function getFormattedDate(date) {
 var year = date.getFullYear();

 var month = (1 + date.getMonth()).toString();
 month = month.length > 1 ? month : '0' + month;

 var day = date.getDate().toString();
 day = day.length > 1 ? day : '0' + day;

 return month + '/' + day + '/' + year;
}

export default class Chart extends React.Component {
  constructor(props){
    super();
    this.state={
      data: [],
      x: new Animated.Value(0),
      ready: false,
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

    const scaleX = scaleTime().domain([minDate, maxDate]).range([0, width]);
    const { x, y } = this.properties.getPointAtLength(this.lineLength - value);
    if (this.cursor.current) {
      this.cursor.current.setNativeProps({ top: y - cursorRadius, left: x - cursorRadius });
    }
    if (this.label.current) {
      const label = this.scaleLabel(this.scaleY.invert(y));
      this.label.current.setNativeProps({ text: `$${label}` });
    }
    if (this.xdate.current) {
      const datevalue = getFormattedDate(scaleX.invert(x));
      this.xdate.current.setNativeProps({ text: `${datevalue}` });
    }
  }

  componentDidMount() {
    this.setState({data: this.props.data });
    console.log(this.state.data);
    const { data } = this.props;

            console.log(data);

    const dates = data.map(a => a.x);
    const results = data.map(a => a.y);
    const maxDate=new Date(Math.max.apply(null,dates));
    const minDate=new Date(Math.min.apply(null,dates));
    const yMax = Math.max.apply(null, results);
    const yMin = Math.min.apply(null, results);

    const scaleX = scaleTime().domain([minDate, maxDate]).range([0, width]);
    this.scaleY = scaleLinear().domain([yMin, yMax]).range([height - verticalPadding, verticalPadding]);
    this.scaleLabel = scaleQuantile().domain([yMin, yMax]).range([-100, 0, 200, 300]);
    this.line = d3.shape.line()
      .x(d => scaleX(d.x))
      .y(d => this.scaleY(d.y))
      .curve(d3.shape.curveBasis)(data);
    this.properties = path.svgPathProperties(this.line);
    this.lineLength = this.properties.getTotalLength();
    this.setState({ ready: true }, () => {
      this.state.x.addListener(({ value }) => this.moveCursor(value));
      this.moveCursor(0);

        console.log("component mounted");
    });
  }

  componentWillReceiveProps(nextProps){
        if(nextProps.data !== this.props.data){
            this.setState({data:nextProps.data});
            const { data } = this.props;

                    console.log(data);

            const dates = data.map(a => a.x);
            const results = data.map(a => a.y);
            const maxDate=new Date(Math.max.apply(null,dates));
            const minDate=new Date(Math.min.apply(null,dates));
            const yMax = Math.max.apply(null, results);
            const yMin = Math.min.apply(null, results);

            const scaleX = scaleTime().domain([minDate, maxDate]).range([0, width]);
            this.scaleY = scaleLinear().domain([yMin, yMax]).range([height - verticalPadding, verticalPadding]);
            this.scaleLabel = scaleQuantile().domain([yMin, yMax]).range([-100, 0, 200, 300]);
            this.line = d3.shape.line()
              .x(d => scaleX(d.x))
              .y(d => this.scaleY(d.y))
              .curve(d3.shape.curveBasis)(data);
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
      outputRange: [width - labelWidth, 0],
      extrapolate: 'clamp',
    });

    console.log("Chart rendering")
    return (
      <View style={styles.container}>
        <Svg {...{ width, height }}>
          <Defs>
            <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
              <Stop stopColor="#CDE3F8" offset="0%" />
              <Stop stopColor="#eef6fd" offset="80%" />
              <Stop stopColor="#FEFFFF" offset="100%" />
            </LinearGradient>
          </Defs>
          <Path d={line} fill="transparent" stroke="#367be2" strokeWidth={5} />
          <Path d={`${line} L ${width} ${height} L 0 ${height}`} fill="url(#gradient)" />
          <View ref={this.cursor} style={styles.cursor} />
        </Svg>
        <Animated.View style={[styles.label]}>

          <LinearGradient2 start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#03ADB0', '#01CCAD']} style={styles.linearGradient}>
            <TextInput ref={this.label} style={styles.labelText}/>
            <TextInput ref={this.xdate} style={styles.labelText}/>
          </LinearGradient2>
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
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    marginTop: 60,
    height,
    width,
  },
  cursor: {
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
    borderColor: '#367be2',
    borderWidth: 3,
    backgroundColor: 'white',
  },
  label: {
    position: 'absolute',
    top: -60,
    left: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    width: labelWidth,
  },
  bottomhalf: {
    backgroundColor: 'red',
  },
  linearGradient: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  labelText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: Fonts.CabinBold
  }
});
