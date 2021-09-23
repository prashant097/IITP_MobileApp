import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Linking } from 'react-native';
// import RNLocation from 'react-native-location';
import { plusPrint, app_info, app_Name, dirHome } from "./config";
import AsyncStorage from "@react-native-community/async-storage";
import { renderNode } from 'react-native-elements/dist/helpers';

// RNLocation.configure({
//   distanceFilter: null,
// })


// const MapPage = ({url}) => {

//   [viewLocation, isViewLocation] = useState([])

//   const [tweet, setTweet] = useState([viewLocation.longitude, viewLocation.latitude]);

//   const tweetLocation = () => {
//      let twitterParams = [];

//      try {
//       if (tweet)
//       twitterParams.push('text=' + encodeURI(tweet));

//       const url = 'https://twitter.com/intent/tweet?' + twitterParams.join('&');

//       Linking.openURL(url)
//      } catch (error) {
//                         alert('Something went wrong');
//                     } 
//     }    

// const getLocation = async () => {

//     let location_update = await AsyncStorage.getItem("location_details");
//     let parsed_location = JSON.parse(location_update);
//     plusPrint("loc::" + parsed_location);
// }

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
    visible: true


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
    }
    componentDidMount() {
        // Start counting when the page is loaded\
        this.getLocation();



    }

    render() {
        return (
            <View style={styles.container} >
                <Text>React Native Geolocation</Text>
                <View
                    style={{ marginTop: 10, padding: 10, borderRadius: 10, width: '40%' }}>
                    <Button title="Get Location"
                    // onPress={getLocation}
                    />
                </View>
                {/* <Text>Latitude: {parsed_location.latitude} </Text>
                <Text>Longitude: {parsed_location.longitude} </Text> */}
                <View
                    style={{ marginTop: 10, padding: 10, borderRadius: 10, width: '40%' }}>
                    <Button
                        title="Send Location"
                    //   onPress={tweetLocation}
                    />
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MapPage;