import React from "react";
import { View, ScrollView, Image, StyleSheet, Linking, TextInput, SafeAreaView } from 'react-native';
import { TouchableOpacity } from "react-native"
import { useTranslation } from 'react-i18next';
import SponsorsDisplay from "./sposorsDisplay"

import { Avatar, Button, Card, Text } from 'react-native-paper';

const MenuScreen = ({ navigation }) => {
    const { t } = useTranslation();

    // const url_uvas = "https://uvas.edu.pk";
    // const url_arass = "https://arass.org/";

    return (
        <ScrollView style={{ flex: 1 }}>
            {/* <View style={{ flex: 1, justifyContent: "center", padding: 2 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Specie Selector') }}>
                    <View style={{ height: '100%', }}>
                        <Image source={require("../assets/images/winterFeed.jpg")}
                            style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                height: '100%', width: "100%", opacity: 0.9,
                                borderRadius: 10,
                            }}
                        />

                        <View style={{
                            position: 'absolute', top: 50, left: 50, right: 50, bottom: 50,
                            backgroundColor: "rgba(10, 100, 10, 0.6)", borderRadius: 5,
                            flex: 1, alignItems: "center", justifyContent: "center",
                        }}>
                            <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold', fontSize: 28 }}>{t('Get Fixed Formulas')}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View> */}

            <Card theme={{ colors: { primary: 'green' } }} style={{marginVertical:2}} mode="contained">
                <TouchableOpacity onPress={() => { navigation.navigate('Specie Selector') }}>
                    <Card.Cover 
                    source={require("../assets/images/winterFeed.jpg")}
                    // style={{
                    //     position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    //     height: '100%', width: "100%", opacity: 0.9,
                    //     borderRadius: 10,
                    // }}
                    />

                    <View style={{
                        position: 'absolute', top: 50, left: 50, right: 50, bottom: 50,
                        backgroundColor: "rgba(10, 100, 10, 0.6)", borderRadius: 5,
                        flex: 1, alignItems: "center", justifyContent: "center",
                    }}>
                        <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold', fontSize: 28 }}>{t('Get Fixed Formulas')}</Text>
                    </View>
                </TouchableOpacity>
            </Card>

            {/* least cost formulation */}
            <Card theme={{ colors: { primary: 'green' } }} mode="contained" style={{marginVertical:2}}>
                <TouchableOpacity onPress={() => { navigation.navigate('Animal Selector') }}>
                    <Card.Cover 
                    source={require("../assets/images/cattlefeed.jpg")}
                    />
                        <View style={{
                            position: 'absolute', top: 50, left: 50, right: 50, bottom: 50,
                            backgroundColor: "rgba(10, 100, 10, 0.8)", borderRadius: 5,
                            flex: 1, alignItems: "center", justifyContent: "center",
                        }}>
                            <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold', fontSize: 28 }}>{t('feed formulate')}</Text>
                            <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold' }}>Least Cost Feed Formulation</Text>
                        </View>
                </TouchableOpacity>
            </Card>

            {/* <View style={{ flex: 1, justifyContent: "center", padding: 2 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Animal Selector') }}>
                    <View style={{ height: '100%', }}>
                        <Image source={require("../assets/images/cattlefeed.jpg")}
                            style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                height: '100%', width: "100%", opacity: 0.9,
                                borderRadius: 10,
                            }}
                        />

                        <View style={{
                            position: 'absolute', top: 50, left: 50, right: 50, bottom: 50,
                            backgroundColor: "rgba(10, 100, 10, 0.8)", borderRadius: 5,
                            flex: 1, alignItems: "center", justifyContent: "center",
                        }}>
                            <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold', fontSize: 28 }}>{t('feed formulate')}</Text>
                            <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold' }}>Least Cost Feed Formulation</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View> */}

            {/* <SponsorsDisplay/> */}
        </ScrollView >
    )
}

export default MenuScreen;
