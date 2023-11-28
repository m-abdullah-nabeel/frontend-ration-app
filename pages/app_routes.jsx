import React from "react";
import { SafeAreaView, StyleSheet, StatusBar, Button } from 'react-native';
import AnimalSelector from "./lcff/lcff_animal_inputs";
import SpecieSelector from "./fixed/home_fixed_formula";
import FixedFormulaSelector from "./fixed/stages_selector";
import FixedFormulaInputs from "./fixed/stages_inputs";
import LifeStagesResults from "./fixed/stage_results"
// SeasonAndMilk
import SeasonAndMilk from "./fixed/season_inputs"
import Fixed_Formulas from "./fixed/season_results";
import FixedStuffSelector from "./fixed/fixed_feedstuff_unknown";
import StuffSelector from "./lcff/lcff_feedstuffs";
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from "./lcff/lcff_results";
import MenuScreen from "./app_home";

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
        {/* <HomeStack.Screen name="Fixed Feedstuffs" component={FixedStuffSelector} /> */}
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
