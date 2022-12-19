import React from "react";
import { View, Text } from 'react-native';
// import Item from "./animalItem";
import { TouchableOpacity } from "react-native"

const MenuScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingBottom: 10 }} >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Animal Selector');
                    }}
                >
                    <View style={{
                        backgroundColor: 'rgb(110, 10, 10)', height: '90%', borderRadius: 50,
                        alignContent: "center", justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontSize: 32, fontWeight: 'bold',
                            paddingTop: 20, paddingBottom: 20, paddingLeft: 15, paddingRight: 15,
                            color: 'white'
                        }}>Formulate your feed</Text>
                    </View>
                </TouchableOpacity>
            </View >
            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{
                    width: 100, backgroundColor: 'rgb(100, 10, 10)', color: 'white', borderRadius: 50,
                    height: 100, alignItems: 'center', justifyContent: 'center', margin: 5, opacity: .6
                }}>
                    <Text style={{ color: 'white' }}>Summer Formula</Text>
                </View>
                <View style={{
                    width: 100, backgroundColor: 'rgb(100, 10, 10)', color: 'white', borderRadius: 50,
                    height: 100, alignItems: 'center', justifyContent: 'center', margin: 5, opacity: .6
                }}>
                    <Text style={{ color: 'white' }}>Winter Formula</Text>
                </View>
            </View>

        </View >
    )
}

export default MenuScreen;