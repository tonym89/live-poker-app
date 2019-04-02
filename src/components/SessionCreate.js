import React, { Component } from 'react';
import { Picker, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { sessionUpdate, sessionCreate } from '../actions';
import { Card, CardSection, Button, NumericInput } from './common';


class SessionCreate extends Component {
  constructor() {
    super();
    this.state = {
      isStartVisible: false,
      isEndVisible: false,
      chosenDate: ''
    };
  }

  onButtonPress() {
    const { buyin, cashedout, time, sessionstart, sessionend } = this.props;

    this.props.sessionCreate({ buyin, cashedout, sessionstart, sessionend, time: time || 'Monday' });
  }

  startDateHandler = (starttime) => {
    console.log('A start date has been picked: ', starttime);
    const value = starttime.toISOString();
    this.props.sessionUpdate({ prop: 'sessionstart', value });
    this.setState({
        isStartVisible: false,
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
    const PickerItem = Picker.Item;

    return (
      <Card>
        <CardSection>
          <TouchableOpacity style={styles.startButton} onPress={this.showPicker}>
              <Text style={styles.startText}>Start</Text>
          </TouchableOpacity>

          <DateTimePicker
             isVisible={this.state.isStartVisible}
             onConfirm={this.startDateHandler}
             onCancel={this.hidePicker}
             mode={'datetime'}
          />
        </CardSection>

        <CardSection>
          <TouchableOpacity style={styles.startButton} onPress={this.showEndPicker}>
              <Text style={styles.startText}>end</Text>
          </TouchableOpacity>

          <DateTimePicker
             isVisible={this.state.isEndVisible}
             onConfirm={this.handleEndPicker}
             onCancel={this.hideEndPicker}
             mode={'datetime'}
          />
        </CardSection>

        <CardSection>
          <NumericInput
            label="Buy In"
            placeholder="$1000"
            value={this.props.buyin}
            onChangeText={value => this.props.sessionUpdate({ prop: 'buyin', value })}
          />
        </CardSection>

        <CardSection>
          <NumericInput
            label="Cashed out"
            placeholder="$2000"
            value={this.props.cashedout}
            onChangeText={value => this.props.sessionUpdate({ prop: 'cashedout', value })}
          />
        </CardSection>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Session
          </Button>
        </CardSection>

      </Card>
    );
  }
}

const styles = StyleSheet.create({
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  },
  startButton: {
    width: 250,
    height: 50,
    backgroundColor: '#330066',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 15
  },
  startText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  }
});

const mapStateToProps = (state) => {
  const { buyin, cashedout, time, sessionstart, sessionend } = state.sessionForm;

  return { buyin, cashedout, time, sessionstart, sessionend };
};

export default connect(mapStateToProps, {
  sessionUpdate, sessionCreate
 })(SessionCreate);
