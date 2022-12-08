import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, SectionList, StatusBar, Button } from "react-native";
import { FeedItem } from "./animalItem";

const DATA = [
    {
      title: "Protein Sources",
      data: ["Soya Bean", "CG60", "Soyabean Meal", "Corn Meal", "Cakes, khal", "Quality Protein Cake", "Fishmeal"]
    },
    {
      title: "Enery Sources Sources",
      data: ["Molasses", "Barley", "Corn", "Oats", "Rics", "Sorghum", "Rye", "Wheat"]
    },
    {
      title: "Fat Sources",
      data: ["Water", "Coke", "Beer"]
    },
    {
      title: "Vitamins and Minerals",
      data: ["Cheese Cake", "Ice Cream"]
    }
  ];
  
const StuffSelector = ({route, navigation}) => {
    const { animal } = route.params;
  
    return (
        <ScrollView>
            <Text>
                Select FeedStuffs
            </Text>


            <Text>Animal: {JSON.stringify(animal)}</Text>

            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <FeedItem title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />


            <Button
            onPress={() => {
                navigation.navigate('Details');        
            }}
            title="Go"
            color="#841584"
            accessibilityLabel="Go to sibling"
            />

            <Text>Animal: {JSON.stringify(animal)}</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.goBack()}
            />

        </ScrollView>
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
      fontSize: 32,
      backgroundColor: "#fff",
      fontWeight: 'bold'
    },
    title: {
      fontSize: 24
    }
  });
  
  