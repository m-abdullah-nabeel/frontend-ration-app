import React, { useCallback } from "react";
import { Text, View, Image, Linking } from "react-native";
import { TouchableOpacity } from "react-native";

const Landing = ({ navigation }) => {
    const url_uvas = "https://uvas.edu.pk";
    const url_arass = "https://pvmc.gov.pk/";

    return (
        <View style={{ flex: 1, backgroundColor: 'rgb(120, 20, 10)' }}>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{ width: '100%', height: 200 }}
                    source={require('../assets/logo/icon.png')}
                />

                {/* <Text style={{ fontSize: 58, fontWeight: 'bold', color: 'white', backgroundColor: 'rgb(10, 100, 10)', borderRadius: 50, paddingLeft: 20, paddingRight: 20 }}>UVA-Gro</Text> */}
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                <View style={{ flex: -1, width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity
                        onPress={async () => await Linking.openURL(url_arass)}
                    >
                        <View style={{ backgroundColor: 'white', borderRadius: 50, height: 90, width: 90, justifyContent: 'center', alignItems: 'center', margin: 5, backgroundColor: '#d3d3d3' }}>
                            <Image
                                style={{ width: 75, height: 40 }}
                                source={require('../assets/arass.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={async () => await Linking.openURL(url_uvas)}
                    >
                        <View style={{ backgroundColor: 'white', borderRadius: 50, height: 90, width: 90, justifyContent: 'center', alignItems: 'center', margin: 5, backgroundColor: '#d3d3d3' }}>
                            <Image
                                style={{ width: 75, height: 45 }}
                                source={require('../assets/uvas-big.png')}
                            />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 35, paddingRight: 35 }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Formulate');
                    }}

                >
                    <View style={{
                        backgroundColor: 'white', padding: 15, borderRadius: 25, alignItems: 'center',
                    }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'rgb(120, 20, 10)' }}>
                            Proceed
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View >
    )
}

export default Landing;
