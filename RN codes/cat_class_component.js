// Example of Class Componet with explanation via commented line

import React, { Component } from 'react';  // Here, {Component} is imported additionally
import { Text } from 'react-native'; 

// Cat component starts as a class extending Component instead of as a function
// Class components have a render() function. Whatever is returned inside it is rendered as a React element

class Cat extends Component {
  render() {
    return (
      <Text>Hello, I am your cat!</Text>
    );
  }
}

export default Cat; //exporting class component