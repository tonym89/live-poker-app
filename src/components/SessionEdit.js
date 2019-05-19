import React, { Component } from 'react';
import { Picker, Text, TouchableOpacity, StyleSheet, View, Dimensions, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { sessionUpdate, sessionCreate, sessionSave } from '../actions';
import { Card, CardSection, Button, NumericInput, NumericInputSb, Input, FormSectionCard, FormSectionBottomCard, ProfitsSvgLarge, ChipsSvgLarge } from './common';
import { Fonts } from '../utils/Fonts';

const { height, width } = Dimensions.get('window');
const detailsHeight = height / 4


class SessionEdit extends Component {
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
    if (this.props.buyin === '') {
      Alert.alert(
        'Please enter valid buy in value',
    );
  } else if (this.props.cashedout === '') {
      Alert.alert(
        'Please enter valid cashed out value',
        );
    } else if (this.props.bigblind === '' || this.props.smallblind === '') {
        Alert.alert(
          'Please enter valid blind values',
          );
    } else {
    const { buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit, venue, venueDetails, sessionBegin, sessionEnd } = this.props;

    console.log(venue);
    console.log('hello');

    this.props.sessionSave({
      buyin: buyin || 0,
      cashedout: cashedout || 0,
      sessionstart: sessionstart,
      sessionend: sessionend,
      gametype: gametype || 'Hold em',
      time: time || 'Monday',
      bigblind,
      smallblind,
      location,
      limit: limit || 'No Limit',
      venue,
      venueDetails,
      uid: this.props.session.uid
    });
    }
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
    console.log(this.props)
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
      <KeyboardAwareScrollView keyBoardPersistsTaps='always' style={{flex: 0.9, backgroundColor: '#FDFDFD', }}>

      <View style={styles.detailsCard}>

      <View style={styles.venueBoxStyle}>
        <Text style={styles.dateStyle}>Results  </Text>
        <ProfitsSvgLarge />


      </View>

      <View style={styles.detailsBoxStyle}>
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>


      <CardSection>
        <NumericInput

          label="Buy in:"
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

      <CardSection style={{justifyContent: 'center', marginTop: 20}}>
        <Text style={( netResult>= 0) ? styles.green : styles.red}>{( netResult>= 0) ? '+$' + netResult : '-$' + Math.abs(netResult) }</Text>
      </CardSection>


      </View>

      </View>
      </View>

      <View style={styles.detailsCard}>

      <View style={styles.venueBoxStyle}>
        <Text style={styles.dateStyle}>Game Details  </Text>
        <ChipsSvgLarge />


      </View>

      <View style={styles.detailsBoxStyle}>
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>


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
                     marginRight: 10
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
        <PickerItem label="Hold em" value='Hold em' />
        <PickerItem label="Omaha" value="Omaha" />
        <PickerItem label="Omaha Hi/Lo" value="Omaha Hi/Lo" />
        <PickerItem label="Stud" value="Stud" />
        <PickerItem label="2-7 Triple Draw" value="2-7 Triple Draw" />
        <PickerItem label="Razz" value="Razz" />
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
                     marginRight: 10
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
        <PickerItem label="Omaha Hi/Lo" value="Omaha Hi/Lo" />
        <PickerItem label="Stud" value="Stud" />
        <PickerItem label="2-7 Triple Draw" value="2-7 Triple Draw" />
        <PickerItem label="Razz" value="Razz" />
    </Picker>

    <TouchableOpacity onPress={this._toggleModal}>
      <Text style={{ textAlign: 'center', color: '#FCFDFC'}}>Confirm</Text>
    </TouchableOpacity>

                  </View>
                </View>
              </Modal>
      </CardSection>





      </View>

      </View>
      </View>



            </KeyboardAwareScrollView>

    <CardSection style={ {flex: 0.1, alignItems: 'center', justifyContent: 'center', bottom: 0, backgroundColor: '#FDFDFD' } }>
      <TouchableOpacity style={styles.saveButton} onPress={this.onButtonPress.bind(this)}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2D6BEC', '#1888E5', '#04A6E0']} style={styles.linearGradient}>
            <Text style={styles.saveText}>Save Session</Text>
        </LinearGradient>
      </TouchableOpacity>
    </CardSection>

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
    bottom: 40
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
    fontSize: 30,
    color: '#13233B',
    textAlign: 'center',
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
 venueBoxStyle: {
   flexDirection: 'row',
   height: 40,
   fontFamily: Fonts.Cabin,
   fontSize: 20,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#3B5889',
   borderWidth: 0.2,
   borderColor: 'grey',
   shadowOpacity: 0,
   borderTopLeftRadius: 5,
   borderTopRightRadius: 5,
 },
 detailsBoxStyle: {
   paddingVertical: 20,
   fontFamily: Fonts.Cabin,
   fontSize: 20,
   backgroundColor: 'white',
   borderWidth: 0.2,
   borderColor: 'grey',
   shadowOpacity: 0,
   borderBottomLeftRadius: 5,
   borderBottomRightRadius: 5,
   height: detailsHeight
 },
 detailsCard: {
   margin: 10,
   marginTop: 20,
   borderWidth: 0.2,
   borderRadius: 5,
   shadowColor: '#ccc',
   shadowOpacity: 1,
   shadowRadius: 5,
 },
 dateStyle: {
     fontSize: 20,
     color: '#FCFDFC'
 },

});

const mapStateToProps = (state) => {
  const { buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit } = state.sessionForm;

  return { buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit };
};

export default connect(mapStateToProps, {
  sessionUpdate, sessionSave
})(SessionEdit);
