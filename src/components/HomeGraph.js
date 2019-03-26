/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
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
 import React from 'react';
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

 const d3 = {
   shape,
 };

 const height = 200;
 const { width } = Dimensions.get('window');
 const verticalPadding = 5;
 const cursorRadius = 10;
 const labelWidth = 75;

 const data = [
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

 const scaleX = scaleTime().domain([new Date(2018, 9, 1), new Date(2018, 10, 17)]).range([0, width]);
 const scaleY = scaleLinear().domain([-100, 300]).range([height - verticalPadding, verticalPadding]);
 const scaleLabel = scaleQuantile().domain([-100, 300]).range([-100, 0, 200, 300]);
 const line = d3.shape.line()
   .x(d => scaleX(d.x))
   .y(d => scaleY(d.y))
   .curve(d3.shape.curveBasis)(data);
 const properties = path.svgPathProperties(line);
 const lineLength = properties.getTotalLength();

 function getFormattedDate(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return month + '/' + day + '/' + year;
}


class HomeGraph extends React.Component {
   cursor = React.createRef();

   label = React.createRef();
   xdate = React.createRef();

   state = {
     x: new Animated.Value(0),
   };

   moveCursor(value) {
     const { x, y } = properties.getPointAtLength(lineLength - value);
     this.cursor.current.setNativeProps({ top: y - cursorRadius, left: x - cursorRadius });
     const label = scaleLabel(scaleY.invert(y));
     const datevalue = getFormattedDate(scaleX.invert(x));
     this.label.current.setNativeProps({ text: `$${label}USD`});
     this.xdate.current.setNativeProps({ text: `${datevalue}`});
   }

   componentDidMount() {
     this.state.x.addListener(({ value }) => this.moveCursor(value));
     this.moveCursor(0);
   }

   render() {
     const { x } = this.state;
     const translateX = x.interpolate({
       inputRange: [0, lineLength],
       outputRange: [width - labelWidth, 0],
       extrapolate: 'clamp',
     });
     return (
       <SafeAreaView style={styles.root}>



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
           <Animated.View style={[styles.label, { transform: [{ translateX }] }]}>
             <TextInput ref={this.label} />
             <TextInput ref={this.xdate}/>
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
           <View style={styles.bottomhalf}>
             <Text style={styles.bottomhalf}>
             Hello
             { data.keys }
             </Text>
           </View>
         </View>
       </SafeAreaView>
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
     top: -65,
     left: 0,
     backgroundColor: '#CDE3F8',
     width: labelWidth,
   },
   bottomhalf: {
     backgroundColor: 'red',
   }
 });

 export default HomeGraph;
