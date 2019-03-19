import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { sessionUpdate, sessionCreate } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class SessionCreate extends Component {

  onButtonPress() {
    const { buyin, cashedout, time } = this.props;

    this.props.sessionCreate({ buyin, cashedout, time: time || 'Monday' });
  }

  render() {
    const PickerItem = Picker.Item;

    return (
      <Card>
        <CardSection>
          <Input
            label="Buy In"
            placeholder="$1000"
            value={this.props.buyin}
            onChangeText={value => this.props.sessionUpdate({ prop: 'buyin', value })}
          />
        </CardSection>

        <CardSection>
          <Input
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

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = (state) => {
  const { buyin, cashedout, time } = state.sessionForm;

  return { buyin, cashedout, time };
};

export default connect(mapStateToProps, {
  sessionUpdate, sessionCreate
 })(SessionCreate);
