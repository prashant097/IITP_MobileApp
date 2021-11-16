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
  Alert,
} from 'react-native';

import Ping from 'react-native-ping';
import {Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component';//Here we are Importing
import CButton from "./CButton";
// import { plusPrint } from './config';

// var styles = StyleSheet.create({
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

var styles = StyleSheet.create({
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

var styles1 = StyleSheet.create({
  container: {
    flex: 1,
  },
  parent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: { width: 70, height: 28, marginLeft: 15, marginRight: 15, backgroundColor: '#c8e1ff', borderRadius: 10, alignItems: "center"},
});

var speed_light = 3 * (10**8);
console.log("speed_light :"+speed_light );

export default class RTT3 extends Component {
  constructor(props) {
    super(props);

    var elementButton = (value) => (
      <TouchableOpacity onPress={() => this._alertIndex(value)}>
        <View style={styles1.btn}>
          <Text style={{ textAlign: 'center' }}> {value}</Text>
        </View>
      </TouchableOpacity>
    );

    this._alertIndex= this._alertIndex.bind(this);
    this.AsyncAlert= this.AsyncAlert.bind(this);

    this.state = {
      tableHead:  [" ", elementButton("AP1"), elementButton("AP2"), elementButton("AP3")],//initialisation of header of table
      tableTitle: ['IP Address','X_Coordinate', 'Y_Coordinate', 'RTTn(ms)', 'Distance (m)', 'Status'], //initialisation of 1st column
      // positions: ["(1,2)", "(3,4)", "(6,8)"], //cartesian coordinate of the fixed WiFi access points(APs)
      // X_Coordinate: [2, 12, 21],
      X_Coordinate: [1,.21, 3.65, 6.4],
      // Y_Coordinate: [8, 11, 11],
      Y_Coordinate: [2.43, 3.35, 3.35],
      ips : ['192.168.0.1','192.168.0.1', '192.168.0.1'],
      // ips : ['192.168.43.1','192.168.43.1', '192.168.43.1'],
      tableData: [ [], [], [] , [], [], []], //initialisation of table contents
      // widthArr: [100, 100, 100, 100],

      // RTT_array : new Array(),         //Not a better way to declare empty array
      RTT_array : ["00", "00", "00"],
      Dist_array : ["00", "00", "00"],
    //   Dist_array : ["10.2", "6.8", "4.2"],
      status_check: ["Waiting", "Waiting", "Waiting"],
      // ms: '',
      final_position: [, ],    
      final_position_x: 4,
      final_position_y: 3,
      ms: null,
      IP: null,
      Dist: null,
    };

    this.state.tableData[0] = this.state.ips;
    this.state.tableData[1] = this.state.X_Coordinate;
    this.state.tableData[2] = this.state.Y_Coordinate;
    this.state.tableData[3] = this.state.RTT_array;
    this.state.tableData[4] = this.state.Dist_array;//inserting updated array to the tableData
    this.state.tableData[5] = this.state.status_check;//inserting updated array to the tableData
  }

  _alertIndex(value) {
    Alert.alert('Detail: ', `This is Access Point ${value}`);
  }

  openAlert=()=>{
    Alert.alert('Disclaimer:','Here, AP: Access Points.\n\nClick on "Ping" Button to update the table.\n\nAnd, three different IP Address is pinged one by one. Respective RTT and distance for each APs are updated once the "Ping" Button is clicked.', 
    [{text: 'Got It!', onPress: () => console.log('OK Pressed')}], { cancelable: false });
  }
  

  AsyncAlert = async () => new Promise((resolve) => {
    Alert.alert(
      'Info',
      'Is your device ready to use?\n\nMake sure that only one device is "ON" with same GateWay IP Address.\n\nClick on "OK" to resume the calculation.',
      [
        {
          text: 'OK',
          onPress: () => {
            resolve('YES');
          },
        },
      ],
      { cancelable: false },
    );
  });
  
  onPressButton = async () => {
    var option = { timeout: 1000 };
    var min = arr => arr.reduce((x, y) => Math.min(x, y));
    var max = arr => arr.reduce((x, y) => Math.max(x, y));
    console.log("New Set of DaTa:");
    console.log("------>");
    let count = 0;
      for (var item of this.state.ips) {

        // let Status = await this._deviceStatus();
        await this.AsyncAlert();

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
        var threshold = 5;
        var chunk = 30; //Number of readings required in a chunk

        // for (let i=0; i<30; i++) {
        // while((diff < threshold && ms_array.length == 20)=== false) {
        for(let i = 1; ; i++) {
          // console.log("Check22");
          try {
            // var ms = await Ping.start(this.state.ipAddress, option);
            var ms = await Ping.start(item, option);
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
  
            // var ms = await Ping.start(this.state.ipAddress, { timeout: 1000 })
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
        var IP = item;
        var ms_sum = ms_array.reduce((a, b) => a + b, 0);
        console.log("Sum_ms_array: "+ms_sum);
        var RTT = (ms_sum/chunk).toFixed(4);
        // var RTT = (ms_sum/chunk);
        console.log("speed_light :"+speed_light );
        console.log("RTT, RTT/(2*10^9): "+RTT+", "+RTT/(2*10**9));
        var Dist = (speed_light * (RTT/(2*10**9))).toFixed(4);
        // var Dist = (speed_light * (RTT/(2*10**9)));
        console.log("Distance: "+Dist);
        // this.setState({ RTT_array: [...this.state.RTT_array, RTT] })
        // this.setState({ Dist_array: [...this.state.Dist_array, Dist] })
        // this.state.RTT_array.push(RTT);   //Errorneous way of updating state array using push
        // this.state.Dist_array.push(Dist);
        let RTT_array = [ ...this.state.RTT_array ];
        RTT_array[count] = RTT;
        this.setState({ RTT_array});

        let Dist_array = [ ...this.state.Dist_array ];
        Dist_array[count] = Dist;
        this.setState({ Dist_array});

        // let status_check = [ ...this.state.status_check ];
        // status_check[count] = "Done";
        // this.setState({ status_check});
        count++;
  
        console.log("IP: "+ item + ", RTT: " + RTT + "ms, Dist: " + Dist + " & Total Iterations: "+ iter);
        // this.setState({ ms });
        this.setState({ IP });
        this.setState({ Dist });  
        
        var result = await Ping.getTrafficStats();
        // console.log("ipAddress: "+this.state.ipAddress+" result::"+JSON.stringify(result));
        console.log("item: "+item+" result::"+JSON.stringify(result));      
      }

      let status_check = [ ...this.state.status_check ];
      status_check = ["Done", "Done", "Done"];
      this.setState({ status_check});  

    // console.log("result: "+result);
    console.log("-------> ");
    console.log("IP: ["+this.state.ips+"]");
    console.log("RTT_array: ["+ this.state.RTT_array +"]");
    console.log("Dist_array ["+ this.state.Dist_array +"]");
    console.log("Status_Check ["+ this.state.status_check +"]");

    // this.state.tableData[3] = this.state.RTT_array;
    // this.state.tableData[4] = this.state.Dist_array;

    // require('console.table');
    // console.table(this.state.tableData, ["tableData"]);
    console.log("tableData: [" +this.state.tableData+"]");
  };

  clearOut = async () => {
    let RTT_array = [ ...this.state.RTT_array ];
    RTT_array = ["00", "00", "00"];
    this.setState({ RTT_array});  

    let Dist_array = [ ...this.state.Dist_array ];
    Dist_array = ["00", "00", "00"];
    this.setState({ Dist_array});  

    let status_check = [ ...this.state.status_check ];
    status_check = ["Waiting", "Waiting", "Waiting"];
    this.setState({ status_check});  
  };

  device_position = async () => {
    console.log("Calculating Device Position--")
    circle_int1 = this.intersection_circle(
      {x: this.state.X_Coordinate[1], y: this.state.Y_Coordinate[1], r: this.state.Dist_array[1]},
      {x: this.state.X_Coordinate[2], y: this.state.Y_Coordinate[2], r: this.state.Dist_array[2]},
    );
    circle_int2 = this.intersection_circle(
      {x: this.state.X_Coordinate[0], y: this.state.Y_Coordinate[0], r: this.state.Dist_array[0]},
      {x: this.state.X_Coordinate[2], y: this.state.Y_Coordinate[2], r: this.state.Dist_array[2]},
    );
    // console.log("circle_intersect1: "+{circle_intersect1});
    console.log("circle_int1: "+JSON.stringify(circle_int1))
    console.log("circle_int2: "+JSON.stringify(circle_int2))
    console.log(circle_int1.point_1.x)

    final_position_update = this.intersect_line(circle_int1.point_1.x, circle_int1.point_1.y, circle_int1.point_2.x, circle_int1.point_2.y, 
      circle_int2.point_1.x, circle_int2.point_1.y, circle_int2.point_2.x, circle_int2.point_2.y,);

    console.log("final_position_update: "+JSON.stringify(final_position_update));
    var x_update = final_position_update.x;
    var y_update = final_position_update.y;
    let final_position = [ ...this.state.final_position ];
    final_position = [x_update.toFixed(3), y_update.toFixed(3)];
    // final_position = [x_update, y_update];
    // final_position = [final_position_update.x, final_position_update.y];
    // final_position = [JSON.stringify(final_position_update)];
    this.setState({ final_position});
    console.log("final_position_after: "+this.state.final_position);

  }

/**
 * @description Get information about the intersection points of a circle.
 * Adapted from: https://stackoverflow.com/a/12221389/5553768.
 * @param {Object} c1 An object describing the first circle.
 * @param {float} c1.x The x coordinate of the circle.
 * @param {float} c1.y The y coordinate of the circle.
 * @param {float} c1.r The radius of the circle.
 * @param {Object} c2 An object describing the second circle.
 * @param {float} c2.x The x coordinate of the circle.
 * @param {float} c2.y The y coordinate of the circle.
 * @param {float} c2.r The radius of the circle.
 * @returns {Object} Data about the intersections of the circles.
 */
 intersection_circle(c1, c2) {
  // Start constructing the response object.
  var result = {
      intersect_count: 0,
      intersect_occurs: true,
      one_is_in_other: false,
      are_equal: false,
      point_1: { x: null, y: null },
      point_2: { x: null, y: null },
  };

  // Get vertical and horizontal distances between circles.
  var dx = c2.x - c1.x;
  var dy = c2.y - c1.y;

  // Calculate the distance between the circle centers as a straight line.
  var dist = Math.hypot(dy, dx);

  // Check if circles intersect.
  if (dist > c1.r + c2.r) {
      result.intersect_occurs = false;
  }

  // Check one circle isn't inside the other.
  if (dist < Math.abs(c1.r - c2.r)) {
      result.intersect_occurs = false;
      result.one_is_in_other = true;
  }

  // Check if circles are the same.
  if (c1.x === c2.x && c1.y === c2.y && c1.r === c2.r) {
      result.are_equal = true;
      result.are_equal = true;
  }

  // Find the intersection points
  if (result.intersect_occurs) {
      // Centroid is the pt where two lines cross. A line between the circle centers
      // and a line between the intersection points.
      var centroid = (c1.r * c1.r - c2.r * c2.r + dist * dist) / (2.0 * dist);

      // Get the coordinates of centroid.
      var x2 = c1.x + (dx * centroid) / dist;
      var y2 = c1.y + (dy * centroid) / dist;

      // Get the distance from centroid to the intersection points.
      var h = Math.sqrt(c1.r * c1.r - centroid * centroid);

      // Get the x and y dist of the intersection points from centroid.
      var rx = -dy * (h / dist);
      var ry = dx * (h / dist);

      // Get the intersection points.
      result.point_1.x = Number((x2 + rx).toFixed(15));
      result.point_1.y = Number((y2 + ry).toFixed(15));

      result.point_2.x = Number((x2 - rx).toFixed(15));
      result.point_2.y = Number((y2 - ry).toFixed(15));

      // Add intersection count to results
      if (result.are_equal) {
          result.intersect_count = null;
      } else if (result.point_1.x === result.point_2.x && result.point_1.y === result.point_2.y) {
          result.intersect_count = 1;
      } else {
          result.intersect_count = 2;
      }
  }
  return result;
  }

  // Example giving input and the result for the function intersection_circle
  // intersection_circle(
  //   {x: 1, y: 1, r: 2},
  //   {x: 0, y: -1, r: 1}
  // )

  //   // Result
  //   result = {
  //       intersect_count: 2,
  //       intersect_occurs: true,
  //       one_is_in_other: false,
  //       are_equal: false,
  //       point_1: { x: 1, y: -1 },
  //       point_2: { x: -0.6, y: -0.2 },
  //   }

  // line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect

intersect_line(x1, y1, x2, y2, x3, y3, x4, y4) {

  // Check if none of the lines are of length 0
	if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
		return false
	}

	denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // Lines are parallel
	if (denominator === 0) {
		return false
	}

	let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
	let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
	if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
		return false
	}

  // Return a object with the x and y coordinates of the intersection
	let x = x1 + ua * (x2 - x1)
	let y = y1 + ua * (y2 - y1)

	return {x, y}
}

  async componentDidMount() {
    // Start counting when the page is loaded
    // this.onPressButton();
    // this.showArrayItems();
    this.state.final_position ;
  }

  render() {
    console.log("render: Click on Ping to update the Table");
    var state = this.state;
    this.state.tableData[3] = this.state.RTT_array;
    this.state.tableData[4] = this.state.Dist_array;
    this.state.tableData[5] = this.state.status_check; 

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

        <View style={{flex:1, flexDirection:'row', alignItems:'flex-start',}}>     
           <TouchableOpacity style={{width:'40%', backgroundColor:'#E7E6E1', marginHorizontal:20, borderRadius:20}} onPress={this.onPressButton}>
              <Text style={{color:'black',alignSelf:'center', padding:15, fontSize: 20}}>Ping Start</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{width:'40%', backgroundColor:'#E7E6E1', marginHorizontal:10, borderRadius:20}} onPress={this.openAlert}>
               <Text style={{color:'black',alignSelf:'center', padding:15, fontSize: 20}}>Read Me</Text>
           </TouchableOpacity>
        </View>

        <View style={{flex:1, flexDirection:'row', alignItems:'flex-start',}}>     
           <TouchableOpacity style={{width:'90%', backgroundColor:'#E7E6E1', margin: 10, marginHorizontal:20, borderRadius:20}} onPress={this.clearOut}>
              <Text style={{color:'black',alignSelf:'center', padding:12, fontSize: 20}}>Refresh: Clear the readings</Text>
           </TouchableOpacity>
        </View>
      

        <ScrollView horizontal={true}>
        <View style={{flex:1}}>   
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

        <View style={{flex:1, flexDirection:'row', justifyContent: 'center', alignItems:'flex-start',}}>     
           <TouchableOpacity style={{width:'90%', backgroundColor:'#E7E6E1', margin: 10, marginHorizontal:20, borderRadius:20}} onPress={this.device_position}>
              <Text style={{color:'black',alignSelf:'center', padding:12, fontSize: 20}}>Calculate the device position:</Text>
           </TouchableOpacity>
        </View>
        <View style={{alignItems:"center", padding: 0}}>
            <Text style={{color:'black',alignSelf:'center', padding:12, fontSize: 20}}> (x, y): ({state.final_position[0]},{(state.final_position[1])})</Text>
        </View> 


      </View>
    );

  }
}