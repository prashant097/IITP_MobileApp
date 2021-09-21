import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SplashScreen from "./SplashScreen";

const MainNavigator = createStackNavigator({
    // appcheck: { screen: appcheck, name: "appcheck" },
  
    SplashScreen: {
      screen: SplashScreen, navigationOptions: {
        headerShown: false,
    }
}

});

const App = createAppContainer(MainNavigator);

export default App;