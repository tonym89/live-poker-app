import React, { Component } from 'react';
import { Picker, Text, TouchableOpacity, StyleSheet, View, Dimensions, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { sessionUpdate, sessionCreate } from '../actions';
import { Card, CardSection, Button, NumericInput, NumericInputSb, Input, FormSectionCard, FormSectionBottomCard } from './common';
import { Fonts } from '../utils/Fonts';
const { width } = Dimensions.get('window');


class SessionCreate extends Component {
  constructor() {
    super();
    this.state = {
      isStartVisible: false,
      isEndVisible: false,
      isModalVisible: false,
      isLimitModalVisible: false,
      chosenDate: '',
      startTime: new Date().getTime(),
      endTime: (new Date().getTime() + 3.6e+6),
    };
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });


      _toggleLimitModal = () =>
        this.setState({ isLimitModalVisible: !this.state.isLimitModalVisible });



  onButtonPress() {
    const { buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit } = this.props;

    this.props.sessionCreate({
      buyin: buyin || 5000,
      cashedout: cashedout || 10000,
      sessionstart: sessionstart || this.state.startTime,
      sessionend: sessionend || this.state.endTime,
      gametype: gametype || 'Hold em',
      time: time || 'Monday',
      bigblind,
      smallblind,
      location,
      limit: limit || 'No Limit',
    });
  }

  startDateHandler = (starttime) => {
    console.log('A start date has been picked: ', starttime);
    const value = starttime.toISOString();
    this.props.sessionUpdate({ prop: 'sessionstart', value });
    this.setState({
        isStartVisible: false,
        startTime: value,
    });
  }

  showPicker = () => {
    this.setState({
        isStartVisible: true
    })
  }

  hidePicker = () => {
    this.setState({
        isStartVisible: false
    })
  }

  handleEndPicker = (endtime) => {
    console.log('An end date has been picked: ', endtime);
    const value = endtime.toISOString();
    this.props.sessionUpdate({ prop: 'sessionend', value });
    this.setState({
        isEndVisible: false,
        endTime: value,
    });
  }

  showEndPicker = () => {
    this.setState({
        isEndVisible: true
    })
  }

  hideEndPicker = () => {
    this.setState({
        isEndVisible: false
    })
  }

  render() {
    console.log(this.props.session);
    const PickerItem = Picker.Item;
    const netResult = this.props.cashedout - this.props.buyin;


    const differenceInMs = new Date(this.state.endTime) - new Date(this.state.startTime);

    function msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
   seconds = Math.floor((duration / 1000) % 60),
   minutes = Math.floor((duration / (1000 * 60)) % 60),
   hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
   days = Math.floor((duration / (1000 * 60 * 60 * 24)) );


           if (days == 0) {
               return hours + ' hours and ' + minutes + ' minutes';
           } else if (days == 0 && hours == 0) {
               return minutes + ' minutes';
           } else {
               return days + ' days ' + hours + ' hours and ' + minutes + ' minutes';
           }

}


    function getFormattedDate(date) {
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ];

       var year = date.getFullYear();

       var month = (1 + date.getMonth()).toString();
       month = month.length > 1 ? month : '0' + month;

       var day = date.getDate().toString();
       day = day.length > 1 ? day : '0' + day;

       var hours = date.getHours().toString();

       var minutes = date.getMinutes().toString();

       var time = date.toTimeString().substr(0,5);

       var monthName = monthNames[date.getMonth()];

       return monthName + ' ' + day + ' ' + year + ' ' + time;
    }

    return (
        <View style={styles.mainViewStyle}>
        <KeyboardAwareScrollView>
      <Card>

      <FormSectionCard>
        <CardSection>
          <Text style={styles.headerText}>Session Time</Text>
        </CardSection>

        <CardSection style={{flexDirection: 'row'}}>

          <TouchableOpacity style={styles.startButton} onPress={this.showPicker}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#03ADB0', '#01CCAD']} style={styles.linearGradient}>
                  <Text style={styles.startText}>Start</Text>
                  <Text style={styles.dateText}>{getFormattedDate(new Date(this.state.startTime))}</Text>
              </LinearGradient>
          </TouchableOpacity>

          <DateTimePicker
             isVisible={this.state.isStartVisible}
             onConfirm={this.startDateHandler}
             onCancel={this.hidePicker}
             mode={'datetime'}
          />


          <TouchableOpacity style={styles.endButton} onPress={this.showEndPicker}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#F4873D', '#EC165A']} style={styles.linearGradient}>
                  <Text style={styles.startText}>Finish</Text>
                  <Text style={styles.dateText}>{getFormattedDate(new Date(this.state.endTime))}</Text>
              </LinearGradient>
          </TouchableOpacity>

          <DateTimePicker
             isVisible={this.state.isEndVisible}
             onConfirm={this.handleEndPicker}
             onCancel={this.hideEndPicker}
             mode={'datetime'}
          />
        </CardSection>

        <CardSection style={{justifyContent: 'center'}}>
          <Text style={styles.timePlayedText}>{msToTime(new Date(differenceInMs))} played</Text>
        </CardSection>


        </FormSectionCard>


        <FormSectionCard>

        <CardSection>
          <Text style={styles.headerText}>Session Results</Text>
        </CardSection>

        <CardSection>
          <NumericInput
            label="Buy In:"
            placeholder="$1000"
            value={this.props.buyin}
            onChangeText={value => this.props.sessionUpdate({ prop: 'buyin', value })}
          />
        </CardSection>

        <CardSection>
          <NumericInput
            label="Cashed out:"
            placeholder="$2000"
            value={this.props.cashedout}
            onChangeText={value => this.props.sessionUpdate({ prop: 'cashedout', value })}
          />
        </CardSection>

        <CardSection style={{justifyContent: 'center'}}>
          <Text style={( netResult>= 0) ? styles.green : styles.red}>{( netResult>= 0) ? '+$' + netResult : '-$' + Math.abs(netResult) }</Text>
        </CardSection>

        </FormSectionCard>

        <FormSectionBottomCard>
          <CardSection>
             <Text style={styles.headerText}>More Details</Text>
          </CardSection>

          <CardSection>
          <NumericInputSb
            label="Blinds:   "
            style={{marginRight: 20}}
            placeholder="5"
            value={this.props.smallblind}
            onChangeText={value => this.props.sessionUpdate({ prop: 'smallblind', value })}
          />
          <NumericInput
            placeholder="10"
            value={this.props.bigblind}
            onChangeText={value => this.props.sessionUpdate({ prop: 'bigblind', value })}
          />

          </CardSection>


          <CardSection>
          <Input
            label="Location:"
            placeholder="Barcelona"
            value={this.props.location}
            onChangeText={value => this.props.sessionUpdate({ prop: 'location', value })}
          />
          </CardSection>


          <CardSection>
                  <TouchableOpacity onPress={this._toggleLimitModal}>
                  <View style={{flexDirection:'row', justifyContent: 'space-between', width: width - 45 }}>
                    <View style={{justifyContent: 'flex-start'}}>
                     <Text style={styles.gameTypeText}>Limit:</Text>
                    </View>
                    <View style={{justifyContent: 'flex-end'}}>
                      <Text style={{
                        fontFamily: Fonts.Cabin,
                         fontSize: 18,
                         paddingLeft: 20,
                         }}
                         >
                       {this.props.limit ? this.props.limit : 'No Limit'}
                       </Text>
                    </View>
                  </View>
                  </TouchableOpacity>


                  <Modal isVisible={this.state.isLimitModalVisible} style={{ flexDirection: 'column', justifyContent: 'flex-end',
                      marginBottom: 100
                   }}>
                   <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: 200,
              height: 200, bottom: 0, justifyContent: 'flex-end',
                  margin: 20, }}>

        <Picker
          selectedValue={this.props.limit}
          onValueChange={value => this.props.sessionUpdate({ prop: 'limit', value })}
          itemStyle={{ color: "#FCFDFC", fontFamily:"Cabin", fontSize:17 }}
        >
          <PickerItem label="No Limit" value='No Limit' />
          <PickerItem label="Pot Limit" value="Pot Limit" />
          <PickerItem label="Fixed Limit" value="Fixed Limit" />
        </Picker>

        <TouchableOpacity onPress={this._toggleLimitModal}>
          <Text style={{ textAlign: 'center', color: '#FCFDFC'}}>Confirm</Text>
        </TouchableOpacity>

                      </View>
                    </View>
                  </Modal>
          </CardSection>


          <CardSection>
                  <TouchableOpacity onPress={this._toggleModal}>
                  <View style={{flexDirection:'row', justifyContent: 'space-between', width: width - 45 }}>
                    <View style={{justifyContent: 'flex-start'}}>
                     <Text style={styles.gameTypeText}>Game Type:</Text>
                    </View>
                    <View style={{justifyContent: 'flex-end'}}>
                      <Text style={{
                        fontFamily: Fonts.Cabin,
                         fontSize: 18,
                         paddingLeft: 20,
                         }}
                         >
                       {this.props.gametype ? this.props.gametype : 'Hold em'}
                       </Text>
                    </View>
                  </View>
                  </TouchableOpacity>



                  <Modal isVisible={this.state.isModalVisible} style={{ flexDirection: 'column', justifyContent: 'flex-end',
                      marginBottom: 100
                   }}>
                   <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: 200,
              height: 200, bottom: 0, justifyContent: 'flex-end',
                  margin: 20, }}>

        <Picker
          selectedValue={this.props.gametype}
          onValueChange={value => this.props.sessionUpdate({ prop: 'gametype', value })}
          itemStyle={{ color: "#FCFDFC", fontFamily:"Cabin", fontSize:17 }}
        >
          <PickerItem label="Hold em" value='Hold em' />
          <PickerItem label="Omaha" value="Omaha" />
          <PickerItem label="Razz" value="Razz" />
        </Picker>

        <TouchableOpacity onPress={this._toggleModal}>
          <Text style={{ textAlign: 'center', color: '#FCFDFC'}}>Confirm</Text>
        </TouchableOpacity>

                      </View>
                    </View>
                  </Modal>
          </CardSection>
          </FormSectionBottomCard>
      </Card>

      <CardSection style={ {alignItems: 'center', justifyContent: 'center', bottom: 0} }>
      <TouchableOpacity style={styles.saveButton} onPress={this.onButtonPress.bind(this)}>
  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2D6BEC', '#1888E5', '#04A6E0']} style={styles.linearGradient}>
      <Text style={styles.saveText}>Save Session</Text>
  </LinearGradient>
</TouchableOpacity>
      </CardSection>

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FDFDFD',
  },
  pickerTextStyle: {
    color: '#FCFDFC',
    fontSize: 18,
    paddingLeft: 20,
  },
  startButton: {
    width: 150,
    height: 70,
    backgroundColor: '#330066',
    borderRadius: 15,
    justifyContent: 'center',
    marginLeft: 10
  },
  endButton: {
    width: 150,
    height: 70,
    backgroundColor: '#330066',
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 5,
    position: 'absolute',
    marginRight: 10,
    right: 0
  },
  saveButton: {
    width: width - 20,
    height: 50,
    backgroundColor: '#330066',
    borderRadius: 15,
    justifyContent: 'center',
    bottom: 0
  },
  startText: {
    fontFamily: Fonts.CabinBold,
    fontSize: 27,
    color: '#FCFDFC',
    textAlign: 'center',
  },
  dateText: {
    fontFamily: Fonts.CabinBold,
    fontSize: 12,
    color: '#FCFDFC',
    textAlign: 'center',
  },
  headerText: {
    fontFamily: Fonts.CabinBold,
    fontSize: 20,
    color: '#13233B',
    textAlign: 'left',
    marginLeft: 2,
    marginBottom: 5
  },
  linearGradient: {
   flex: 1,
   paddingLeft: 15,
   paddingRight: 15,
   borderRadius: 10,
   justifyContent: 'center',
   alignItems: 'center'
 },
 buttonText: {
   fontSize: 18,
   fontFamily: 'Gill Sans',
   textAlign: 'center',
   margin: 10,
   color: '#ffffff',
   backgroundColor: 'transparent',
 },
 timePlayedText: {
   fontFamily: Fonts.Cabin,
   fontSize: 20,
   color: 'black',
   textAlign: 'center',
   marginBottom: 5,
   marginTop: 5
 },
 green: {
   fontSize: 20,
   fontFamily: Fonts.CabinBold,
   color: 'green'
 },
 red: {
   fontSize: 20,
   fontFamily: Fonts.CabinBold,
   color: '#ff0000'
 },
 gameTypeText: {
   fontFamily: Fonts.Cabin,
   fontSize: 20,
   paddingLeft: 20
 },
 saveText: {
   fontFamily: Fonts.CabinBold,
   fontSize: 27,
   color: '#FCFDFC',
   textAlign: 'center',
 },

});

const mapStateToProps = (state) => {
  const { buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit } = state.sessionForm;

  return { buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit };
};

export default connect(mapStateToProps, {
  sessionUpdate, sessionCreate
 })(SessionCreate);
