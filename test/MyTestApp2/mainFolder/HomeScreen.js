import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SplashScreen from "./SplashScreen";
import MapPage from "./MapPage";
// import MapPage1 from "./MapPage1";
import CustomTiles from "./CustomTiles";

// 
const MainNavigator = createStackNavigator({
    // appcheck: { screen: appcheck, name: "appcheck" },
  
  SplashScreen: {
      screen: SplashScreen, navigationOptions: {
        headerShown: false,
      }
  },

  MapPage: { screen: MapPage, name: "MapPage" },
  // MapPage1: { screen: MapPage1, name: "MapPage1" },
  // CustomTiles: { screen: CustomTiles, name: "CustomTiles" },
});

const App = createAppContainer(MainNavigator);

export default App;