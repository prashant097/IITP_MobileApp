import React, { Component, useState} from 'react';
import { StyleSheet, View, Text, Button, Linking, BackHandler, TouchableOpacity } from 'react-native';
import { plusPrint, app_info, app_Name, dirHome } from "./config";
import AsyncStorage from "@react-native-community/async-storage";

import MapView from 'react-native-maps';
// import carImage from '/src/images/car.png';

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

    prevPos: null,
    curPos: { latitude: 17.35635, longitude: 78.42006 },
    // const [curPos, setcurPos] = useState({latitude: 17.35635, longitude: 78.42006 }),
    // curPos: { latitude: "", longitude: "" },
    curAng: 45,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

// export default class NavigationMap extends Component {
export default class MapPage4 extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.changePosition = this.changePosition.bind(this);
    this.getRotation = this.getRotation.bind(this);
    this.updateMap = this.updateMap.bind(this);
  }

  getLocation = async () => {
    const location_update = await AsyncStorage.getItem("location_details");
    const value=JSON.parse(location_update);
    console.log("Parsed Value: "+location_update);
    this.setState({ parsed_location: JSON.parse(location_update) });
    plusPrint("loc::in map page" + this.state.parsed_location+"value::"+value.latitude);
    // this.setState({curPos.latitude:value.latitude});
    // this.setState({curPos.longitude:value.longitude});
    this.setState({curPos: {latitude:value.latitude, longitude:this.state.curPos.longitude}});
    this.setState({curPos: {latitude:this.state.curPos.latitude, longitude:value.longitude}});
    // this.setState.curPos: { latitude: value.latitude, longitude: value.longitude },
    // this.setState.curPos.latitude=Number(value.latitude);
    // this.setState.curPos.longitude=Number(value.longitude);
    // curPos.latitude=Number(value.latitude);
    // curPos.longitude=Number(value.longitude);
 
  }

  componentDidMount() {
    // Start counting when the page is loaded\
    this.getLocation();
  }

  changePosition(latOffset, lonOffset) {
    const latitude = this.state.curPos.latitude + latOffset;
    const longitude = this.state.curPos.longitude + lonOffset;
    this.setState({
      prevPos: this.state.curPos,
      curPos: { latitude, longitude },
    });
    this.updateMap();
  }

  getRotation(prevPos, curPos) {
    if (!prevPos) {
      return 0;
    }
    const xDiff = curPos.latitude - prevPos.latitude;
    const yDiff = curPos.longitude - prevPos.longitude;
    return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI;
  }

  updateMap() {
    const { curPos, prevPos, curAng } = this.state;
    const curRot = this.getRotation(prevPos, curPos);
    this.map.animateCamera({ heading: curRot, center: curPos, pitch: curAng });
  }

  render() {
    return (
      <View style={styles.flex}>
        <MapView
          ref={el => (this.map = el)}
          style={styles.flex}
          minZoomLevel={15}
          initialRegion={{
            ...this.state.curPos,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}
        >
          <MapView.Marker
            coordinate={this.state.curPos}
            anchor={{ x: 0.5, y: 0.5 }}
            // image={carImage}
          />
        </MapView>
        <View style={styles.buttonContainerUpDown}>
          <TouchableOpacity
            style={[styles.button, styles.up]}
            onPress={() => this.changePosition(0.0001, 0)}
          >
            <Text>+ Lat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.down]}
            onPress={() => this.changePosition(-0.0001, 0)}
          >
            <Text>- Lat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerLeftRight}>
          <TouchableOpacity
            style={[styles.button, styles.left]}
            onPress={() => this.changePosition(0, -0.0001)}
          >
            <Text>- Lon</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.right]}
            onPress={() => this.changePosition(0, 0.0001)}
          >
            <Text>+ Lon</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    width: '100%',
  },
  buttonContainerUpDown: {
    ...StyleSheet.absoluteFillObject,           // MEANING OF THE THREE DOTS IN THE BEGINNING
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainerLeftRight: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgba(100,100,100,0.2)',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 50,
    width: 50,
  },
  up: {
    alignSelf: 'flex-start',
  },
  down: {
    alignSelf: 'flex-end',
  },
  left: {
    alignSelf: 'flex-start',
  },
  right: {
    alignSelf: 'flex-end',
  },
});
