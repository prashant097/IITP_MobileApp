import React from "react";
import { View, Image, PermissionsAndroid, Alert, Text, ActivityIndicator } from "react-native";

import Geolocation from '@react-native-community/geolocation';
import { LogBox } from 'react-native';
import styles from "./styles/styles";

import { plusPrint, app_info, app_Name, dirHome } from "./config";
import AsyncStorage from "@react-native-community/async-storage";

LogBox.ignoreAllLogs();

const initialState = {
    data: "",
    userData: [], loading: false,

    appname: "",
    captured_form_data: "",
    initialPosition: "unknown",
    latitude: "",
    longitude: "",
    accuracy: "",
    mapState: "",
    assetPosition: null,
    lastPosition: "unknown",
    photo1_loc: "unknown",
    photo2_loc: "unknown",
    visible: true,
    formData: [],
    username: null,
    usermobile: null,
    // ImageSource1: null,
    // ImageSource2: null,
    // image1_data: null,
    // image2_data: null,
    footer_text: "",
    visible: true
};

export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);

        let imag = null;
        this.state = initialState;

    }
    async GetAllPermissions() {
        try {
            if (Platform.OS === "android") {
                const userResponse = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                ]).then((result) => {

                    if (result['android.permission.ACCESS_FINE_LOCATION']
                        && result['android.permission.CAMERA']
                        && result['android.permission.ACCESS_FINE_LOCATION']
                        && result['android.permission.ACCESS_COARSE_LOCATION']

                        && result['android.permission.READ_EXTERNAL_STORAGE']
                        && result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {

                        plusPrint("peermission grnated");
                        this.geoCapture();
                    } else if (result['android.permission.ACCESS_FINE_LOCATION']
                        || result['android.permission.CAMERA']
                        || result['android.permission.ACCESS_COARSE_LOCATION']
                        || result['android.permission.READ_EXTERNAL_STORAGE']
                        || result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'never_ask_again') {
                        plusPrint("peermission else grnated");

                       alert('Please Go into Settings -> Applications -> APP_NAME -> Permissions and Allow permissions to continue');
                        // this.toastRef.current.show('Please Go into Settings -> Applications -> APP_NAME -> Permissions and Allow permissions to continue');
                    }
                });
                return userResponse;


            }
        } catch (err) {
            plusPrint(err);
        }
        return null;
    }


    async componentDidMount() {
        // Start counting when the page is loaded
        this.GetAllPermissions();
    }
    geoCapture() {

        console.log("curent loca press::");
        const config = {
            skipPermissionRequests: true,
            authorizationLevel: 'auto'
        };
        Geolocation.setRNConfiguration(config);
        console.log("CheckPoint1");
        Geolocation.getCurrentPosition(info => console.log("infoooo::" + info));
        let mockloc = false;

        Geolocation.getCurrentPosition(
            position => {
                const assetPosition = JSON.stringify(position);
                // alert(assetPosition);
                // console.log("loocc::" + assetPosition);
                console.log("loocc::mocked" + position.mocked);
                mockloc = position.mocked;
                if (!mockloc) {
                    // const assetPosition =
                    //   "Latitude : " +
                    //   position.coords.latitude +
                    //   " , " +
                    //   "Longitude : " +
                    //   position.coords.longitude +
                    //   " , " +
                    //   "Accuracy : " +
                    //   position.coords.accuracy;
                    // " , " +
                    //   "Timestamp : " +
                    //   position.timestamp;
                    let accuracy = position.coords.accuracy;

                    if (accuracy < 1000) {
                        this.setState({ assetPosition });

                        let latitude = parseFloat(position.coords.latitude.toFixed(5));
                        let longitude = parseFloat(position.coords.longitude.toFixed(5));
                        var date = new Date(parseInt(position.timestamp, 10));
                        var ds = date.toString('dd-MM-yyyy HH:mm:ss');
                        const dateee = date.toLocaleDateString() + " " + date.toLocaleTimeString()

                        console.log("valuee::" + ds + "dddd::" + dateee);

                        let location_details = {
                            latitude: latitude ,
                            longitude: longitude ,
                            accuracy: accuracy ,
                            timestamp: dateee 
                        };
                        plusPrint("get item: loc:" + JSON.stringify(location_details));

                        AsyncStorage.setItem("location_details", JSON.stringify(location_details));
                        plusPrint("get item::" + AsyncStorage.getItem("location_details"));
                        // const check_string =  JSON.parse(AsyncStorage.getItem("location_details"));
                        // console.log("Sent_item :: "+check_string);   
                        // this.props.navigation.navigate("MapPage");
                        // this.props.navigation.navigate("MapPage2");
                        this.props.navigation.navigate("RTT");

                        // location_value = 
                        //   <View styles = {styles.p_container}>
                        //     <Text style = {styles.profile_Container}>Latitude : {latitude} </Text>
                        //     <Text style = {styles.profile_Container}>Longitude : {longitude} </Text>
                        //     <Text style = {styles.profile_Container}>Accuracy : {accuracy} </Text>

                        //   </View>
                    } else {
                        alert("Your accuracy is greather than 10m. Current Accuracy is : " + accuracy);
                    }
                }

                else {
                    alert("Mock Location is not allowed in this application. Kindly capture true location")
                }
            },
            error =>
                // console.log("Error", JSON.stringify(error.message)),
                alert(JSON.stringify(error.message)),

            { enableHighAccuracy: true, timeout: 10000 }
        );
        //  this.setState({ assetPosition: this.state.lastPosition });

    };


    render() {
        const { navigate } = this.props.navigation;

        return (
            <View>
                <Image source={require('C:/Users/Kalyandeep/Documents/GitHub/IITP_MobileApp/test/MyTestApp2/src/images/splash.jpg')}
                    style={styles.splashcontainer}
                />
            </View >
        );
    }
}
