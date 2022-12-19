import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
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
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Text style={{
          backgroundColor: 'rgb(0, 100, 0)', color: 'white', borderRadius: 50,
          paddingLeft: 20, paddingTop: 15, paddingBottom: 15, paddingRight: 20,
          fontSize: 24, fontWeight: 'bold'
        }}>
          Select Your Animal
        </Text>
      </View>
      <FlatList data={ANIMALS} renderItem={({ item }) => (<Item navigation={navigation} name={item.title} image={item.image}></Item>)} />

      <View>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('Stuff Selector', {
              animal: 'name',
            });
          }}
        >
          <View style={{
            backgroundColor: "rgba(25, 0, 200, .5)",
            borderRadius: 20,
            padding: 20,
            margin: 10,
            borderColor: 'black',
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

          }}>
            <Image
              source={require('../assets/animals/cow.png')}
            />
            <Text>{'name'}</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </View >
  )
}

export default AnimalSelector;