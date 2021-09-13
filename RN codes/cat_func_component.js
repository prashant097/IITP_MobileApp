// Use of Function Component

// To define the Cat component, first use JavaScript’s import to import React and React Native’s Text Core Component
import React from 'react';
import { Text } from 'react-native';

// Here, component starts as a function
// The "Cat" component will render a <Text> element

// const Cat = () => {
//   return (
//     <Text>Hello, I am your cat!</Text>
//   );
// }

// Using JSX synatx for Cat name
const Cat = () => {
    const name = "Maru";
    return (
      <Text>Hello, I am {name}!</Text> // use of curly braces for JavaScript expression
    );
}

// Exporting function component with JavaScript’s export default for use throughout the app
export default Cat;