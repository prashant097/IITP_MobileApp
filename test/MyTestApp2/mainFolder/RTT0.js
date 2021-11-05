// First RTT code from Github

import React, { Component } from 'react';
import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import Ping from 'react-native-ping';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  buttonText: {
    fontSize: 24,
    padding: 32
  },
  msText: {
    fontSize: 24,
    padding: 32
  }
});
export default class RTT0 extends Component {
  state = {
    ipAddress: '192.168.43.1',
    // ipAddress: '26.146.253.157',
    // ipAddress: '100.76.143.170',
    ms: ''
  };
  onPressButton = async () => {
    const option = { timeout: 1000 };
    let ms;
    try {
      ms = await Ping.start(this.state.ipAddress, option);
      console.log("IP Address: "+this.state.ipAddress);
      console.log("RTT:"+ms);
    } catch (error) {
      console.log(error.code, error.message);
    }

    this.setState({ ms });
    const result = await Ping.getTrafficStats();
    console.log(result);
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            alignSelf: 'stretch'
          }}
          onChangeText={ipAddress => this.setState({ ipAddress })}
          value={"IP Address: "+this.state.ipAddress}
        />
        <TouchableOpacity onPress={this.onPressButton}>
          <Text style={styles.buttonText}>Ping</Text>
        </TouchableOpacity>
        <Text style={styles.msText}>RTT: {this.state.ms}</Text>
      </View>
    );
  }
}