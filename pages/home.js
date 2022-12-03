import React from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Button } from 'react-native';
import AnimalSelector from "../components/animalSelector"


const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <AnimalSelector navigation={navigation}/>
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
