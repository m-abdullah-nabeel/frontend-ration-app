import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, SectionList, StatusBar, Button } from "react-native";
import { FeedItem } from "./animalItem";

const DATA = [
  {
    title: "Protein Sources",
    data: ["csc", "Berseem Fodder", "Maize Fodder", "Maize Silage"]
  },
  {
    title: "Enery Sources Sources",
    data: ["Oat Fodder", "Sugarcane Fodder", "Sugarcane Tops"]
  },
  {
    title: "Fat Sources",
    data: ["Mott grass", "Rye Grass", "Maize Cobs"]
  }
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

      {/* <Button
        title="Home"
        onPress={() => navigation.goBack()}
      /> */}

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

