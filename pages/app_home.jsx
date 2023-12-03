import React from "react";
import { View, ScrollView } from 'react-native';
import { TouchableOpacity } from "react-native"
import { useTranslation } from 'react-i18next';
import { Card, Text } from 'react-native-paper';

const MenuScreen = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <ScrollView style={{ flex: 1 }}>
            <Card theme={{ colors: { primary: 'green' } }} style={{marginVertical:2}} mode="contained">
                <TouchableOpacity onPress={() => { navigation.navigate('Specie Selector') }}>
                    <Card.Cover 
                        source={require("../assets/images/winterFeed.jpg")}
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

            <Card theme={{ colors: { primary: 'green' } }} mode="contained" style={{marginVertical:2}}>
                <TouchableOpacity onPress={() => { navigation.navigate('Prem Animal Inputs') }}>
                    <Card.Cover 
                    source={require("../assets/images/cattle-grass.jpg")}
                    />
                        <View style={{
                            position: 'absolute', top: 50, left: 50, right: 50, bottom: 50,
                            backgroundColor: "rgba(10, 100, 10, 0.8)", borderRadius: 5,
                            flex: 1, alignItems: "center", justifyContent: "center",
                        }}>
                            <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold', fontSize: 28 }}>{t('feed formulate')}</Text>
                            <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold' }}>Least Cost Feed Formulation</Text>
                            <Text style={{ color: 'white', alignSelf: "center", fontWeight: 'bold', fontSize: 28 }}>{t('Premium')}</Text>
                        </View>
                </TouchableOpacity>
            </Card>

            {/* <SponsorsDisplay/> */}
        </ScrollView >
    )
}

export default MenuScreen;
