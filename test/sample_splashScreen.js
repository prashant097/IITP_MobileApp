import React from "react";
import { View, PermissionsAndroid, Alert, Text, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";

import { LogBox } from 'react-native';
import { plusPrint, app_info, app_Name, dirHome, versionCheck_url } from "./config";


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

export default class App extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
		  loading: false, progress: 0
		};
	}
	
    _setValue = async () => {
    this.setState({ loading: false })

    try {
      let user = await AsyncStorage.getItem("userdetails");
      console.log("userinfo::from splash:" + user);
      if (user != null && user != "") {
        let parsed = JSON.parse(user);
        // alert(parsed.userdetailscaptured);
        if (parsed.userdetailscaptured=true) {
          // console.log("parsed::"+parsed.userdetailscaptured);
          this.props.navigation.navigate("MainActivity");

          // this.setState({ component: <MainActivity /> });
        } else {
          // console.log("parsed else::"+parsed.userdetailscaptured);

          this.props.navigation.navigate("LoginPage");

          // this.setState({ component: <LoginPage /> });
        }
      } else {
        this.props.navigation.navigate("LoginPage");

        // this.setState({ component: <LoginPage /> });
      }
    } catch (error) { // log the error
    }
  };

async componentDidMount() {
   // Start counting when the page is loaded
   GetAllPermissions();
   RNFS.mkdir(dirHome)
      .then(() => {

        plusPrint("Folder created ");
        // resolve(true);
        })
      .catch(err => {
        plusPrint("mkdir error", err);
        reject(err);
        });
      
    this.timeoutHandle = setTimeout(() => {
      this.versionCheck();

      // Add your logic for the transition
      // this.setState({ component: <HomeScreen /> });
    }, 5000);

  }


render() {
	  
    return (
      <View>
        <Image source={require('C:/sw/App/genApp/src/images/splash.jpg')}
         style={styles.splashcontainer}
        />
        <RemotePushController/>
       </View >
    );
}