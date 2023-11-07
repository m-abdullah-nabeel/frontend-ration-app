import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./pages/home";
import Settings from "./pages/settings";
import Landing from './pages/landing';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// fonts
import { useFonts } from 'expo-font';

import 'react-native-gesture-handler';

// redux
import { Store } from "./redux/store/configureStore";
import { Provider } from "react-redux";
import { SafeAreaView, View } from "react-native";
import { StatusBar } from 'expo-status-bar';

import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

const Tab = createBottomTabNavigator();
const WelcomeStack = createStackNavigator()

const InnerComp = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerStyle: {
          // backgroundColor: 'rgba(153, 20, 10, 0.8)',
          backgroundColor: 'rgba(10, 120, 10, 1)',
          // borderColor: 'yellow', borderWidth: 5
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
        // headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Tab.Screen name="More" component={Settings} options={{ title: 'About' }} />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <>
      <StatusBar style="light" />

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

    </>
  );
}

export default App;
