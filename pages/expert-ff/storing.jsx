import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Alert, Modal, Pressable } from "react-native";
import { Avatar, Button, Card } from 'react-native-paper';
// import { Avatar, Button, Card, Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { resetAnimalInput, selectFeedFormulationData } from "../../redux/animalInputSlice";
// Translation
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import { setSpecies as globalSpecies, selectSpecies } from "../../redux/speciesSlice"; 

const AnimalData = [
  { name: 'Cattle', imagePath: require('../../assets/animals/cow.png') },
  { name: 'Buffalo', imagePath: require('../../assets/animals/buffalo.png') },
  { name: 'Beef', imagePath: require('../../assets/animals/beef.png'), comingSoon: true },
  { name: 'Goat', imagePath: require('../../assets/animals/goat.png'), comingSoon: true },
  { name: 'Sheep', imagePath: require('../../assets/animals/sheep.png'), comingSoon: true },
  { name: 'Camel', imagePath: require('../../assets/animals/camel.png'), comingSoon: true },
  { name: 'Horse', imagePath: require('../../assets/animals/horse.png'), comingSoon: true },
  { name: 'Donkey', imagePath: require('../../assets/animals/donkey.png'), comingSoon: true },
  { name: 'Cat', imagePath: require('../../assets/animals/cat.png'), comingSoon: true },
  { name: 'Dog', imagePath: require('../../assets/animals/dog.png'), comingSoon: true },
  { name: 'Chicken', imagePath: require('../../assets/animals/cock.png'), comingSoon: true },
];

const ExpertHome = ({ navigation }) => {
  const { t } = useTranslation();
  const selectedSpecies = useSelector(selectSpecies);
  const selectedFeedData = useSelector(selectFeedFormulationData)

  return (
    <ScrollView>
      <View
        style={{
          // flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
        }}>
        
        <RequirementUnit />
        <RequirementUnit />
        <RequirementUnit />
        <RequirementUnit />
        <RequirementUnit />
        <RequirementUnit />
        <RequirementUnit />
        <RequirementUnit />
      </View>



    </ScrollView >
  )
}

export default ExpertHome;

const RequirementUnit = ({ navigation, t, link, titleText, subtitleText, imageSource, descText }) => {
    return (
      <Card 
        mode="outlined"
        style={{
          marginVertical: 8,
          marginHorizontal: 0, padding: 0,
          // borderRadius: 10,
          // elevation: 1,
          backgroundColor: "rgba(10, 200, 10, 0)"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(link);
          }}
        >
            <View style={{ 
                height: 125,
                flex: 1, flexDirection: "row", justifyContent: "space-between",
            }}>
                <View style={{
                    flexDirection: "column", 
                    justifyContent: "center",
                    padding: 20,
                    flex: 6
                }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 24,
                            fontWeight: 'bold',
                        }}
                        >
                        {/* {t(titleText)} */}
                        Hello
                    </Text>
                    {subtitleText && (
                    <Text
                        style={{
                            color: 'black', // Change the color based on your design
                            fontSize: 14,
                            marginBottom: descText ? 8 : 0,
                            // alignSelf: "center"
                        }}
                    >
                      Hi
                        {/* {t(subtitleText)} */}
                    </Text>
                    )}
                </View>

                <View style={{
                    flex: 4, 
                    // backgroundColor: "red"
                }}>
                    {imageSource && (
                    <Card.Cover
                        source={imageSource}
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: 'cover',
                        }}
                    />
                    )}
                </View>

          </View>
  
          <View style={{ }}>
            {descText && (
              <Text
                style={{
                    padding: 12,
                  color: 'black', // Change the color based on your design
                  fontSize: 14,
                }}
              >
                Hello 2
                {/* {t(descText)} */}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </Card>
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
    top: 0,
    bottom: 0, // added to cover
    left: 0,
    right: 0,
    padding: 5,
    // backgroundColor: 'rgba(10, 140, 10, 0.7)',
    backgroundColor: 'rgba(140, 140, 140, 0.4)',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameOverlay: {
    position: 'absolute',
    zIndex: 100,
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
    backgroundColor: "black",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nameText: {
    color: 'white',  
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
