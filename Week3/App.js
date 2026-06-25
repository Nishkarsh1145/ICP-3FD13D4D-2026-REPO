import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { LocationProvider } from "./src/context/LocationContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <LocationProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </LocationProvider>
  );
}