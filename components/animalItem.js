import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox";

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

const FeedItem = ({ title }) => (
    <View style={styles.item}>
        {/* <BouncyCheckbox/> */}
        <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        text={title}
        // textComponent={<Text>{title}</Text>}
        iconStyle={{ borderColor: "red" }}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={{
            textDecorationLine: "none",
        }}          
        // textStyle={{ fontFamily: "JosefinSans-Regular" }}
        // onPress={(isChecked: true) => {}}
        onPress={(isChecked) => {
            console.log(isChecked)
            if (isChecked) alert("adding " + title)
            if (!isChecked) alert("removing " + title)
        }}
        />

    </View>
);

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

export default Item;
export {FeedItem};
