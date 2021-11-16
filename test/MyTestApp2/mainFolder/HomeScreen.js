// replacing const as var

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SplashScreen from "./SplashScreen";
// import MapPage from "./MapPage";
// import MapPage2 from "./MapPage2";
import RTT4 from "./RTT4";

// 
const MainNavigator = createStackNavigator({
    // appcheck: { screen: appcheck, name: "appcheck" },

  SplashScreen: {
      screen: SplashScreen, navigationOptions: {
        headerShown: false,
      }
  },

  // MapPage: { screen: MapPage, name: "MapPage" },
  // MapPage2: { screen: MapPage2, name: "MapPage2" },
  RTT4: {screen: RTT4, name: "RTT4"},
});

const App = createAppContainer(MainNavigator);

export default App;