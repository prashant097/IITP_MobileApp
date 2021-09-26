import React, { Component, useState} from 'react';
import { StyleSheet, View, Text, Button, Linking } from 'react-native';
import { plusPrint, app_info, app_Name, dirHome } from "./config";
import AsyncStorage from "@react-native-community/async-storage";
// import { renderNode } from 'react-native-elements/dist/helpers';
import MapView, {UrlTile, Marker} from 'react-native-maps';
// import WebViewLeaflet from 'react-native-webview-leaflet';

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

    region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
};


class MapPage1 extends React.Component {

    constructor(props) {
        super(props);

        let imag = null;
        this.state = initialState;
    }

    getLocation = async () => {
        const location_update = await AsyncStorage.getItem("location_details");
        const value=JSON.parse(location_update);
        console.log("Parsed Value: "+location_update);
        this.setState({ parsed_location: JSON.parse(location_update) });
        plusPrint("loc::in map page" + this.state.parsed_location+"value::"+value.latitude);
        this.setState({latitude:value.latitude});
        this.setState({longitude:value.longitude});
    }

    // getInitialState() {
    //     return {
    //       region: {
    //         latitude: 37.78825,
    //         longitude: -122.4324,
    //         latitudeDelta: 0.0922,
    //         longitudeDelta: 0.0421,
    //       },
    //     };
    // }

    onRegionChange(region) {
        this.setState({ region });
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

            <MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange}
          />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MapPage1;