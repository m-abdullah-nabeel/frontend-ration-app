import React from "react";
import { View, ScrollView, Text, Image, StyleSheet, Linking, TextInput, SafeAreaView } from 'react-native';
import { TouchableOpacity } from "react-native"
import { useTranslation } from 'react-i18next';
import SponsorsDisplay from "../pages/sposorsDisplay"

import { Avatar, Button, Card, Text as TextPaper } from 'react-native-paper';


const SpecieSelector = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <ScrollView style={{ 
            flex: 1 
        }}>
            <TouchableOpacity onPress={() => { navigation.navigate('Fixed Formula Selector', {animal_type: 'cattle'}) }}>
            <Card mode="outlined" style={{marginVertical: 2}}>
                <Card.Content>
                    <TextPaper style={{color: "rgba(10, 70, 10, 1)", fontWeight: "bold"}} variant="titleLarge">{t('Animal Life Stage Recipies')}</TextPaper>
                    <TextPaper variant="bodyMedium">Pre-formulated formulas based on various stages of an animal</TextPaper>
                </Card.Content>
                <Card.Cover source={require("../assets/images/cattle-stages.jpg")} />
                {/* <Card.Title 
                title={t('Get Fixed Formula for Cattle')} 
                titleStyle={{color: 'green', paddingTop: 25, alignSelf: "center", fontWeight: 'bold', fontSize: 28}}
                /> */}
                {/* <Card.Content>
                    <TextPaper variant="titleLarge">{t('Get Fixed Formula for Cattle')}</TextPaper>
                    <TextPaper variant="bodyMedium">Card content</TextPaper>
                </Card.Content> */}
            </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('Milk and Season', {animal_type: 'buffalo'}) }}>
            <Card mode="outlined" style={{marginVertical: 2}}>
                {/* <Card.Content>
                    <TextPaper style={{color: "rgba(10, 70, 10, 1)", fontWeight: "bold"}} variant="titleLarge">{t('Seasonal and Animal Profile Formulas')}</TextPaper>
                    <TextPaper variant="bodyMedium">Card content</TextPaper>
                </Card.Content> */}
                <Card.Cover source={require("../assets/images/summerFeed.jpg")} />
                {/* <Card.Title 
                title={t('Get Fixed Formula based on milk and season')}
                titleStyle={{color: 'green', paddingTop: 25, alignSelf: "center", fontWeight: 'bold', fontSize: 28}}
                /> */}
                <Card.Content>
                    <TextPaper style={{color: "rgba(10, 70, 10, 1)", fontWeight: "bold"}} variant="titleLarge">{t('Seasonal and Animal Profile Formulas')}</TextPaper>
                    <TextPaper variant="bodyMedium">Card content</TextPaper>
                </Card.Content>
            </Card>

            </TouchableOpacity>


            {/* <View style={{ flex: 1, justifyContent: "center", padding: 2 }}>
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
            </View> */}

            {/* <View style={{ flex: 1, justifyContent: "center", padding: 2 }}>
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
            </View> */}

            {/* <View style={{ flex: 1, justifyContent: "center", padding: 2 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Milk and Season', {animal_type: 'buffalo'}) }}>
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
                                {t('Get Fixed Formula based on milk and season')}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View> */}


            {/* <SponsorsDisplay/> */}
        </ScrollView >

    )
}

export default SpecieSelector