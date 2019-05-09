import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SessionList from './components/SessionList';
import SessionCreate from './components/SessionCreate';
import SessionReport from './components/SessionReport';
import SetLocation from './components/SetLocation';
import SessionEdit from './components/SessionEdit';
import EditLocation from './components/EditLocation';


const RouterComponent = () => {
  return (
    <Router navigationBarStyle={{ backgroundColor: '#274272', color: '#FCFDFC', }} titleStyle={{color: '#FCFDFC'}} tintColor='#FCFDFC' >
      <Scene key="root" hideNavBar>

        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Please Login" initial />
        </Scene>

        <Scene key="main">
          <Scene
          onRight={() => Actions.setLocation()}
          rightTitle="Add"
          key="sessionList"
          component={SessionList}
          title="Sessions"
          initial
          />
        <Scene key="sessionCreate" component={SessionCreate} title="Add Session" />

        <Scene key="sessionReport" component={SessionReport} title="Session Report"/>

        <Scene key="setLocation" component={SetLocation} title="Add Session" />

        <Scene key="editLocation" component={EditLocation} title="Edit Session" />

        <Scene key="sessionEdit" component={SessionEdit} title="Edit Session" />
        </Scene>



      </Scene>
    </Router>
  );
};

export default RouterComponent;
