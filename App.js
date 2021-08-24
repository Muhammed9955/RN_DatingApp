// import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import Register from "./screens/register";
import Login from "./screens/Login";
import Home from "./screens/Home";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";
import { auth } from "./firebase";

const Stack = createNativeStackNavigator();

export default function App() {
  const globalScreenOptions = {
    headerStyle: { backgroundColor: "green" },
    headerTintStyle: { color: "white" },
    headerTintColor: "white",
    headerShown: true,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Home"
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ header: () => null }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
