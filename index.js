/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import 'es6-symbol/implement'
import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';



AppRegistry.registerComponent('PokerDex', () => App);
