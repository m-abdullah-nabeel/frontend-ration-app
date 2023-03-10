import React, { useCallback } from "react";
import { Text, View, Image, Linking } from "react-native";
import { TouchableOpacity } from "react-native";
// translation
import '../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const Landing = ({ navigation }) => {
    const url_uvas = "https://uvas.edu.pk";
    const url_arass = "https://arass.org/";
    const { t, i18n } = useTranslation();

    return (
        // base color
        // <View style={{ flex: 1, backgroundColor: 'rgba(120, 20, 10, 1)' }}>
        // better colors with green focused more
        // <View style={{ flex: 1, backgroundColor: 'rgb(153, 0, 0)' }}>
        // white background
        // <View style={{ flex: 1, backgroundColor: 'rgb(200, 200, 200)' }}>
        // colors reversed
        // <View style={{ flex: 1, backgroundColor: 'rgb(10, 150, 10)' }}>
        <View style={{ flex: 1, backgroundColor: 'rgb(10, 100, 10)' }}>
            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center', paddingTop: 50, borderColor: "black", borderWidth: 1 }}>
                <View
                    style={{
                        width: 250, height: 250,
                        borderRadius: 125, alignSelf: 'center', justifyContent: 'center', alignItems: 'center',
                        borderColor: "black", borderWidth: 1, backgroundColor: "rgb(153, 0, 0)",
                    }}>
                    <Image
                        // style={{ width: 250, height: 250, backgroundColor: "rgb(10, 150, 10)", borderRadius: 150 }}
                        // style={{ width: 250, height: 250, backgroundColor: "rgb(153, 0, 0)", borderRadius: 150 }}
                        style={{ width: 180, height: 180, }}
                        source={require('../assets/logo/icon.png')}
                    />

                </View>
                {/* <Text style={{ fontSize: 58, fontWeight: 'bold', color: 'white', backgroundColor: 'rgb(10, 100, 10)', borderRadius: 50, paddingLeft: 20, paddingRight: 20 }}>UVA-Gro</Text> */}
            </View>

            <View style={{ flex: 2, justifyContent: 'center', borderColor: "black", borderWidth: 1 }}>

                <View style={{ flex: 2, width: '100%', justifyContent: 'space-around', borderColor: "black", borderWidth: 1, paddingLeft: 35, paddingRight: 35, }}>
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
                    borderColor: "black", borderWidth: 1, backgroundColor: 'rgb(10, 100, 10)'
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

            {/* <View style={{ alignItems: 'center', justifyContent: 'flex-end', borderColor: "black", borderWidth: 1 }}>
                <View style={{ flex: -1, width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity
                        onPress={async () => await Linking.openURL(url_arass)}
                    >
                        <View style={{ backgroundColor: 'white', borderRadius: 50, height: 50, width: 80, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <Image
                                style={{ width: 65, height: 33 }}
                                source={require('../assets/arass.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={async () => await Linking.openURL(url_uvas)}
                    >
                        <View style={{ backgroundColor: 'white', borderRadius: 50, height: 50, width: 80, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <Image
                                style={{ width: 65, height: 40 }}
                                source={require('../assets/uvas-big.png')}
                            />
                        </View>
                    </TouchableOpacity>

                </View>
            </View> */}

        </View >
    )
}

export default Landing;
