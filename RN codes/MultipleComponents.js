// To render one component multiple times and in multiple places without repeating the code

import React from 'react';
import { Text, View } from 'react-native';

const Cat = () => {
  return (
    <View>
      <Text>I am also a cat!</Text>
    </View>
  );
}

const Cafe = () => {
  return (
    <View>
      <Text>Welcome!</Text>
      <Cat />
      <Cat />
      <Cat />
    </View>
  );
}// Any component that renders other components is a parent component. 
// Here, Cafe is the parent component and each Cat is a child component.

export default Cafe;