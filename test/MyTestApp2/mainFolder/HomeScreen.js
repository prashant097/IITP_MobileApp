import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SplashScreen from "./SplashScreen";
// import MapPage from "./MapPage";
// import MapPage21 from "./MapPage21";
import RTT from "./RTT";

// 
const MainNavigator = createStackNavigator({
    // appcheck: { screen: appcheck, name: "appcheck" },

  SplashScreen: {
      screen: SplashScreen, navigationOptions: {
        headerShown: false,
      }
  },

  // MapPage: { screen: MapPage, name: "MapPage" },
  // MapPage21: { screen: MapPage21, name: "MapPage21" },
  RTT: {screen: RTT, name: "RTT"},
});

const App = createAppContainer(MainNavigator);

export default App;