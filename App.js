import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./pages/home";
import DetailsScreen from "./pages/detail";
import Settings from "./pages/settings";
import Landing from './pages/landing';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}      
      >
        {/* load this app first, then if every thing goes well load, other pages below */}
        <Tab.Screen name="Landing" component={Landing} />

        {/* <Tab.Screen name="Details" component={DetailsScreen}/> */}
        <Tab.Screen name="Home" component={Home} options={{ title: 'Feed Formulation'}}/>
        <Tab.Screen name="Settings" component={Settings}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
