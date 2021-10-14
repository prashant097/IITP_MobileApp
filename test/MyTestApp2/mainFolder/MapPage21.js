import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Dimensions } from 'react-native';
// import { Button, Container, Header, Left, Right, Icon, Text, Radio } from 'native-base';
import { plusPrint, app_info, app_Name, dirHome } from "./config";
import MapView, { MAP_TYPES, PROVIDER_DEFAULT, UrlTile, Marker } from 'react-native-maps';
import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";
// import styles from "./styles/styles";

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
    // id: Number,
};

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 22.720555;
const LONGITUDE = 75.858633;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 1;

export default class MapPage21 extends React.Component {
    static navigationOptions = {
        drawerLabel: 'OpenStreetMap'


    };
    constructor(props) {
        super(props);
        // this.CustomMarker = this.CustomMarker.bind(this);
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            initialState,
            markers: {
                coordinate: {
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                },
                key: id,
                // color: randomColor(),
            },
        };
    }
    whatshere = async () => {

        let lati = LATITUDE;
        let longi = LONGITUDE;
        plusPrint("value:: lati - " + lati + ", longi - " + longi);

        let config_obj = {
            lat: lati,
            lng: longi,
            Licence_key: "26d8w76awmxtio5g368s4t3og82xhapu*",

        };

        const whatshere_URL = "https://apis.mapmyindia.com/advancedmaps/v1/Licence_key/rev_geocode?lat=lati&lng=longi"

        var form = new FormData();
        form.append("data", config_obj);

        console.log("config_obj::" + lati + ", " + longi + ", paaa::" + JSON.stringify(form));
        NetInfo.isConnected.fetch().done(isConnected => {
            if (isConnected == true) {
                // console.log("value" + JSON.stringify(date_obj));
                fetch(
                    whatshere_URL,
                    {
                        body: form,
                        method: "GET",
                        headers: {
                            'Content-Type': 'multipart/form-data'
                            // 'Authorization': 'Bearer ' + user.token
                        }
                    }

                ).then(response =>

                    response.json()
                )
                    .then(responseData => {
                        console.log("resep::" + JSON.stringify(responseData));
                        return responseData;

                    }).catch((error) => {

                        console.log("error :rrrrr:" + error);
                        alert(error);

                    }).done();

            } else {
                this.setState({ connection_Status: "Offline" });

                alert("You are not connected to Internet.");
            }
        }).catch((error) => {

            console.log("error :rrrrr:" + error);
            alert(error);

        }).done();
    }

    onMapPress(e) {
        this.setState({
            markers:
            {
                coordinate: e.nativeEvent.coordinate,
                key: id++,
                // color: randomColor(),
            },
        });
        this.whatshere();
        // SaveAddress=()=>{console.log(JSON.stringify(this.state.markers[0].coordinate.latitude))}
    }

    get mapType() {
        return this.props.provider === PROVIDER_DEFAULT ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
    }

    getLocation = async () => {
        const location_update = await AsyncStorage.getItem("location_details");
        const value = JSON.parse(location_update);
        console.log("Parsed Value: " + location_update);
        this.setState({ parsed_location: JSON.parse(location_update) });
        plusPrint("loc::in map page" + this.state.parsed_location + "value::" + value.latitude);
        // this.setState({latitude:value.latitude});
        // this.setState({longitude:value.longitude});
        this.setState({ region: { latitude: value.latitude, longitude: this.state.region.longitude, latitudeDelta: this.state.region.latitudeDelta, longitudeDelta: this.state.region.longitudeDelta } });
        this.setState({ region: { latitude: this.state.region.latitude, longitude: value.longitude, latitudeDelta: this.state.region.latitudeDelta, longitudeDelta: this.state.region.longitudeDelta } });
    }

    // CustomMarker = () => (
    //   <View
    //     style={{
    //       paddingVertical: 10,
    //       paddingHorizontal: 30,
    //       backgroundColor: "#fff",
    //       borderColor: "#eee",
    //       borderRadius: 5,
    //       elevation: 10
    //     }}
    //   >
    //     <Text>
    //       Lat: {this.state.markers.coordinate.latitude} 
    //       {"\n"}
    //       Long: {this.state.markers.coordinate.longitude} 
    //     </Text>

    //   </View>
    // )

    componentDidMount() {
        // Start counting when the page is loaded\
        this.getLocation();
        // this.CustomMarker();
    }

    render() {
        return (

            <MapView
                region={this.state.region}
                provider={null}
                showsUserLocation={true}
                zoomEnabled={true}
                zoomControlEnabled={true}
                // rotateEnabled={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                mapType={this.mapType}
                rotateEnabled={false}
                style={styles.map, { flex: 1 }}
                showsUserLocation
                onPress={e => this.onMapPress(e)}>

                <UrlTile
                    // urlTemplate= "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    // urlTemplate="https://bhuvan-ras2.nrsc.gov.in/tilecache/tilecache.py/1.0.0/bhuvan_900913/{z}/{x}/{y}.png"

                    urlTemplate="https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/tms/1.0.0/india3@EPSG:900913@png/{z}/{x}/{y}.png"
                    maximumZ={19}
                    /**
                     * flipY allows tiles with inverted y coordinates (origin at bottom left of map)
                     * to be used. Its default value is false.
                     */
                    flipY={true}
                />

                {/* <Marker  
          coordinate={{ latitude: this.state.region.latitude, longitude: this.state.region.longitude}} 
          title={"Loction Details"}  
          description={"Lat_Long"}  
        /> */}
                <Marker
                    key={this.state.markers.key}
                    coordinate={this.state.markers.coordinate}
                    title={"Loction Details"}
                    description={"Lat: " + (this.state.markers.coordinate.latitude).toString() + "& Long: " + (this.state.markers.coordinate.longitude).toString()}
                // pinColor={this.state.markers.color}
                >
                    {/* <View style={styles.marker}>
           <Text style={styles.text}> 
           {JSON.stringify(this.state.markers.coordinate)}</Text>
          </View> */}
                </Marker>

                {/* <Marker coordinate={this.state.markers.coordinate }>
          <CustomMarker /> 
        </Marker> */}

            </MapView>

        );
    }
}

const styles = StyleSheet.create({
    map: {
        width: 358,
        height: 650,
    },
});