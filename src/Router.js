import React from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SessionList from './components/SessionList';
import SessionCreate from './components/SessionCreate';
import SessionReport from './components/SessionReport';
import SetLocation from './components/SetLocation';
import SessionEdit from './components/SessionEdit';
import EditLocation from './components/EditLocation';
import { MonoSessionsSvg, SettingsSvg, GraphsSvg } from './components/common';

const SessionsTabIcon = ({ selected, title }) => {
  return (
    <MonoSessionsSvg />
  );
}

const ReportTabIcon = ({ selected }) => {
  return (
    <GraphsSvg />
  );
}

const SettingsTabIcon = ({ selected }) => {
  return (
    <SettingsSvg />
  );
}



const RouterComponent = () => {
  return (

    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
    <Router navigationBarStyle={{ backgroundColor: '#274272', color: '#FCFDFC', }} titleStyle={{color: '#FCFDFC'}} tintColor='#FCFDFC' >
      <Scene key="root" hideNavBar>


        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Please Login" initial />
        </Scene>

        <Scene key="main">

        <Scene
        key="tabbar"
        tabs={true}
        activeTintColor='black'
        hideNavBar
      >
        {/* Tab and it's scenes */}
        <Scene key="Sessions" title="Sessions" icon={SessionsTabIcon}>
          <Scene
          onRight={() => Actions.setLocation()}
          rightTitle="Add"
          key="sessionList"
          component={SessionList}
          title="Sessions"

          initial
          />
        </Scene>


          <Scene key="Statistics" title="Statistics" icon={ReportTabIcon}>
            <Scene
              key="Statistics"
              component={SessionList}
              title="Statistics"
            />
          </Scene>

          <Scene key="Settings" title="Settings" icon={SettingsTabIcon}>
            <Scene
              key="Settings"
              component={SessionList}
              title="Settings"
            />
          </Scene>




          </Scene>
        <Scene key="sessionCreate" component={SessionCreate} title="Add Session" />


            <Scene key="sessionReport" component={SessionReport} title="Session Report" />


        <Scene key="setLocation" component={SetLocation} title="Add Session" />

            <Scene key="editLocation" component={EditLocation} title="Edit Session" />

            <Scene key="sessionEdit" component={SessionEdit} title="Edit Session" />
            </Scene>

      </Scene>
    </Router>
    </View>
  );
};

export default RouterComponent;
