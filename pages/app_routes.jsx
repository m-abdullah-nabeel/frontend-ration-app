import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// App Home
import MenuScreen from "./app_home";
// Premium Least Cost Feed Formulation
import PremAnimalInputs from "./lcff-premium/plcff_animal_inputs";
import PremNutrientRequirements from "./lcff-premium/plcff_nutrient_req";
import PremIngredientInputs from "./lcff-premium/plcff_feedstuffs";
import PremResults from "./lcff-premium/plcff_results";
// Fixed Formulas Home
import FixedFormulasHome from "./fixed/home_fixed_formula";
// Fixed Formulas Stage-Based
import StageSelector from "./fixed/stages_selector";
import StageInputs from "./fixed/stages_inputs";
import StageResults from "./fixed/stage_results"
// Fixed Formulas Season-Based
import SeasonAndMilk from "./fixed/season_inputs"
import SeasonResults from "./fixed/season_results";
// import FixedStuffSelector from "./fixed/fixed_feedstuff_unknown";

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
        <HomeStack.Screen name="Specie Selector" component={FixedFormulasHome} />
        {/* Premium Feed Formulation */}
        <HomeStack.Screen name="Prem Animal Inputs" component={PremAnimalInputs} />
        <HomeStack.Screen name="Prem Nutrient Requirements" component={PremNutrientRequirements} />
        <HomeStack.Screen name="Prem Ingredient Inputs" component={PremIngredientInputs} />
        <HomeStack.Screen name="Prem Results" component={PremResults} />
        {/* Stage-Based Formulae */}
        <HomeStack.Screen name="Fixed Formula Selector" component={StageSelector} />
        <HomeStack.Screen name="Fixed Formula Inputs" component={StageInputs} />
        <HomeStack.Screen name="Life Stages Formulas" component={StageResults} />
        {/* Season-Based Formulae */}
        <HomeStack.Screen name="Milk and Season" component={SeasonAndMilk} />
        <HomeStack.Screen name="Fixed Formula Display" component={SeasonResults} />
        {/* <HomeStack.Screen name="Fixed Feedstuffs" component={FixedStuffSelector} /> */}
      </HomeStack.Navigator>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: (StatusBar.currentHeight)/3 || 0,
  },
});

export default Home;
