import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./pages/home";
import Settings from "./pages/settings";
import Landing from './pages/landing';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import 'react-native-gesture-handler';

// redux
import { Store } from "./redux/store/configureStore";
import { Provider } from "react-redux";


const Tab = createBottomTabNavigator();
const WelcomeStack = createStackNavigator()

const InnerComp = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: 'rgb(100, 10, 10)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'light',
          alignItems: 'center'
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          }
          else
            if (route.name === 'More') {
              iconName = focused
                ? 'menu'
                : 'menu-outline';
            }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'rgb(100, 60, 1)',
        tabBarInactiveTintColor: 'gray',

      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Tab.Screen name="More" component={Settings} options={{ title: 'About' }} />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <WelcomeStack.Navigator initialRouteName="MenuScreen"
          screenOptions={{
            headerShown: false
          }}
        >
          <WelcomeStack.Screen name="Landing" component={Landing} />
          <WelcomeStack.Screen name="Formulate" component={InnerComp} />
        </WelcomeStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
