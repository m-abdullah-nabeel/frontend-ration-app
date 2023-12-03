import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Alert, Modal, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Translation
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import { setSpecies as globalSpecies, selectSpecies } from "../../redux/speciesSlice"; 

const AnimalData = [
  { name: 'Cattle', imagePath: require('../../assets/animals/cow.png') },
  { name: 'Buffalo', imagePath: require('../../assets/animals/buffalo.png') },
  { name: 'Goat', imagePath: require('../../assets/animals/goat.png'), comingSoon: true },
  { name: 'Sheep', imagePath: require('../../assets/animals/sheep.png'), comingSoon: true },
  { name: 'Camel', imagePath: require('../../assets/animals/camel.png'), comingSoon: true },
  { name: 'Horse', imagePath: require('../../assets/animals/horse.png'), comingSoon: true },
  { name: 'Donkey', imagePath: require('../../assets/animals/donkey.png'), comingSoon: true },
  { name: 'Cat', imagePath: require('../../assets/animals/cat.png'), comingSoon: true },
  { name: 'Dog', imagePath: require('../../assets/animals/dog.png'), comingSoon: true },
  { name: 'Chicken', imagePath: require('../../assets/animals/cock.png'), comingSoon: true },
];

const PremAnimalInputs = ({ navigation }) => {
  const { t } = useTranslation();
  const selectedSpecies = useSelector(selectSpecies);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerText}>{t('select animal header')}</Text>
      </View>
      {/* <Text>Your Selected Animal is {selectedSpecies}</Text> */}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
        {AnimalData.map((animal, index) => (
          <AnimalComponent key={index} animal={animal} />
        ))}
      </View>

    </ScrollView >
  )
}

export default PremAnimalInputs;

const AnimalComponent = ({ animal }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAnimalPress = () => {
    if (!animal.comingSoon) {
      dispatch(globalSpecies(animal.name));
      navigation.navigate('Prem Nutrient Requirements');
    }
  };

  return (
    <View style={styles.animal}>
      <TouchableOpacity onPress={handleAnimalPress}>
        <Image style={styles.image} source={animal.imagePath} />
      </TouchableOpacity>
      {animal.comingSoon && (
        <View style={styles.comingSoonOverlay}>
          <Text style={styles.comingSoonText}>{t('coming soon')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(0, 100, 0)', // Deep Green
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    elevation: 5,
  },
  headerText: {
    color: '#fff', 
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    // fontStyle: 'italic',
    // textTransform: 'uppercase',
  },
  animal: {
    borderColor: 'rgb(30, 130, 30)',
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    width: '47%',
    height: 150,
    marginColor: 'pink'
  },
  image: {
    width: 130,
    height: 90,
    borderRadius: 10,
  },
  comingSoonOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    padding: 5,
    backgroundColor: 'rgba(10, 140, 10, 0.7)',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
