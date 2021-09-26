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
};


class MapPage extends React.Component {

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

    const urlTemplate = urlTemplate ="https://bhuvan-ras2.nrsc.gov.in/tilecache/tilecache.py/1.0.0/bhuvan_900913/{z}/{x}/{y}.png";

    // const [region, setRegion] = useState({
    //     latitude: 51.5079145,
    //     longitude: -0.0899163,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01
    // });
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
              latitude: 17.40678,
              longitude: 78.55045,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }} >
             <Marker coordinate={{ latitude: 17.40678, longitude: 78.55045 }}
              pinColor="red" >
               {/* <CustomMarker />  */}
             </Marker>

             <UrlTile
                /**
                * The url template of the tile server. The patterns {x} {y} {z} will be replaced at runtime
                * For example, http://c.tile.openstreetmap.org/{z}/{x}/{y}.png
                */
                urlTemplate={this.state.urlTemplate}
                /**
                 * The maximum zoom level for this tile overlay. Corresponds to the maximumZ setting in
                 * MKTileOverlay. iOS only.
                 */
                maximumZ={19}
                /**
                 * flipY allows tiles with inverted y coordinates (origin at bottom left of map)
                 * to be used. Its default value is false.
                 */
                flipY={false}
             />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MapPage;