import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const Item = ({ navigation, name }) => {
    return (
        <TouchableOpacity 
            onPress={() => {
            navigation.navigate('Stuff Selector', {
                animal: name,
            });        
            }}
        >
            <View style={styles.animal}>
                {/* <Text>{'image of animal'}</Text> */}
                <Text>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    animal: {
        backgroundColor: "rgba(25, 0, 200, .5)",
        borderRadius: 20,
        padding: 20,
        margin: 10,
        borderColor: 'black',
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    title: {
        fontSize: 24
    }
  
})
  
  

const FeedItem = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  
export default Item;
export {FeedItem};