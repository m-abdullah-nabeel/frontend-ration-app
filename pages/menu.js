import React from "react";
import { View, Text, Image, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { TouchableOpacity } from "react-native"
import { useTranslation } from 'react-i18next';


const MenuScreen = ({ navigation }) => {
    const { t } = useTranslation();
    return (
        <View style={{ flex: 1 }}>

            {/* <View style={{ flex: 1, borderColor: 'black', borderWidth: 0.5 }}>
                <View style={{
                    backgroundColor: 'rgba(10, 100, 0, 0.7)', borderRadius: 50,
                    alignContent: "center", justifyContent: 'center',
                }}>
                    <Text style={{
                        fontSize: 18, fontWeight: 'bold',
                        paddingTop: 15, paddingLeft: 15, paddingRight: 15,
                        color: 'white'
                    }}>{t('summer formula')}</Text>
                    <Text style={{
                        fontSize: 12,
                        paddingBottom: 15, paddingLeft: 20, paddingRight: 15,
                        color: 'white'
                    }}>{t('coming soon')}</Text>
                </View>

                <View style={{
                    backgroundColor: 'rgba(10, 100, 0, 0.7)', borderRadius: 50, marginTop: 10,
                    alignContent: "center", justifyContent: 'center',
                }}>
                    <Text style={{
                        fontSize: 18, fontWeight: 'bold',
                        paddingTop: 15, paddingLeft: 15, paddingRight: 15,
                        color: 'white'
                    }}>{t('winter formula')}</Text>
                    <Text style={{
                        fontSize: 12,
                        paddingBottom: 15, paddingLeft: 20, paddingRight: 15,
                        color: 'white'
                    }}>{t('coming soon')}</Text>
                </View>

            </View> */}

            <View style={{ flex: 1, borderColor: 'black', borderWidth: 0.5, flexDirection: 'row', justifyContent: "space-evenly" }}>
                <View style={{
                    backgroundColor: 'rgba(10, 100, 0, 0.5)', borderRadius: 10,
                    alignContent: "center", justifyContent: 'center', width: '50%', margin: 1
                }}>
                    <Text style={{
                        fontSize: 18, fontWeight: 'bold',
                        // paddingTop: 15, paddingLeft: 15, paddingRight: 15,
                        padding: 15,

                        color: 'white'
                    }}>{t('summer formula')}</Text>
                    <Text style={{
                        fontSize: 12,
                        borderBottomWidth: 2, fontWeight: "bold", alignSelf: 'center',
                        // paddingBottom: 15, paddingLeft: 20, paddingRight: 15,
                        color: 'white', textAlign: 'center', borderBottomColor: 'white',
                    }}>{t('coming soon')}</Text>
                </View>

                <View style={{
                    backgroundColor: 'rgba(10, 100, 0, 0.5)', borderRadius: 10,
                    alignContent: "center", justifyContent: 'center', width: '50%', margin: 1
                }}>
                    <Text style={{
                        fontSize: 18, fontWeight: 'bold',
                        // paddingTop: 15, paddingLeft: 15, paddingRight: 15,
                        padding: 15,
                        color: 'white'
                    }}>{t('winter formula')}</Text>
                    <Text style={{
                        fontSize: 12,
                        // paddingBottom: 15, paddingLeft: 20, paddingRight: 15,
                        color: 'white',
                        borderBottomWidth: 2, fontWeight: "bold", alignSelf: 'center', borderBottomColor: 'white',
                    }}>{t('coming soon')}</Text>
                </View>

            </View>

            <View style={{ flex: 1, borderColor: 'black', borderWidth: 0.5, justifyContent: "center" }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Animal Selector') }}>
                    <View style={{ height: 200 }}>
                        <Image source={require("../assets/images/cattlefeed.jpg")}
                            style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                justifyContent: 'center', alignItems: 'center',
                                height: 200, width: "100%",
                                borderRadius: 10,

                                shadowOffset: { width: -2, height: 4 },
                                shadowColor: 'red',
                                shadowOpacity: 1,
                                // shadowRadius: 3,
                                // elevation: 20,

                            }}
                        />

                        <View style={{
                            position: 'absolute', top: 60, left: 60, right: 60, bottom: 60,
                            backgroundColor: "rgba(10, 100, 10, 0.5)", borderRadius: 5,
                            flex: 1, alignItems: "center", justifyContent: "center",
                        }}>
                            <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold', fontSize: 28 }}>{t('feed formulate')}</Text>
                            {/* <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold', fontSize: 28 }}>Formulate feed</Text> */}
                            <Text style={{ color: 'white', alignSelf: "center", }}>Least Cost Feed Formulation</Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, borderColor: 'black', borderWidth: 0.25, justifyContent: "flex-end" }}>
                <View style={{ flex: 3 }}></View>

                <View style={{
                    flex: 1, width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around',
                    borderColor: "black", borderWidth: 1, backgroundColor: 'rgb(10, 100, 10)', height: 50
                }}>

                    <View style={{ backgroundColor: 'white', borderRadius: 5, height: 35, width: 100, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                        <Text style={{
                            alignSelf: 'center', padding: 3, fontSize: 12, textAlign: "center", fontWeight: 'bold', borderBottomWidth: 2,
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
