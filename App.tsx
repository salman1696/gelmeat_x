import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "./src/routes";
import {
  initialConfig,
  navigationRef,
  persistor,
  store,
} from "./src/shared/exporter";
import firebaseService from "./src/shared/services/notification/firebase";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  "Non-serializable values were found",
]);



console.disableYellowBox = true;

const App = () => {
  useEffect(() => {
    initialConfig();
    firebaseService.init()
  }, []);


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <Routes />
            <Toast position={"bottom"} />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
