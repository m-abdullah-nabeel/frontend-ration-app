import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Alert, Modal, Pressable } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
// testing language
import { useTranslation } from 'react-i18next';

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
        <View style={{ flex: 1, }}>
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

            <View style={{ flex: 3, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>

            {
                stages_of_cattle.map((stage)=>{
                    return (
                        <AnimalTile key={stage} ainmalSpecies={"Cattle"} stage={stage} navigation={navigation} route={route}/>
                    )
                })
            }

                {
                    animal_type !== 'buffalo' ? null :
                    <View style={styles.animal}>
                        <TouchableOpacity onPress={() => { setVisible(true), setSpecies("Buffalo") }}>
                            <Image style={styles.image} source={require('../assets/animals/buffalo.png')} />
                        </TouchableOpacity>
                    </View>   
                }
            </View>

            <View style={{ flex: 1 }}></View>
        </View >
    )
}

const AnimalTile = ({ainmalSpecies, stage, navigation, route}) => {
    const [visible, setVisible] = useState(false);
    const [species, setSpecies] = useState('')
    const [input, setInput] = useState([])
    const picture = require(`../assets/animals/cow.png`)

    const { animal_type } = route.params;
    console.log('animal_type')
    console.log(animal_type)

    useEffect(() => {
        if (species == 'Cattle') {
            console.log("Species: " + JSON.stringify(species) + " is selected")
            setInput([fixed_formula_bw_cattle, fixed_formula_mp_cattle])
        }
        if (species == 'Buffalo') {
            console.log("Species: " + JSON.stringify(species) + " is selected")
            setInput([fixed_formula_bw_buffalo, fixed_formula_mp_buffalo])
        }
    }, [species])

    return (
        <View style={styles.animal}>
            <TouchableOpacity onPress={() => { 
                
                navigation.navigate('Fixed Formula Inputs', { 
                    stage:{stage}, animal:{species}
                 })
                setSpecies(species) }}>
                <Image style={styles.image} source={picture} />
                <Text>{stage}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    animal: {
        borderColor: 'rgb(30, 130, 30)',
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        width: '47%',
        height: 150,
        marginColor: 'pink'
    },
    image: {
        width: 130,
        height: 90,
        borderRadius: 10,
    },
    item: {
        backgroundColor: "#fff",
        padding: 20,
        marginVertical: 8,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 14
    },
    centeredView: {
        flex: 1,
        flexDirection: "column-reverse",
        // justifyContent: "center",
        // alignItems: "center",
    },
    modalView: {
        width: "100%",
        height: '70%',
        backgroundColor: "white",
        // borderRadius: 20,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "rgb(130, 30, 1)",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

export default FixedFormulaSelector;
