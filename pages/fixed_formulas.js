import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Linking, SafeAreaView, Pressable, TextInput, Alert } from "react-native"
import FixedFormulaLibrary from '../assets/data/fixed_formulas/_combined.json';

function Fixed_Formulas({ route }) {
    const [fixedRes, setFixedRes] = useState([])
    const { details } = route.params;
    console.log("details on the results page: ")
    console.log(details)

    const getNutriReq = (animalData) => {
        console.log("=============================== Animal Data ==================================")
        console.log(animalData)
        // console.log(animalData)

        // console.log(animalData['species'])

        let bw = animalData['Body Weight']
        let mp = animalData['Milk Production']
        let sp = animalData['species']
        let ss = animalData['Season']

        let found = FixedFormulaLibrary
            .filter(item => item["Body weight"] == bw && item["Milk (lit)"] == mp && item["Species"] == sp && item["Season"] == ss)
        console.log(found)
        setFixedRes(found)
    }

    useEffect(() => {
        getNutriReq(details)
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ padding: 10 }}>
                <Text>
                    fixed formulas are here
                </Text>
                <Text>
                    Results Found:  {0 || fixedRes.length}
                </Text>
                {fixedRes.map(i => (
                    <View key={JSON.stringify(i["Main Fodder"])}>
                        <Text style={{ fontWeight: 'bold' }}>Formula temp identication: {JSON.stringify(i["Main Fodder"])}</Text>
                        <Text></Text>
                        <Text>Formula details: {JSON.stringify(i)}</Text>
                    </View>
                ))}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        backgroundColor: 'rgb(100, 10, 10)',
        color: 'white',
        padding: 5,
        paddingLeft: 15,
        fontWeight: '500',
        borderRadius: 15,
    },
    contentContainer: {
        margin: 10
    },
    ptext: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'justify',
    },
    dropdown: {
        height: 50,
        backgroundColor: 'red',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontSize: 12,
        backgroundColor: 'yellow',
        textAlign: 'center'
    },

});


export default Fixed_Formulas;