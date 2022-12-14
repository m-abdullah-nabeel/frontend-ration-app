import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, SectionList, StatusBar, Button } from "react-native";
import { FeedItem } from "./animalItem";

const DATA = [
  {
    title: "Roughages",
    data: [
      "Barseem",
      "Maize",
      "Oat (Jai)",
      "Mustard (Sarson)",
      "Maize Silage",
      "Sugarcane",
      "Sugarcane tops",
      "Mott grass",
      "Johnson grass (Baru)"
    ]
  },
  {
    title: "Dry Roughages & Crop residues",
    data: [
      "Wheat Straw (toori)",
      "Rice Straw (Parali)",
      "Millet stovers",
      "Maize stovers",
      "Sorghum stovers",
      "Corn cobs",
      "Rice Husk (Phakk)"
    ]
  },
  {
    title: "Energy Sources",
    data: [
      "Maize grain",
      "Wheat grain",
      "Millet grain",
      "Mamni",
      "Maize bran",
      "Wheat Bran (Chokar)",
      "Rice polish",
      "Sugarbeet pulp",
      "Apple pomace",
      "Citrus waste",
      "Channa Karra",
      "Massar Karra",
      "Mung Karra",
      "Dry dates",
      "Potato"
    ]
  }, {
    title: "Protein sources",
    data: [
      "Cottonseed cake (Khal)",
      "Soybean meal",
      "Canola meal",
      "Rapeseed meal",
      "Maize gluten meal 30%",
      "Maize gluten meal 60%",
      "Palm kernel cake",
      "Sunflower meal",
      "Guar meal"
    ]
  },
];

const StuffSelector = ({ route, navigation }) => {
  const [feedstuff, setFeedstuff] = useState([]);
  const { animal } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'rgb(10, 100, 10)', borderRadius: 50, padding: 10, marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 32, paddingLeft: 15, color: 'white' }}>Select FeedStuffs</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 15, color: 'white' }}>Your Animal: {animal}</Text>
      </View>

      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <FeedItem title={item} feedstuff={feedstuff} setFeedstuff={setFeedstuff} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />

      <Button
        onPress={() => {
          navigation.navigate('Details', { stock: feedstuff });
        }}
        title="Next"
        color="rgb(10, 100, 10)"
        style={{ backgroundColor: 'rgb(10, 100, 10)', borderRadius: 50, padding: 20 }}
        accessibilityLabel="Next to detailed"
      />

    </SafeAreaView>
  )
}

export default StuffSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 24,
    fontWeight: '500',
    borderRadius: 50,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: 'rgb(200, 200, 200)'
  },
  title: {
    fontSize: 24
  }
});

