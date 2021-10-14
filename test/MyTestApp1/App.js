/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useEffect} from 'react';
 import {View,Text, Image, StyleSheet} from 'react-native'
 import SplashScreen from 'react-native-splash-screen';
 
 const App = () =>{
  useEffect(() => {
     SplashScreen.hide();
    }, []);

   return(
    <View style={styles.container}>
      <Image source={require('C:/Users/Kalyandeep/Documents/GitHub/IITP_MobileApp/test/MyTestApp1/android/app/src/images/home.png')}    
      style={{
        width: 150,
        height: 150,
        resizeMode: 'cover'
      }}/>
      <Text> WELCOME </Text>
    </View>
   )
 }
 
 const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center"
   }
  });

 export default App;