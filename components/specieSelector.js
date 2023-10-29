import React from "react";
import { View, ScrollView, Text, Image, StyleSheet, Linking, TextInput, SafeAreaView } from 'react-native';
import { TouchableOpacity } from "react-native"
import { useTranslation } from 'react-i18next';
import SponsorsDisplay from "../pages/sposorsDisplay"


const SpecieSelector = ({ navigation }) => {


    const { t } = useTranslation();

    return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 1, justifyContent: "center", padding: 2 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Fixed Formula Selector', {animal_type: 'cattle'}) }}>
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
                            <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold', fontSize: 28 }}>
                                {t('Get Fixed Formula for Cattle')}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, justifyContent: "center", padding: 2 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Fixed Formula Selector', {animal_type: 'buffalo'}) }}>
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
                            <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold', fontSize: 28 }}>
                                {t('Get Fixed Formula for Buffalo')}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <SponsorsDisplay/>
        </View >

    )
}

export default SpecieSelector