import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Item from "./animalItem";

const ANIMALS = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Cattle / Buffalo',
    // image: 'goat',
    image: '../assets/animals/cow.png'

  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Sheep / Goat',
    image: 'goat'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Poultry',
    image: 'goat'
  },
];

const AnimalSelector = ({ navigation }) => {
  return (
    <View>
      <View style={{}}>
        <Text style={{
          backgroundColor: 'rgb(0, 100, 0)', color: 'white', borderRadius: 50,
          paddingLeft: 20, paddingTop: 15, paddingBottom: 15, paddingRight: 20,
          fontSize: 24, fontWeight: 'bold'
        }}>
          Select Your Animal
        </Text>
      </View>
      <View style={{
        flexDirection: 'row', margin: 10, flexWrap: 'wrap', alignItems: 'center', paddingLeft: 20
      }}>
        <TouchableOpacity onPress={() => { navigation.navigate('Stuff Selector', { animal: 'Cattle', }); }}>
          <View style={styles.animal}>
            <Image style={styles.image} source={require('../assets/animals/cow.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Stuff Selector', { animal: 'Buffalo', }); }}>
          <View style={styles.animal}>
            <Image style={styles.image} source={require('../assets/animals/buffalo.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Stuff Selector', { animal: 'Goat', }); }}>
          <View style={styles.animal}>
            <Image style={styles.image} source={require('../assets/animals/goat.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Stuff Selector', { animal: 'Sheep', }); }}>
          <View style={styles.animal}>
            <Image style={styles.image} source={require('../assets/animals/sheep.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Stuff Selector', { animal: 'Camel', }); }}>
          <View style={styles.animal}>
            <Image style={styles.image} source={require('../assets/animals/camel.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Stuff Selector', { animal: 'Horse', }); }}>
          <View style={styles.animal}>
            <Image style={styles.image} source={require('../assets/animals/horse.png')} />
          </View>
        </TouchableOpacity>


      </View>

      {/* <FlatList data={ANIMALS} renderItem={({ item }) => (<Item navigation={navigation} name={item.title} image={item.image}></Item>)} /> */}
    </View >
  )
}

export default AnimalSelector;


const styles = StyleSheet.create({
  animal: {
    backgroundColor: "rgba(25, 0, 200, .5)",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 100,

  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 10,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 14
  }

})
