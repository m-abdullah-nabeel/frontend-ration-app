import React from "react";
import { SafeAreaView, StyleSheet, StatusBar, Button } from 'react-native';
import AnimalSelector from "../components/animalSelector";
import FixedFormulaSelector from "./fixedFormulaSelector";
import Fixed_Formulas from "./fixed_formulas";
import StuffSelector from "../components/stuffselector";
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from "./detail";
import MenuScreen from "./menu";

const HomeStack = createStackNavigator()

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeStack.Navigator initialRouteName="MenuScreen"
        screenOptions={{
          headerShown: false
        }}
      >
        <HomeStack.Screen name="Menu Screen" component={MenuScreen} />
        <HomeStack.Screen name="Animal Selector" component={AnimalSelector} />
        <HomeStack.Screen name="Fixed Formula Selector" component={FixedFormulaSelector} />
        <HomeStack.Screen name="Fixed Formula Display" component={Fixed_Formulas} />
        <HomeStack.Screen name="Details" component={DetailsScreen} />
        <HomeStack.Screen name="Stuff Selector" navigation={navigation} component={StuffSelector} />
      </HomeStack.Navigator>

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
