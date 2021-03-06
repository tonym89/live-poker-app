import React from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SessionList from './components/SessionList';
import SessionCreate from './components/SessionCreate';
import SessionReport from './components/SessionReport';
import SetLocation from './components/SetLocation';
import OnGoingSession from './components/OnGoingSession';
import SessionEdit from './components/SessionEdit';
import EditLocation from './components/EditLocation';
import Statistics from './components/Statistics';
import StatisticsGraphPage from './components/StatisticsGraphPage';
import Settings from './components/Settings';
import About from './components/About';
import SessionType from './components/SessionType';
import Subscription from './components/Subscription';
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
        <Scene key="root" hideNavBar headerLayoutPreset="center">
          <Scene key="auth">
            <Scene key="login" component={LoginForm} title="Poker Dex" initial />
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
                  onRight={() => Actions.sessionType()}
                  rightTitle="Add"
                  key="sessionList"
                  component={SessionList}
                  title="Sessions"
                  initial
                />
              </Scene>
              <Scene key="Statistics" title="Statistics" icon={ReportTabIcon}>
                <Scene
                  onRight={() => Actions.statisticsGraphPage() }
                  rightTitle="Graphs"
                  key="Statistics"
                  component={Statistics}
                  title="Statistics"
                />
              </Scene>
              <Scene key="Settings" title="Settings" icon={SettingsTabIcon}>
                <Scene
                  key="Settings"
                  component={Settings}
                  title="Settings"
                />
              </Scene>
            </Scene>
            <Scene key="sessionCreate" component={SessionCreate} title="Add Session" />
            <Scene key="settings" component={Settings} title="Settings" />
            <Scene key="sessionType" component={SessionType} title="Session Type" />
            <Scene key="Subscription" component={Subscription} title="Subscription" />
            <Scene key="about" component={About} title="About" />
            <Scene key="sessionReport" component={SessionReport} title="Session Report" />
            <Scene key="statisticsGraphPage" component={StatisticsGraphPage} title="Graphs" />
            <Scene key="setLocation" component={SetLocation} title="Add Session" />
            <Scene key="onGoingSession" component={OnGoingSession} title="Record Current Session" />
            <Scene key="editLocation" component={EditLocation} title="Edit Session" />
            <Scene key="sessionEdit" component={SessionEdit} title="Edit Session" />
          </Scene>
        </Scene>
      </Router>
    </View>
  );
};

export default RouterComponent;
