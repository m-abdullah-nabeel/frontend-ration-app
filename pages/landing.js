import React, { useCallback } from "react";
import { Text, View, Image, Linking } from "react-native";
import { TouchableOpacity, StatusBar } from "react-native";
// translation
import '../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import LanguageChanger from './languageChanger';

import { Dimensions } from 'react-native';


const Landing = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    console.log("Device Dimensions: ")
    console.log(windowWidth, windowHeight)

    const url_uvas = "https://uvas.edu.pk";
    const url_arass = "https://arass.org/";
    const { t, i18n } = useTranslation();

    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(10, 100, 10, 1)' }}>
            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
                <View style={{
                    position: 'absolute', top: StatusBar.currentHeight, left: windowWidth - 105, right: 5, bottom: 0,
                }}>
                    <LanguageChanger />
                </View>
                <View
                    style={{
                        width: 250, height: 250,
                        borderRadius: 125, alignSelf: 'center', justifyContent: 'center', alignItems: 'center',
                        borderColor: "black", borderWidth: 1,
                        backgroundColor: "rgba(255, 255, 255, 1)",
                    }}>
                    <Image
                        style={{ width: 180, height: 180, }}
                        source={require('../assets/logo/icon.png')}
                    />

                </View>
            </View>

            <View style={{ flex: 2, justifyContent: 'center', paddingLeft: 35, paddingRight: 35, }}>
                <View style={{ flex: 2, width: '100%', justifyContent: 'space-around', }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Formulate');
                        }}
                    >
                        <View style={{
                            backgroundColor: 'white', padding: 15, borderRadius: 25, alignItems: 'center',
                        }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'rgb(120, 20, 10)' }}>
                                {t('proceed landing')}
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>

                {/* Sponsors Logo */}
                <View style={{
                    flex: 1, width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around',
                    backgroundColor: 'rgb(10, 100, 10)'
                }}>

                    <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 100, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                        <Text style={{
                            alignSelf: 'center', padding: 3, fontSize: 12, textAlign: "center", fontWeight: 'bold', borderBottomWidth: 2,
                            // borderBottomColor: "white", borderBottomWidth: 4, color: 'white', fontSize: 18, fontWeight: 'bold', 
                        }}>
                            Our Partners
                        </Text>

                    </View>

                    <TouchableOpacity
                        onPress={async () => await Linking.openURL(url_arass)}
                    >
                        <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 70, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <Image
                                style={{ width: 50, height: 27 }}
                                source={require('../assets/arass.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={async () => await Linking.openURL(url_uvas)}
                    >
                        <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 70, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <Image
                                style={{ width: 50, height: 23 }}
                                source={require('../assets/uvas-big.png')}
                            />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </View >
    )
}

export default Landing;
