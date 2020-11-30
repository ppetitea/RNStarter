import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREEN_ADMIN } from "../../constants/navigation";
import AdminScreen from "../../screens/AdminScreen/AdminScreen";

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={SCREEN_ADMIN} component={AdminScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
