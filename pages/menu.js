import React from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';
// import Item from "./animalItem";
import { TouchableOpacity } from "react-native"

const MenuScreen = ({ navigation }) => {
    return (
        <View>
            {/* <View style={{ width: "95%" }}>
                <Text style={styles.header}>Select Operation Type</Text>
            </View> */}

            <View style={styles.row}>
                <TouchableOpacity style={styles.animal}
                    onPress={() => {
                        navigation.navigate('Animal Selector');
                    }}
                >
                    <View>
                        {/* <Text>{'image of animal'}</Text> */}
                        {/* <Text>{'name'}</Text> */}
                        <Text>name</Text>
                    </View>
                </TouchableOpacity>

                <View style={[styles.animal, styles.disabled, { flex: 3 }]}>
                    <Text>{'name'}</Text>
                </View>

            </View>

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
    },
    animal: {
        backgroundColor: "rgba(195, 50, 250, .5)",
        borderRadius: 20,
        padding: 20,
        margin: 10,
        borderColor: 'black',
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '50%',
        height: 150

    },
    disabled: {
        opacity: .5
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap'
    }
});


export default MenuScreen;