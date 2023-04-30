import React from "react";
import { View, Text, Image, StyleSheet, Linking, TextInput, SafeAreaView } from 'react-native';
import { TouchableOpacity } from "react-native"
import { useTranslation } from 'react-i18next';


const MenuScreen = ({ navigation }) => {
    const { t } = useTranslation();

    const url_uvas = "https://uvas.edu.pk";
    const url_arass = "https://arass.org/";

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "center", padding: 2 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Fixed Formula Selector') }}>
                    <View style={{ height: '100%', }}>
                        <Image source={require("../assets/images/winterFeed.jpg")}
                            style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                height: '100%', width: "100%", opacity: 0.9,
                                borderRadius: 10,
                            }}
                        />

                        <View style={{
                            position: 'absolute', top: 5, left: 5, right: 5, bottom: 5,
                            backgroundColor: "rgba(10, 100, 10, 0.5)", borderRadius: 5,
                            flex: 1, alignItems: "center", justifyContent: "center",
                        }}>
                            <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold', fontSize: 28 }}>{t('Get Fixed Formulas')}</Text>
                            {/* <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold', }}>Fixed Formulas Hasil Karen</Text> */}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            {/* least cost formulation */}
            <View style={{ flex: 1, justifyContent: "center", padding: 2 }}>
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
                            position: 'absolute', top: 60, left: 60, right: 60, bottom: 60,
                            backgroundColor: "rgba(10, 100, 10, 0.8)", borderRadius: 5,
                            flex: 1, alignItems: "center", justifyContent: "center",
                        }}>
                            <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold', fontSize: 28 }}>{t('feed formulate')}</Text>
                            <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold' }}>Least Cost Feed Formulation</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            {/* sponsors displayed */}
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View style={{
                    backgroundColor: 'rgb(10, 100, 10)',
                    width: '100%', height: 50,
                    flexDirection: 'row', alignItems: "center", justifyContent: 'space-around',
                    borderColor: "black", borderWidth: 1,
                }}>

                    <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 105, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                        <Text style={{
                            alignSelf: 'center', padding: 3, fontSize: 12, textAlign: "center", fontWeight: 'bold',
                        }}>
                            Visit Our Team
                        </Text>

                    </View>

                    <TouchableOpacity
                        onPress={async () => await Linking.openURL(url_arass)}
                    >
                        <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 105, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <Image
                                style={{ width: 50, height: 27 }}
                                source={require('../assets/arass.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={async () => await Linking.openURL(url_uvas)}
                    >
                        <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 105, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <Image
                                style={{ width: 50, height: 23 }}
                                source={require('../assets/uvas-big.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* <View style={{ flexDirection: "row", alignSelf: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ width: 100, height: 45 }}
                        source={require('../assets/uvas-big.png')}
                    />
                    <Image
                        style={{ width: 100, height: 45 }}
                        source={require('../assets/arass.png')}
                    />
                </View> */}
            </View>
        </View >
    )
}

export default MenuScreen;
