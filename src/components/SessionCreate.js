import React, { Component } from 'react';
import { Picker, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { sessionUpdate, sessionCreate } from '../actions';
import { Card, CardSection, Button, NumericInput } from './common';


class SessionCreate extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      chosenDate: ''
    };
  }

  onButtonPress() {
    const { buyin, cashedout, time, sessionstart } = this.props;

    this.props.sessionCreate({ buyin, cashedout, sessionstart, time: time || 'Monday' });
  }

  handlePicker = (datetime) => {
    const value = datetime.toISOString();
    this.props.sessionUpdate({ prop: 'sessionstart', value });
    this.setState({
        isVisible: false,
    });
  }

  showPicker = () => {
    this.setState({
        isVisible: true
    })
  }

  hidePicker = () => {
    this.setState({
        isVisible: false
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
             isVisible={this.state.isVisible}
             onConfirm={this.handlePicker}
             onCancel={this.hidePicker}
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

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle}>Day of the week</Text>
          <Picker
            selectedValue={this.props.time}
            onValueChange={value => this.props.sessionUpdate({ prop: 'time', value })}
          >
            <PickerItem label="Monday" value="Monday" />
            <PickerItem label="Tuesday" value="Tuesday" />
            <PickerItem label="Wednesday" value="Wednesday" />
            <PickerItem label="Thursday" value="Thursday" />
            <PickerItem label="Friday" value="Friday" />
            <PickerItem label="Saturday" value="Saturday" />
            <PickerItem label="Sunday" value="Sunday" />
          </Picker>
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
  const { buyin, cashedout, time, sessionstart } = state.sessionForm;

  return { buyin, cashedout, time, sessionstart };
};

export default connect(mapStateToProps, {
  sessionUpdate, sessionCreate
 })(SessionCreate);
