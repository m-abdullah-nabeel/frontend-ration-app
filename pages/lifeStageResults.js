import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';

const formulas_at_diff_stages = require('../assets/data/stages/formulas_at_diff_stages.json');

const LifeStagesResults = ({ route, navigation }) => {
    let animal = route.params.animal.animal.animal
    let stage = route.params.stage.stage.stage
    let breed = route.params.breed.breed
    let weight = route.params.weight.weight
    let feed = route.params.feed.feed

    console.log(stage, animal, breed, weight, feed)

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

    return (
        <View>
            <Text>
                Hi LifeStagesResults
                Your details: 
                Species: {animal}
                Stage: {stage}
                Breed: {breed}
                Weight: {weight}
                Feed: {feed}
            </Text>
            <View>
                {formula && Object.keys(formula).map((i)=>{
                    return (
                        <View key={i}>
                            <Text>
                                {i}: {formula[[i]]}
                            </Text>
                        </View>
                    )
                })}

            </View>
            <View>
                <Text>
                    Calf Starter ----------------
                </Text>
                {
                    calStarter && Object.keys(calStarter).map((i)=>{
                        return (
                            <Text>
                                {i}: {calf_starter[[i]]}
                            </Text>
                        )
                    })
                }
            </View>
            
        </View>
    )
}

export default LifeStagesResults