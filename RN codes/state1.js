// Use of STATE, based on the user input

import React, { useState } from "react"; //  import useState from React
import { Button, Text, View } from "react-native";

const Cat = (props) => {
  //  declare the component’s state by calling useState inside its function. In this example, useState creates an isHungry state variable
  const [isHungry, setIsHungry] = useState(true);
  
  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? "hungry" : "full"}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? "Pour me some milk, please!" : "Thank you!"}
      />
    </View>
  );
}

const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
}

export default Cafe;