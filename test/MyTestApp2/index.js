/**
 * @format
 */

import {AppRegistry} from 'react-native';
import HomeScreen from './mainFolder/HomeScreen';
import App from './mainFolder/App';

import {name as appName} from './app.json';
import { LogBox } from 'react-native';
import MapPage from './mainFolder/MapPage';

LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
