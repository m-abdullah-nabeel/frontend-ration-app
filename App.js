import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./pages/home";
import Settings from "./pages/settings";
import Landing from './pages/landing';
// redux
import store from './app/store'
import { Provider } from 'react-redux'

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
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
            <Tab.Screen name="Home" component={Home} options={{ title: 'Feed Formulation'}}/>
            <Tab.Screen name="Settings" component={Settings}/>
        </Tab.Navigator>
      </NavigationContainer>


    </Provider>
  );
}

export default App;
