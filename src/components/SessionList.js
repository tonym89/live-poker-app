import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text } from 'react-native';
import { sessionsFetch } from '../actions';
import ListItem from './ListItem';
import HomeGraph from './HomeGraph';

class SessionList extends Component {
  componentDidMount() {
    this.props.sessionsFetch();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.sessions.length !== this.props.sessions.length) {
      this.props.sessionsFetch();
    }
  }


  render() {
    return (
      <View style={styles.mainViewStyle}>
        <HomeGraph/>
        <FlatList data={this.props.sessions} renderItem={({item}) => <ListItem session={item}/>}/>
      </View>
    );
  };
}

const styles = {
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  }
}

const mapStateToProps = state => {
  const sessions = _.map(state.sessions, (val, uid) => {
    return { ...val, uid }
  });
  return { sessions };
}

export default connect(mapStateToProps, { sessionsFetch })(SessionList);
