import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import AnimalSelector from "../components/animalSelector"


const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
        <AnimalSelector/>
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
