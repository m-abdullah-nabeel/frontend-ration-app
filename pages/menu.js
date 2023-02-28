import React from "react";
import { View, Text, Image, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { TouchableOpacity } from "react-native"

// testing language
import { useTranslation } from 'react-i18next';

const TextInputExample = () => {
    const [number, setNumber] = React.useState(1)
    return (
        <SafeAreaView>
            <TextInput
            // style={styles.input}
            // onChangeText={(val) => { setNumber(val) }}
            // onChangeText={text => setNumber(text)}

            // value={number}
            // placeholder="useless placeholder"
            // keyboardType="numeric"
            />
        </SafeAreaView>
    );
};





const MenuScreen = ({ navigation }) => {
    const { t } = useTranslation();
    return (
        <View style={{ flex: 1 }}>
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
            {/* 
            <View>
                <TextInputExample />
            </View> */}

            <View style={{
                backgroundColor: 'rgba(10, 100, 0, 0.7)', borderRadius: 50, marginTop: 90,
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

            <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: "row", alignSelf: 'center', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                <Image
                    style={{ width: 100, height: 45 }}
                    source={require('../assets/uvas-big.png')}
                />
                <Image
                    style={{ width: 100, height: 45 }}
                    source={require('../assets/arass.png')}
                />

            </View>
        </View >
    )
}

export default MenuScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        marginBottom: 25,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
    },

    image: {
        width: '100%',
        height: '70%'
    },

    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontWeight: 'bold',
        fontSize: 20
    }

});
