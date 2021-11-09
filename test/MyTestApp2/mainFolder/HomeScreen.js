import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SplashScreen from "./SplashScreen";
// import MapPage from "./MapPage";
// import MapPage2 from "./MapPage2";
import RTT3 from "./RTT3";

// 
const MainNavigator = createStackNavigator({
    // appcheck: { screen: appcheck, name: "appcheck" },

  SplashScreen: {
      screen: SplashScreen, navigationOptions: {
        headerShown: false,
      }
  },

  // MapPage: { screen: MapPage, name: "MapPage" },
  // MapPage21: { screen: MapPage2, name: "MapPage2" },
  RTT3: {screen: RTT3, name: "RTT3"},
});

const App = createAppContainer(MainNavigator);

export default App;