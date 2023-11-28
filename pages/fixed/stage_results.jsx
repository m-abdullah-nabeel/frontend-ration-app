import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, Button, ScrollView, TouchableOpacity} from 'react-native';
import { DataTable } from 'react-native-paper';
import SponsorsDisplay from "../components/sponsors_display"

import { useTranslation } from 'react-i18next';

// import { Avatar, Button, Card, Text } from 'react-native-paper';
import { Card, Avatar } from 'react-native-paper';
import AdTests from "../ads/sampleAd"

// const formulas_at_diff_stages = require('../../../../../assets/data/stages/formulas_at_diff_stages.json');
const formulas_at_diff_stages = require('../../assets/data/stages/formulas_at_diff_stages.json');

const LifeStagesResults = ({ route, navigation }) => {
    let animal = route.params.animal.animal.animal
    let stage = route.params.stage.stage.stage
    let breed = route.params.breed.breed
    let weight = route.params.weight.weight
    let feed = route.params.feed.feed

    const { t, i18n } = useTranslation();

    console.log(stage, animal, breed, weight, feed)
    const DataToRemove = new Set(["Body Weight", "Milk (lit)", "Species", "Main Fodder", "Season", "Calf Starter Formula"]);

    const [formula, setFormula] = useState(null)
    const [calStarter, setCalfStarter] = useState(null)

    // find the formula
    const formula_finder = () => {
        if (stage!=='before_weaning') {
            let stageSelect = formulas_at_diff_stages[[stage]]
            console.log(stageSelect)
            let fodderSelect = stageSelect[[feed]]
            console.log(fodderSelect)
            let breedSelect = fodderSelect[[breed]]
            console.log(breedSelect)
            const WeightSelect = breedSelect.filter(item => item["Body Weight"] == weight);
            console.log(WeightSelect[0])
    
            return WeightSelect[0];    
        }
        if (stage==='before_weaning') {
            let stageSelect = formulas_at_diff_stages[[stage]]
            console.log(stageSelect)
            let breedSelect = stageSelect[[breed]]
            console.log(breedSelect)
            const WeightSelect = breedSelect.filter(item => item["Body Weight"] == weight);
            console.log(WeightSelect[0])
    
            return WeightSelect[0];    
        }
    }

    const calf_starter = () => {
        if (stage==='before_weaning') {
            let stageSelect = formulas_at_diff_stages[[stage]]
            console.log(stageSelect)
            let CalfStarter = stageSelect['calf_starter']
            console.log(CalfStarter)
    
            return CalfStarter[0];    
        }
    }

    useEffect(()=>{
        setFormula(formula_finder()) 
        if (stage==='before_weaning') {
            setCalfStarter(calf_starter())
        }       
    }, [])

    const LeftContent = props => <Image
        style={{width: 90, height: 90}}
        source={require('../../assets/logo/icon.png')}
    />    
    
    return (
        <ScrollView>
            {/* <AdTests/> */}
            <Card>
                <Card.Title 
                title={t("Recipie")} 
                right={LeftContent} 
                titleVariant='headlineMedium' titleStyle={{fontWeight: "bold"}}
                subtitle="UVA-gro"
                />
            </Card>

            {/* <Text>
                Hi LifeStagesResults
                Your details: 
                Species: {animal}
                Stage: {stage}
                Breed: {breed}
                Weight: {weight}
                Feed: {feed}
            </Text> */}

            <View>
                <DataTable>
                    <DataTable.Header style={{backgroundColor: "rgba(10, 90, 10, 1)"}}>
                        <DataTable.Title textStyle={{color: 'white', fontWeight: "bold"}}>{t("feedstuffs")}</DataTable.Title>
                        <DataTable.Title textStyle={{color: 'white', fontWeight: "bold"}} numeric>{t("Amount / Quantity")}</DataTable.Title>
                    </DataTable.Header>

                    {formula && Object.keys(formula)
                    .filter((name) => {
                        return !DataToRemove.has(name);
                    })
                    .map((item) => (
                        <DataTable.Row key={item}>
                            <DataTable.Cell>{t(item)}</DataTable.Cell>
                            <DataTable.Cell numeric>{formula[[item]]} </DataTable.Cell>
                            {/* <DataTable.Cell numeric>{item.fat}</DataTable.Cell> */}
                        </DataTable.Row>
                    ))}

                </DataTable>
                <Text style={{padding: 5, color: "red"}}>* {t("unit_statement")}</Text>
                {
                    stage==='before_weaning' && 
                    <>
                    <Text style={{fontWeight: "bold", fontSize: 24, alignSelf: "center", margin: 10}}>{t("Calf Starter Formula")}</Text>
                    <DataTable>
                    <DataTable.Header style={{backgroundColor: "rgba(10, 90, 10, 1)"}}>
                        <DataTable.Title textStyle={{color: 'white', fontWeight: "bold"}}>{t("feedstuffs")}</DataTable.Title>
                        <DataTable.Title textStyle={{color: 'white', fontWeight: "bold"}}>{t("Amount / Quantity")}</DataTable.Title>
                    </DataTable.Header>

                    {calStarter && Object.keys(calStarter)
                    .filter((name) => {
                        return !DataToRemove.has(name);
                    })
                    .map((item) => (
                        <DataTable.Row key={item}>
                            <DataTable.Cell>{t(item)}</DataTable.Cell>
                            <DataTable.Cell>{calStarter[[item]]} {t("parts")}</DataTable.Cell>
                        </DataTable.Row>
                    ))}

                    </DataTable>
                    </>
                }
            </View>  
            <View style={{marginTop: 10}}>
                <SponsorsDisplay/>    
            </View>          
        </ScrollView>
    )
}

export default LifeStagesResults