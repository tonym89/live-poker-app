import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SessionList from './components/SessionList';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="login" component={LoginForm} title="Please Login" initial/>
        <Scene key="sessionList" component={SessionList} title="Sessions" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
