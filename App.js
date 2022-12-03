import React, { useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableHighlight, Image } from 'react-native';

const ANIMALS = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Cattle/Buffalo',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Sheep/Dog',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Poultry',
  },
];


const Species = ({ title }) => {
  return (
    <TouchableHighlight style={styles.item} onPress={()=>alert()}>
      <View style={styles.button}>
        <Image
          // style={styles.logo}
          source={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
          }}
        />


        <Text>{title}</Text>
      </View>
    </TouchableHighlight>
);
}

const App = () => {
  const renderItem = ({ item }) => (
    <Species title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>Select Animal</Text>
      <FlatList
        data={ANIMALS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;