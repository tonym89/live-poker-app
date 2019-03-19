import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SessionList from './components/SessionList';
import SessionCreate from './components/SessionCreate';


const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>

        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Please Login" initial />
        </Scene>

        <Scene key="main">
          <Scene
          onRight={() => Actions.sessionCreate()}
          rightTitle="Add"
          key="sessionList"
          component={SessionList}
          title="Sessions"
          initial
          />
        <Scene key="sessionCreate" component={SessionCreate} title="Create Session" />
        </Scene>

      </Scene>
    </Router>
  );
};

export default RouterComponent;