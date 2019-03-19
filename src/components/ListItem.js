import React, { Component } from 'react';
import { Text } from 'react-native';
import { CardSection } from './common';

class ListItem extends Component {
  render() {
    const { time } = this.props.session;
    const { cashedout } = this.props.session;
    const { buyin } = this.props.session;

    return (
      <CardSection>
        <Text style={styles.titleStyle}> {time} result: {cashedout - buyin}</Text>
      </CardSection>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default ListItem;
