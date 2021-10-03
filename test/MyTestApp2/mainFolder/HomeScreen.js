import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SplashScreen from "./SplashScreen";
// import MapPage from "./MapPage";
import MapPage4 from "./MapPage4";
import CustomTiles from "./CustomTiles";

// 
const MainNavigator = createStackNavigator({
    // appcheck: { screen: appcheck, name: "appcheck" },

  SplashScreen: {
      screen: SplashScreen, navigationOptions: {
        headerShown: false,
      }
  },

  // MapPage: { screen: MapPage, name: "MapPage" },
  MapPage4: { screen: MapPage4, name: "MapPage4" },
  // CustomTiles: { screen: CustomTiles, name: "CustomTiles" },
});

const App = createAppContainer(MainNavigator);

export default App;