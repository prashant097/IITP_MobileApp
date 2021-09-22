import React from "react";
import { View, PermissionsAndroid, Alert, Text, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";

import { LogBox } from 'react-native';
import { plusPrint, app_info, app_Name, dirHome} from "./config";


LogBox.ignoreAllLogs();
export async function GetAllPermissions() {
  try {
    if (Platform.OS === "android") {
      const userResponse = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ]);
      return userResponse;
    }
  } catch (err) {
    plusPrint(err);
  }
  return null;
}


async componentDidMount() {
   // Start counting when the page is loaded
   GetAllPermissions();
  }


render() {
	  
    return (
      <View>
        <Image source={require('C:/sw/App/genApp/src/images/splash.jpg')}
         style={styles.splashcontainer}
        />
        //<RemotePushController/>
       </View >
    );
}