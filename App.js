import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./pages/home";
import Settings from "./pages/settings";
import Landing from './pages/landing';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
        {/* load this app first, then if every thing goes well load, other pages below */}
        <Tab.Screen name="Welcome to UVA-Gro" component={Landing} />
        <Tab.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        <Tab.Screen name="More" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
