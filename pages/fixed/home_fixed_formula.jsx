import React from "react";
import { View, ScrollView, Text, Image, StyleSheet, Linking, TextInput, SafeAreaView } from 'react-native';
import { TouchableOpacity } from "react-native"
import { useTranslation } from 'react-i18next';
import SponsorsDisplay from "../components/sponsors_display"

import { Avatar, Button, Card, Text as TextPaper } from 'react-native-paper';


const FixedFormulaCategories = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <ScrollView style={{ 
            flex: 1 
        }}>
            <TouchableOpacity onPress={() => { navigation.navigate('Fixed Formula Selector', {animal_type: 'cattle'}) }}>
            <Card mode="outlined" style={{marginVertical: 2}}>
                <Card.Cover source={require("../../assets/images/cattle-stages.jpg")} />
                <Card.Content style={{
                            position: 'absolute', //top: 10, left: 10, right: 10, bottom: 10,
                            bottom: 10, left: 10, right: 10, 
                            backgroundColor: "rgba(10, 100, 10, 0.6)", borderRadius: 5,
                            flex: 1, alignItems: "center", justifyContent: "center",
                        }}>
                        <TextPaper style={{color: "white", fontWeight: "bold"}} variant="titleLarge">{t('Stage-Based Feed Formulator')}</TextPaper>
                        <TextPaper style={{color: "white", fontWeight: "bold", textAlign: "center"}} variant="bodyMedium">{t('stage-based-description')}</TextPaper>
                </Card.Content>
                {/* <Card.Content>
                    <TextPaper style={{color: "rgba(10, 70, 10, 1)", fontWeight: "bold"}} variant="titleLarge">{t('Seasonal and Animal Profile Formulas')}</TextPaper>
                    <TextPaper variant="bodyMedium">Card content</TextPaper>
                </Card.Content> */}
            </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('Milk and Season', {animal_type: 'buffalo'}) }}>
            <Card mode="outlined" style={{marginVertical: 2}}>
                <Card.Cover source={require("../../assets/images/summerFeed.jpg")} />
                <Card.Content style={{
                            position: 'absolute', //top: 10, left: 10, right: 10, bottom: 10,
                            bottom: 10, left: 10, right: 10, 
                            backgroundColor: "rgba(10, 100, 10, 0.6)", borderRadius: 5,
                            flex: 1, alignItems: "center", justifyContent: "center",
                        }}>
                    <TextPaper style={{color: "white", fontWeight: "bold", textAlign: "center"}} variant="titleLarge">{t('Seasonal Feed Optimizer')}</TextPaper>
                    <TextPaper style={{color: "white", fontWeight: "bold", textAlign: "center"}} variant="bodyMedium">{t('season-based-description')}</TextPaper>
                </Card.Content>
            </Card>
            </TouchableOpacity>

        </ScrollView >

    )
}

export default FixedFormulaCategories