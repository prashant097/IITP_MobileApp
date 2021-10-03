import React, { Component, useState} from 'react';
import { StyleSheet, View, Text, Button, Linking, BackHandler } from 'react-native';
import { plusPrint, app_info, app_Name, dirHome } from "./config";
import AsyncStorage from "@react-native-community/async-storage";
import MapView, {UrlTile, Marker} from 'react-native-maps';
import styles from "./styles/styles";

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
    parsed_location: "",
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
    visible: true,
};


class MapPage extends React.Component {

    static navigationOptions = {
        title: app_Name,
        headerLeft: () => null,
        gestureEnabled: false,
        // headerTintColor: {color: 'green'},
        headerTitleStyle: styles.header_TitleStyle,
        headerStyle: styles.header_TextColor
    };

    constructor(props) {
        super(props);

        let imag = null;
        this.state = initialState;
        // this.state.urlTemplate ="https://bhuvan-ras2.nrsc.gov.in/tilecache/tilecache.py/1.0.0/bhuvan_900913/{z}/{x}/{y}.png";
    }

    handleBackButton = () => {
        Alert.alert(
          'Exit',
          'Do you want to exit the application',
          [
            {
              text: 'Cancel',
              onPress: () => plusPrint('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => BackHandler.exitApp() },
          ]
        );    
    
        return true;   
    };

    getLocation = async () => {
        const location_update = await AsyncStorage.getItem("location_details");
        const value=JSON.parse(location_update);
        console.log("Parsed Value: "+location_update);
        this.setState({ parsed_location: JSON.parse(location_update) });
        plusPrint("loc::in map page" + this.state.parsed_location+"value::"+value.latitude);
        this.setState({latitude:value.latitude});
        this.setState({longitude:value.longitude});
    }

    componentDidMount() {
        // Start counting when the page is loaded\
        this.getLocation();
    }

    render() {
        
        return (
            // <View style={styles.container} >
            //     <Text>React Native Geolocation</Text>
            //     <View
            //         style={{ marginTop: 10, padding: 10, borderRadius: 10, width: '40%' }}>
            //         <Button title="Get Location"
            //         // onPress={this.getLocation()}
            //         />
            //     </View>
            //     <Text>Latitude: {this.state.latitude} </Text>
            //     <Text>Longitude: {this.state.longitude} </Text>
            // </View>

            // <MapView
            // style={{ flex: 1 }}
            // region={region}
            // onRegionChangeComplete={region => setRegion(region)}
            // />

            <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: Number(this.state.latitude),
              longitude: Number(this.state.longitude),
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }} >
             <Marker coordinate={{ latitude: Number(this.state.latitude), longitude: Number(this.state.longitude)}}
              pinColor="red" >
               {/* <CustomMarker />  */}
             </Marker>

            </MapView>  

        );
    };
}

// const CustomMarker = () => (
//     <View
//       style={{
//         paddingVertical: 10,
//         paddingHorizontal: 30,
//         backgroundColor: "#007bff",
//         borderColor: "#eee",
//         borderRadius: 5,
//         elevation: 10
//       }}
//     >
//       <Text style={{ color: "#fff" }}>Berlin</Text>
//     </View>
//   );

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });

export default MapPage;