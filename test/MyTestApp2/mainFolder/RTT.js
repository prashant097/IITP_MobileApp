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
import { plusPrint } from './config';

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

const speed_light = 3 * 10^8;

export default class RTT extends Component {
  constructor(props) {
    super(props);

    let imag = null;

    this.state = {
      // ipAddress: '192.168.1.102', // Nokia Mobile Hotspot IP address
      // ipAddress: '192.168.1.101', // Nokia Mobile Hotspot ETHERNET IP address
      // ipAddress: '192.168.42.1', // USB Tethering IP address
      // ipAddress: '27.59.136.8', // Dongle Airtel IP address
      //ipAddress: '27.59.136.145', // Dongle Airtel IP address
      // ipAddress: '106.195.71.43', //  Airtel Nokia Phone IP address
      // ipAddress: '106.195.65.41', //  Airtel Nokia Phone IP address
      // ipAddress: '106.195.66.163', //  Airtel Nokia Phone IP address
      // ms: '',
      ms: null,
      IP: null,
      Dist: null,
    };
  }
  onPressButton = async () => {
    const option = { timeout: 1000 };
    console.log("Check1");
    // var ips = ['106.195.65.41','27.59.136.8', '192.168.1.102','192.168.1.101','106.195.70.195'];
    // var ips = ['192.168.1.1','192.168.1.103','192.168.1.100'];
    var ips = ['192.168.1.1','192.168.1.100','192.168.1.101'];
    for (const item of ips) {
      try {
        // const ms = await Ping.start(this.state.ipAddress, option);
        const ms = await Ping.start(item, option);
        const IP = item;
        const Dist = (speed_light * ms/(2*10^3)).toFixed(4);
        // this.state.ms = await Ping.start('ipAddress', option);

        // const ms = await Ping.start(this.state.ipAddress, { timeout: 1000 });
        console.log("IP: "+ item + " , RTT: " + ms + "ms, Dist: " + Dist);
        this.setState({ ms });
        this.setState({ IP });
        this.setState({ Dist });
      } catch (error) {
        console.log("ERROR:" + error.code, error.message);
      }

      // this.setState({ ms });

      const result = await Ping.getTrafficStats();
      // console.log("ipAddress: "+this.state.ipAddress+" result::"+JSON.stringify(result));
      // console.log("item: "+item+" result::"+JSON.stringify(result));
    }
    // console.log("result: "+result);
  };

  async componentDidMount() {
    // Start counting when the page is loaded
    this.onPressButton();
  }

  render() {
    // console.log("msg:in render:" + this.state.ms);
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
          value={this.state.ipAddress}
        />
        <TouchableOpacity onPress={this.onPressButton}>
          <Text style={styles.buttonText}>Ping</Text>
        </TouchableOpacity>
        <Text style={styles.msText}>IP: {this.state.IP}</Text>
        <Text style={styles.msText}>RTT: {this.state.ms} ms</Text>
        <Text style={styles.msText}>Dist: {this.state.Dist} m </Text>
      </View>
    );
  }
}