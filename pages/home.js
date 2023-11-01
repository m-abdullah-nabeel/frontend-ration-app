import React from "react";
import { SafeAreaView, StyleSheet, StatusBar, Button } from 'react-native';
import AnimalSelector from "../components/animalSelector";
import SpecieSelector from "../components/specieSelector";
import FixedFormulaSelector from "./fixedFormulaSelector";
import FixedFormulaInputs from "./LifeStagesFeeding";
import LifeStagesResults from "./lifeStageResults"
// SeasonAndMilk
import SeasonAndMilk from "./SeasonAndMilk"
import Fixed_Formulas from "./fixed_formulas";
import FixedStuffSelector from "./fixedFeedstuffs";
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
        <HomeStack.Screen name="Specie Selector" component={SpecieSelector} />
        <HomeStack.Screen name="Animal Selector" component={AnimalSelector} />
        <HomeStack.Screen name="Fixed Formula Selector" component={FixedFormulaSelector} />
        <HomeStack.Screen name="Fixed Formula Inputs" component={FixedFormulaInputs} />
        <HomeStack.Screen name="Life Stages Formulas" component={LifeStagesResults} />
        {/* Milk and Season */}
        <HomeStack.Screen name="Milk and Season" component={SeasonAndMilk} />

        <HomeStack.Screen name="Fixed Formula Display" component={Fixed_Formulas} />
        <HomeStack.Screen name="Fixed Feedstuffs" component={FixedStuffSelector} />
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
