import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Image, Dimensions } from 'react-native';
import { Button, Container, Header, Left, Right, Icon, Text, Radio } from 'native-base';
import { plusPrint, app_info, app_Name, dirHome } from "./config";
import MapView, { MAP_TYPES, PROVIDER_DEFAULT, UrlTile } from 'react-native-maps';
import AsyncStorage from "@react-native-community/async-storage";
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
};

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 22.720555;
const LONGITUDE = 75.858633;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapPage2 extends React.Component {
  static navigationOptions = {
    drawerLabel: 'OpenStreetMap'


  };
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      initialState,
    };
  }
  get mapType() {
    return this.props.provider === PROVIDER_DEFAULT ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
  }

  getLocation = async () => {
    const location_update = await AsyncStorage.getItem("location_details");
    const value=JSON.parse(location_update);
    console.log("Parsed Value: "+location_update);
    this.setState({ parsed_location: JSON.parse(location_update) });
    plusPrint("loc::in map page" + this.state.parsed_location+"value::"+value.latitude);
    // this.setState({latitude:value.latitude});
    // this.setState({longitude:value.longitude});
    this.setState({region: {latitude:value.latitude, longitude:this.state.region.longitude, latitudeDelta:this.state.region.latitudeDelta, longitudeDelta:this.state.region.longitudeDelta}});
    this.setState({region: {latitude:this.state.region.latitude, longitude:value.longitude, latitudeDelta:this.state.region.latitudeDelta, longitudeDelta:this.state.region.longitudeDelta}});
  }

  componentDidMount() {
    // Start counting when the page is loaded\
    this.getLocation();
  }

  render() {
    return (

      <MapView
        region={this.state.region}
        provider={null}
		showsUserLocation={true}
		zoomEnabled={true}
		zoomControlEnabled={true}
		rotateEnabled={true}
		showsMyLocationButton={true}
		followsUserLocation={true}
        mapType={this.mapType}
        rotateEnabled={false}
        style={styles.map}
		
        showsUserLocation>
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