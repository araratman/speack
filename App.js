import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Button, Text } from "react-native";
import MyDrawer from "./app/tabs/drower/_layout";
import _RNGestureHandlerModule from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();


export default function AnimatedStyleUpdateExample() {


  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
