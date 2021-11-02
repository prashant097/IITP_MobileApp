import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SplashScreen from "./SplashScreen";
// import MapPage from "./MapPage";
// import MapPage2 from "./MapPage2";
import RTT2 from "./RTT2";

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
  RTT2: {screen: RTT2, name: "RTT2"},
});

const App = createAppContainer(MainNavigator);

export default App;