import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SplashScreen from "./SplashScreen";
// import MapPage from "./MapPage";
// import MapPage3 from "./MapPage3";
import CustomTiles from "./CustomTiles";

// 
const MainNavigator = createStackNavigator({
    // appcheck: { screen: appcheck, name: "appcheck" },
    // MapPage3: { screen: MapPage3, name: "MapPage3" },

  SplashScreen: {
      screen: SplashScreen, navigationOptions: {
        headerShown: false,
      }
  },

  // MapPage: { screen: MapPage, name: "MapPage" },
  // CustomTiles: { screen: CustomTiles, name: "CustomTiles" },
});

const App = createAppContainer(MainNavigator);

export default App;