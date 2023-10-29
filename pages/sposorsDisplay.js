import React from "react";
import { View, Text, Image, StyleSheet, Linking, TextInput, SafeAreaView } from 'react-native';
import { TouchableOpacity } from "react-native"

const SponsorsDisplay = () => {
    const url_uvas = "https://uvas.edu.pk";
    const url_arass = "https://arass.org/";

    return (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View style={{
                backgroundColor: 'rgb(10, 100, 10)',
                width: '100%', height: 50,
                flexDirection: 'row', alignItems: "center", justifyContent: 'space-around',
                borderColor: "black", borderWidth: 1,
            }}>

                <TouchableOpacity
                    onPress={async () => await Linking.openURL(url_arass)}
                >
                    <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 150, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                        <Image
                            style={{ width: 50, height: 27 }}
                            source={require('../assets/arass.png')}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={async () => await Linking.openURL(url_uvas)}
                >
                    <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 150, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                        <Image
                            style={{ width: 50, height: 23 }}
                            source={require('../assets/uvas-big.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SponsorsDisplay