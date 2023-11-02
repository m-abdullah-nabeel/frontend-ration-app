import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Alert, Modal, Pressable } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
// testing language
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Card, Text as TextPaper } from 'react-native-paper';

const before_weaning_pic = require('../assets/images/before-weaning.jpeg');
const after_weaning_pic = require('../assets/images/after-weaning.jpg');
const faroff_dry_pic = require('../assets/images/faroff_dry.jpg');
const closeup_dry_pic = require('../assets/images/closeup.jpg');

const stages_of_cattle_data = {
    before_weaning: { label: 'Before Weaning', value: 'before_weaning', picture: before_weaning_pic },
    after_weaning: { label: 'After Weaning', value: 'after_weaning', picture: after_weaning_pic },
    faroff_dry: { label: 'Faroff Dry Period', value: 'faroff_dry', picture: faroff_dry_pic },
    closeup_dry: { label: 'Closeup Dry Period', value: 'closeup_dry', picture: closeup_dry_pic }
}

const stages_of_cattle = [
    'before_weaning',
    'after_weaning',
    'faroff_dry',
    'closeup_dry'
]

const FixedFormulaSelector = ({ route, navigation }) => {
    const [visible, setVisible] = useState(false);
    const [species, setSpecies] = useState('')
    const [input, setInput] = useState([])

    const { t } = useTranslation();

    const { animal_type } = route.params;
    console.log(animal_type)

    useEffect(() => {
        if (species == 'Cattle') {
            console.log("Species: " + JSON.stringify(species) + " is selected")
            setInput([fixed_formula_bw_cattle, fixed_formula_mp_cattle])
        }
        // Before weaning after weaning dry period closeup
        if (species == 'Buffalo') {
            console.log("Species: " + JSON.stringify(species) + " is selected")
            setInput([fixed_formula_bw_buffalo, fixed_formula_mp_buffalo])
        }
        if (species == 'dry_period') {
            console.log("Species: " + JSON.stringify(species) + " is selected")
            setInput([cat_origin, fixed_formula_mp_buffalo])
        }
    }, [species])

    return (
        <ScrollView>
            <View style={{
                backgroundColor: 'rgb(0, 100, 0)', borderRadius: 50,
                paddingLeft: 20, paddingTop: 15, paddingBottom: 15, paddingRight: 20, marginBottom: 10,
            }}>
                <Text style={{
                    color: 'white', alignSelf: "center",
                    fontSize: 24, fontWeight: 'bold', //paddingBottom: 5,
                }}>
                    {t("select animal header")}
                </Text>
            </View>

            {
                stages_of_cattle.map((stage)=>{
                    return (
                        <AnimalTile key={stage} ainmalSpecies={"Cattle"} stage={stage} navigation={navigation} route={route}/>
                    )
                })
            }

        </ScrollView >
    )
}

const AnimalTile = ({ainmalSpecies, stage, navigation, route}) => {
    const [species, setSpecies] = useState('')
    const stage_value = stages_of_cattle_data[stage]
    const picture = stage_value.picture

    const { animal_type } = route.params;
    console.log(animal_type)

    return (
        <TouchableOpacity onPress={() => { 
            navigation.navigate('Fixed Formula Inputs', { 
                stage:{stage}, animal:{species}
                })
            setSpecies(species) }}>
            <Card mode="outlined" style={{marginVertical: 2}}>
                <Card.Cover source={picture} />
                <Card.Content style={{
                            position: 'absolute', //top: 10, left: 10, right: 10, bottom: 10,
                            bottom: 10, left: 10, right: 10, 
                            backgroundColor: "rgba(10, 70, 10, 0.5)", borderRadius: 5,
                            // flex: 1, alignItems: "center", justifyContent: "center",
                        }}>
                    <Text style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: 24}}>{stage_value.label}</Text>
                    <TextPaper style={{color: "white", fontWeight: "bold", textAlign: "center"}} variant="bodyMedium">Feed formulas for {stage_value.label} animals</TextPaper>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}

export default FixedFormulaSelector;
