import React from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Item from "./animalItem";

const ANIMALS = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Cattle / Buffalo',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Sheep / Dog',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Poultry Birds',
    },
  ];

const AnimalSelector = () => {
    return (
        <View>
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
            <View style={{width: "100%"}}>
                <Text style={styles.header}>Select Animal for feed formulation</Text>
            </View>

            <FlatList data={ANIMALS} renderItem={({item})=>(<Item name={item.title}></Item>)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontWeight: '900',
        fontSize: 32,
        padding: 20,
        // width: "60%",
        backgroundColor: "beige",
        borderWidth: 5,
    }
  });
  
  
export default AnimalSelector;