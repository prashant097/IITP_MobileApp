/**
 * @format
 */

import {AppRegistry} from 'react-native';
import HomeScreen from './mainFolder/HomeScreen';
import {name as appName} from './app.json';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => HomeScreen);
