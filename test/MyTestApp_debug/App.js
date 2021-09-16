/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
*/

import React, {useEffect} from 'react';
import {View, Text} from 'react-native'
import SplashScreen from 'react-native-splash-screen';
import { NativeModules } from 'react-native';

if (__DEV__) {
   NativeModules.DevSettings.setIsDebuggingRemotely(true)
 }
 
const App = () =>{
  useEffect(() => {
     SplashScreen.hide();
   }, []);

return(
 
 <View>
    <Text> Sample App </Text>
 </View>

 )
 }
 
 export default App;