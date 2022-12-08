import React from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Button } from 'react-native';
import AnimalSelector from "../components/animalSelector"
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator()

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeStack.Navigator>
        <HomeStack.Screen name="ChatFeed" component={AnimalSelector} />
        {/* <HomeStack.Screen name="ChatRoom" component={AnimalSelector} /> */}
      </HomeStack.Navigator>

        {/* <AnimalSelector navigation={navigation}/> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default Home;
