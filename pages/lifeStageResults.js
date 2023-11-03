import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, Button, ScrollView} from 'react-native';
import { DataTable } from 'react-native-paper';
import SponsorsDisplay from "./sposorsDisplay"

// import { Avatar, Button, Card, Text } from 'react-native-paper';
import { Card, Avatar } from 'react-native-paper';

const formulas_at_diff_stages = require('../assets/data/stages/formulas_at_diff_stages.json');

const LifeStagesResults = ({ route, navigation }) => {
    let animal = route.params.animal.animal.animal
    let stage = route.params.stage.stage.stage
    let breed = route.params.breed.breed
    let weight = route.params.weight.weight
    let feed = route.params.feed.feed

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
        source={require('../assets/logo/icon.png')}
    />

    return (
        <ScrollView>
            <Card>
                <Card.Title 
                title="Here is your feed recipie" 
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
                        <DataTable.Title textStyle={{color: 'white', fontWeight: "bold"}}>Feedstuffs</DataTable.Title>
                        <DataTable.Title textStyle={{color: 'white', fontWeight: "bold"}} numeric>Amount / Quantity</DataTable.Title>
                    </DataTable.Header>

                    {formula && Object.keys(formula)
                    .filter((name) => {
                        return !DataToRemove.has(name);
                    })
                    .map((item) => (
                        <DataTable.Row key={item}>
                            <DataTable.Cell>{item}</DataTable.Cell>
                            <DataTable.Cell numeric>{formula[[item]]}</DataTable.Cell>
                            {/* <DataTable.Cell numeric>{item.fat}</DataTable.Cell> */}
                        </DataTable.Row>
                    ))}

                </DataTable>
                <Text style={{padding: 5}}>All the values are given in Kg, unless mentioned.</Text>
                {
                    stage==='before_weaning' && 
                    <>
                    <Text style={{fontWeight: "bold", fontSize: 24, alignSelf: "center", margin: 10}}>Calf Starter Formula</Text>
                    <DataTable>
                    <DataTable.Header style={{backgroundColor: "rgba(10, 90, 10, 1)"}}>
                        <DataTable.Title textStyle={{color: 'white', fontWeight: "bold"}}>Feedstuffs</DataTable.Title>
                        <DataTable.Title textStyle={{color: 'white', fontWeight: "bold"}}>Amount / Quantity</DataTable.Title>
                    </DataTable.Header>

                    {calStarter && Object.keys(calStarter)
                    .filter((name) => {
                        return !DataToRemove.has(name);
                    })
                    .map((item) => (
                        <DataTable.Row key={item}>
                            <DataTable.Cell>{item}</DataTable.Cell>
                            <DataTable.Cell>{calStarter[[item]]}</DataTable.Cell>
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