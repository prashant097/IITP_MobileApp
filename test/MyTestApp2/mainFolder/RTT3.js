// Code to check some seleted IP address

import React, { Component, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';

import Ping from 'react-native-ping';
import {Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component';//Here we are Importing
import CButton from "./CButton";
// import { plusPrint } from './config';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   buttonText: {
//     fontSize: 24,
//     padding: 32
//   },
//   msText: {
//     fontSize: 24,
//     padding: 32
//   }
// });

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28 , backgroundColor: '#E7E6E1' },
    text: { textAlign: 'center' },

    buttonText: {
        alignItems: "center",
        backgroundColor: '#f6f8fa',
        fontSize: 24,
        padding: 10,
        borderWidth: 1,
        margin: 10,
        marginLeft: 15,
        marginRight: 20,
        borderRadius: 20
    },

  parent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
  },
  parent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const speed_light = 3 * 10^8;

export default class RTT3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableHead:  [" ", "AP1", "AP2", "AP3"],//initialisation of header of table
      tableTitle: ['IP Address','Position (x1,y1)', 'RTT (ms)', 'Distance (m)', 'Status'], //initialisation of 1st column
      positions: ["(1,2)", "(3,4)", "(6,8)"], //cartesian coordinate of the fixed WiFi access points(APs)
      ips : ['192.168.43.1','192.168.43.2', '192.168.43.27'],
      tableData: [ [], [], [] ,[],[]], //initialisation of table contents
      // widthArr: [100, 100, 100, 100],

      // RTT_array : new Array(),         //Not a better way to declare empty array
      RTT_array : ["00", "00", "00"],
      Dist_array : ["00", "00", "00"],
      status_check: ["Waiting", "Waiting", "Waiting"],
      // ms: '',  
      ms: null,
      IP: null,
      Dist: null,
    };
    this.state.tableData[0] = this.state.ips;
    this.state.tableData[1] = this.state.positions;
    this.state.tableData[2] = this.state.RTT_array;
    this.state.tableData[3] = this.state.Dist_array;//inserting updated array to the tableData
    this.state.tableData[4] = this.state.status_check;//inserting updated array to the tableData
  }

  openAlert=()=>{
    alert('Here, AP: Access Points.\n\nClick on "Ping" Button to update the table.\n\nAnd, three different IP Address is pinged one by one. Respective RTT and distance for each APs are updated once the "Ping" Button is clicked.');
  }

  
  onPressButton = async () => {
    const option = { timeout: 1000 };
    const min = arr => arr.reduce((x, y) => Math.min(x, y));
    const max = arr => arr.reduce((x, y) => Math.max(x, y));
    console.log("New Set of DaTa:");
    console.log("------>");
    let count = 0;
      for (const item of this.state.ips) {
        // let ms_sum = 0;
        let status_check = [ ...this.state.status_check ];
        status_check[count] = "Calculating...";
        this.setState({ status_check}); // to uopdate the status from Waiting to Calculating
        console.log("Status_Check ["+ this.state.status_check +"]");

        let ms_min = 1000;
        let ms_max = 0;
        let max_ar = Number;
        let min_ar = Number;
        let diff = 500;
        let ms_array = [10];
        let iter = 0;
        let iter_error = 0;
        const threshold = 8;
        const chunk = 20; //Number of readings required in a chunk

        // for (let i=0; i<30; i++) {
        // while((diff < threshold && ms_array.length == 20)=== false) {
        for(let i = 1; ; i++) {
          // console.log("Check22");
          try {
            // const ms = await Ping.start(this.state.ipAddress, option);
            const ms = await Ping.start(item, option);
            iter++;
            // max_ar = Math.max.apply(Math, ms_array);
            // max_ar = max(ms_array);
            ms_max = max(ms_array);
            // min_ar = Math.min.apply(Math, ms_array);
            // min_ar = min(ms_array);
            ms_min = min(ms_array);
            // console.log("max_ar, min_ar: "+max_ar+", "+min_ar);
            // if (ms_min > min_ar) {
            //   ms_min = min_ar;
            // }
            // if (ms_max < max_ar) {
            //   ms_max = max_ar;
            // }
            diff = ms_max - ms_min;
            if (ms_array.length < chunk-1) {
              ms_array.push(ms);
              console.log("Iteration : "+ (iter) + ", RTT :" +ms+" ms, diff: "+diff+", ms_max: "+ms_max+", ms_min: "+ms_min);
            } else if (diff < threshold && ms_array.length == chunk-1) {
              ms_array.push(ms);
              console.log("Iteration : "+ (iter) + ", RTT :" +ms+" ms & SUCCESSSSS!!!");
              break;
            } else if (diff > threshold) {
              ms_array.shift();
              ms_array.push(ms);
              console.log("Iteration : "+ (iter) + ", RTT :" +ms+" ms, diff: "+diff+", ms_max: "+ms_max+", ms_min: "+ms_min+" & (shift)");
            }
            // if (ms < 10) {
            //   ms_sum += ms;
            //   iter +=1;
            //   console.log("Iteration : "+ (i+1) + ", RTT :" +ms+" ms, RTT_Sum = "+ms_sum);
            // } else {
            //   console.log("Iteration : "+ (i+1) + ", RTT :" +ms+" ms, RTT_Sum = "+ms_sum+" EXCLUDED!!!");
            // }
            // this.state.ms = await Ping.start('ipAddress', option);
  
            // const ms = await Ping.start(this.state.ipAddress, { timeout: 1000 })
          } catch (error) {
            console.log("ERROR:" + error.code, error.message);
            iter_error++;
            if (iter_error == 3) {
                break;
            }
          }
          // this.setState({ ms });
        }
        console.log("ms_array: "+ms_array);
        console.log("Max_RTT: "+ms_max+", Min_RTT: "+ms_min+", Diff: "+diff);
        const IP = item;
        const ms_sum = ms_array.reduce((a, b) => a + b, 0);
        console.log("Sum_ms_array: "+ms_sum);
        const RTT = (ms_sum/chunk).toFixed(4);
        const Dist = (speed_light * RTT/(2*10^3)).toFixed(4);
        // this.setState({ RTT_array: [...this.state.RTT_array, RTT] })
        // this.setState({ Dist_array: [...this.state.Dist_array, Dist] })
        // this.state.RTT_array.push(RTT);   //Errorneous way of updating state array using push
        // this.state.Dist_array.push(Dist);
        let RTT_array = [ ...this.state.RTT_array ];
        RTT_array[count] = RTT;
        this.setState({ RTT_array});

        let Dist_array = [ ...this.state.Dist_array ];
        Dist_array[count] = RTT;
        this.setState({ Dist_array});

        let status_check = [ ...this.state.status_check ];
        status_check[count] = "Done";
        this.setState({ status_check});
        count++;
  
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
    console.log("Status_Check ["+ this.state.status_check +"]");

    // this.state.tableData[2] = this.state.RTT_array;
    // this.state.tableData[3] = this.state.Dist_array;

    // require('console.table');
    // console.table(this.state.tableData, ["tableData"]);
    console.log("tableData: [" +this.state.tableData+"]");
  };

  async componentDidMount() {
    // Start counting when the page is loaded
    // this.onPressButton();
    // this.showArrayItems();
  }

  render() {
    console.log("render: Click on Pinf to update the Table");
    const state = this.state;
    this.state.tableData[2] = this.state.RTT_array;
    this.state.tableData[3] = this.state.Dist_array;
    this.state.tableData[4] = this.state.status_check;

    return (
    //   <View style={styles.container}>
    //     <TextInput
    //       style={{
    //         height: 40,
    //         borderColor: 'gray',
    //         borderWidth: 1,
    //         alignSelf: 'stretch'
    //       }}
    //       onChangeText={ipAddress => this.setState({ ipAddress })}
    //       value={this.state.ipAddress}
    //     />
    //     <TouchableOpacity onPress={this.onPressButton}>
    //       <Text style={styles.buttonText}>Ping</Text>
    //     </TouchableOpacity>
    //     {/* {this.state.ips.map(item => (<li key={item}>{item}</li>))} */}
    //     <Text style={styles.msText}>IP: {this.state.ips}</Text>
    //     <Text style={styles.msText}>RTT: {this.state.RTT_array}</Text>
    //     <Text style={styles.msText}>Dist: {this.state.Dist_array} </Text>
    //     {/* {this.showArrayItems(this.state.Dist_array)} */}
    //   </View>

     <View style={styles.container}>

        <View style={{flex:0.3, flexDirection:'row', alignItems:'flex-start',}}>     
           <TouchableOpacity style={{width:'40%', backgroundColor:'#E7E6E1', marginHorizontal:20, borderRadius:20}} onPress={this.onPressButton}>
              <Text style={{color:'black',alignSelf:'center', padding:15, fontSize: 20}}>Ping Start</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{width:'40%', backgroundColor:'#E7E6E1', marginHorizontal:10, borderRadius:20}} onPress={this.openAlert}>
               <Text style={{color:'black',alignSelf:'center', padding:15, fontSize: 20}}>Read Me</Text>
           </TouchableOpacity>
        </View>
      

        <ScrollView horizontal={true}>
        <View style={{flex:2}}>   
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
            {/* <Row data={state.tableHead} flexArr={[2, 2, 2, 2]} style={styles.head} textStyle={styles.text}/> */}
            <Row data={state.tableHead} widthArr={[100, 100, 100, 100]} style={styles.head} textStyle={styles.text}/>
            <TableWrapper style={styles.wrapper}>
                <Col data={state.tableTitle} style={styles.title} heightArr={[28,28,28,28]} textStyle={styles.text}/>
                <Rows data={state.tableData} widthArr={[100, 100, 100]} style={styles.row} textStyle={styles.text}/>
            </TableWrapper>
            </Table>
        </View>
        </ScrollView>
      </View>
    );

  }
}