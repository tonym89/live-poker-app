import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import { sessionsFetch } from '../actions';

class SessionList extends Component {
  componentWillMount() {
    this.props.sessionsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ sessions }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(sessions);
  }

  render() {
    console.log(this.props);

    return (
      <View>
        <Text>Session list</Text>
        <Text>Session list</Text>
        <Text>Session list</Text>
        <Text>Session list</Text>
        <Text>Session list</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const sessions = _.map(state.sessions, (val, uid) => {
    return { ...val, uid };
  });

  return { sessions };
};

export default connect(mapStateToProps, { sessionsFetch })(SessionList);
