import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import moment from "moment";
import * as scale from 'd3-scale'
import dateFns from 'date-fns'


const { width } = Dimensions.get('window');
const graphWidth = width - 25;

export default class StatisticsChartLineGraph extends React.PureComponent {

    render() {

      const data = this.props.data


      const dates = data.map(a => a.x);
      const results = data.map(a => a.y);

      console.log(dates)

     const contentInset = { top: 20, bottom: 20 }
        return (
          <View style={{ flexDirection: 'column' }}>
          <View style={{ height: 275, width: graphWidth, flexDirection: 'row' }}>

               <YAxis
                   data={ results }
                   contentInset={ contentInset }
                   svg={{
                       fill: '#FCFDFC',
                       fontSize: 10,
                   }}
                   numberOfTicks={ 5 }
                   formatLabel={ value => `$${value}` }
               />
               <LineChart
                   style={{ flex: 1, marginLeft: 16 }}
                   data={ data }

                    yAccessor={ ({ item }) => item.y }
                    xAccessor={ ({ item }) => item.x }
                   xScale={ scale.scaleTime }
                   svg={{ stroke: '#03ADB0' }}
                   contentInset={ contentInset }
               >
                   <Grid/>
               </LineChart>

           </View>
           <View>
           <XAxis
              data={ data }
              svg={{
                  fill: '#FCFDFC',
                  fontSize: 10,
                  rotation: 20,
                  originY: 30,
                  y: 5,
              }}
              xAccessor={ ({ item }) => item.x }
              scale={ scale.scaleTime }
              numberOfTicks={ 3 }
              style={{ marginHorizontal: -15, height: 20 }}
              contentInset={{ left: 50, right: 25 }}
              formatLabel={ (value) => dateFns.format(value, 'DD MMM') }
          />
        </View>

        </View>
        )
    }

}
