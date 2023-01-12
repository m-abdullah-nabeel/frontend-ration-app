import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./pages/home";
import Settings from "./pages/settings";
import Landing from './pages/landing';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();
const WelcomeStack = createStackNavigator()

const InnerComp = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgb(100, 10, 10)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'light',
          alignItems: 'center'
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Tab.Screen name="More" component={Settings} options={{ title: 'About' }} />
    </Tab.Navigator>
  )
}


const App = () => {
  return (
    <NavigationContainer>

      <WelcomeStack.Navigator initialRouteName="MenuScreen"
        screenOptions={{
          headerShown: false
        }}
      >
        <WelcomeStack.Screen name="Landing222" component={Landing} />
        <WelcomeStack.Screen name="Formulate" component={InnerComp} />
      </WelcomeStack.Navigator>


    </NavigationContainer>
  );
}

export default App;
