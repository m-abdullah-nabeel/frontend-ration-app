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
        <View style={{ flex: 1, backgroundColor: 'rgb(120, 20, 10)' }}>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
                {/* <View style={{ width: 300, height: 300, backgroundColor: "rgb(10, 100, 10)", borderRadius: 150 }}> */}
                <Image
                    style={{ width: 250, height: 250, backgroundColor: "rgb(10, 100, 10)", borderRadius: 150 }}
                    source={require('../assets/logo/icon.png')}
                />

                {/* </View> */}
                {/* <Text style={{ fontSize: 58, fontWeight: 'bold', color: 'white', backgroundColor: 'rgb(10, 100, 10)', borderRadius: 50, paddingLeft: 20, paddingRight: 20 }}>UVA-Gro</Text> */}
            </View>

            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
                <View style={{ flex: -1, width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity
                        onPress={async () => await Linking.openURL(url_arass)}
                    >
                        <View style={{ backgroundColor: 'white', borderRadius: 50, height: 80, width: 80, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <Image
                                style={{ width: 65, height: 33 }}
                                source={require('../assets/arass.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={async () => await Linking.openURL(url_uvas)}
                    >
                        <View style={{ backgroundColor: 'white', borderRadius: 50, height: 80, width: 80, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <Image
                                style={{ width: 65, height: 40 }}
                                source={require('../assets/uvas-big.png')}
                            />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{ flex: 2, justifyContent: 'center', paddingLeft: 35, paddingRight: 35 }}>
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
        </View >
    )
}

export default Landing;
