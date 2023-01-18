import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native"

const MenuScreen = ({ navigation }) => {
    return (
        <View style={{
            flex: 1,
        }}>
            <View style={{ paddingBottom: 10 }} >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Animal Selector');
                    }}
                >
                    <View style={{
                        backgroundColor: 'rgb(10, 100, 0)', borderRadius: 50, marginTop: 10,
                        alignContent: "center", justifyContent: 'center',
                    }}>

                        <Text style={{
                            fontSize: 24, fontWeight: 'bold',
                            paddingTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15,
                            color: 'white'
                        }}>Formulate your feed</Text>
                    </View>
                </TouchableOpacity>
            </View >
            <View style={{
                backgroundColor: 'rgba(10, 100, 0, 0.7)', borderRadius: 50, marginTop: 90,
                alignContent: "center", justifyContent: 'center',
            }}>
                <Text style={{
                    fontSize: 18, fontWeight: 'bold',
                    paddingTop: 15, paddingLeft: 15, paddingRight: 15,
                    color: 'white'
                }}>Want to get summer feed formula?</Text>
                <Text style={{
                    fontSize: 12,
                    paddingBottom: 15, paddingLeft: 20, paddingRight: 15,
                    color: 'white'
                }}>Coming Soon</Text>
            </View>
            <View style={{
                backgroundColor: 'rgba(10, 100, 0, 0.7)', borderRadius: 50, marginTop: 10,
                alignContent: "center", justifyContent: 'center',
            }}>
                <Text style={{
                    fontSize: 18, fontWeight: 'bold',
                    paddingTop: 15, paddingLeft: 15, paddingRight: 15,
                    color: 'white'
                }}>Want to get winter feed formula?</Text>
                <Text style={{
                    fontSize: 12,
                    paddingBottom: 15, paddingLeft: 20, paddingRight: 15,
                    color: 'white'
                }}>Coming Soon</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
                <Image
                    style={{ width: 100, height: 45 }}
                    source={require('../assets/uvas-big.png')}
                />
            </View>
        </View >
    )
}

export default MenuScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        opacity: 0.5,
        width: 200,
        height: 90
    },
    text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
    }
});
