import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SplashScreen from "./SplashScreen";
import MapPage from "./MapPage";
// 
const MainNavigator = createStackNavigator({
    // appcheck: { screen: appcheck, name: "appcheck" },
  
  SplashScreen: {
      screen: SplashScreen, navigationOptions: {
        headerShown: false,
      }
  },

  MapPage: { screen: MapPage, name: "MapPage" },
});

const App = createAppContainer(MainNavigator);

export default App;