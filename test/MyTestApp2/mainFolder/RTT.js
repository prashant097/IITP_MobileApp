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

    // let imag = null;

    this.state = {

      ips : ['26.146.253.157','192.168.43.1'],
      // RTT_array : new Array(),         //Not a better way to declare empty array
      RTT_array : [],
      Dist_array : [],
      // ms: '',
      ms: null,
      IP: null,
      Dist: null,
    };
  }
  onPressButton = async () => {
    const option = { timeout: 1000 };
    console.log("New Set of DaTa:");
    console.log("------>");
    for (const item of this.state.ips) {
      let ms_sum = 0;
      let iter = 0;
      for (let i=0; i<30; i++) {
        try {
          // const ms = await Ping.start(this.state.ipAddress, option);
          const ms = await Ping.start(item, option);
          if (ms < 10) {
            ms_sum += ms;
            iter +=1;
            console.log("Iteration : "+ (i+1) + ", RTT :" +ms+" ms, RTT_Sum = "+ms_sum);
          } else {
            console.log("Iteration : "+ (i+1) + ", RTT :" +ms+" ms, RTT_Sum = "+ms_sum+" EXCLUDED!!!");
          }
          // this.state.ms = await Ping.start('ipAddress', option);

          // const ms = await Ping.start(this.state.ipAddress, { timeout: 1000 })
        } catch (error) {
          console.log("ERROR:" + error.code, error.message);
        }
        // this.setState({ ms });
      }
      const IP = item;
      const RTT = (ms_sum/iter).toFixed(4);
      const Dist = (speed_light * RTT/(2*10^3)).toFixed(4);
      this.setState({ RTT_array: [...this.state.RTT_array, RTT] })
      this.setState({ Dist_array: [...this.state.Dist_array, Dist] })
      // this.state.RTT_array.push(RTT);
      // this.state.Dist_array.push(Dist);

      console.log("IP: "+ item + ", RTT: " + RTT + "ms, Dist: " + Dist + " & Total Iterations: "+ iter);
      // this.setState({ ms });
      this.setState({ IP });
      this.setState({ Dist });  
      
      const result = await Ping.getTrafficStats();
      // console.log("ipAddress: "+this.state.ipAddress+" result::"+JSON.stringify(result));
      console.log("item: "+item+" result::"+JSON.stringify(result));      
    }  
    // console.log("result: "+result);
    console.log("-------> ");
    console.log("IP: ["+this.state.ips+"]");
    console.log("RTT_array: ["+ this.state.RTT_array +"]");
    console.log("Dist_array ["+ this.state.Dist_array +"]");
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
        {/* {this.state.ips.map(item => (<li key={item}>{item}</li>))} */}
        <Text style={styles.msText}>IP: {this.state.ips}</Text>
        <Text style={styles.msText}>RTT: {this.state.RTT_array} </Text>
        <Text style={styles.msText}>Dist: {this.state.Dist_array} </Text>
      </View>
    );
  }
}