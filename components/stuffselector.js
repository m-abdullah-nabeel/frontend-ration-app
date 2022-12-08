import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar, Button } from "react-native";
import { FeedItem } from "./animalItem";

const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"]
    },
    {
      title: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"]
    },
    {
      title: "Drinks",
      data: ["Water", "Coke", "Beer"]
    },
    {
      title: "Desserts",
      data: ["Cheese Cake", "Ice Cream"]
    }
  ];
  
const StuffSelector = ({route, navigation}) => {
    const { animal } = route.params;
  
    return (
        <View>
            <Text>
                Select FeedStuffs
            </Text>

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

        </View>
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
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    }
  });
  
  