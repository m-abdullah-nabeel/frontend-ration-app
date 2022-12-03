import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const Item = ({ navigation, name }) => {
    return (
        <TouchableOpacity 
            onPress={() => {
            navigation.navigate('Details', {
                animal: name,
            });        
            }}
        >
            <View style={styles.animal}>
                <Text>{name}</Text>
                {/* <Text>{'name'}</Text> */}
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
        
    }
})

export default Item;
