import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Linking, SafeAreaView, TouchableOpacity, Image } from "react-native"
import FixedFormulaLibrary from '../assets/data/fixed_formulas/_combined.json';
import StagedFixedFormulaLibrary from '../assets/data/fixed_formulas/stages_of_cattle.json';
import { useTranslation } from 'react-i18next';
import SponsorsDisplay from "./sposorsDisplay";

import { DataTable } from 'react-native-paper';
// import { Avatar, Button, Card, Text } from 'react-native-paper';
import { Card, Avatar } from 'react-native-paper';


function Fixed_Formulas({ route }) {
    const [fixedRes, setFixedRes] = useState();
    const { details } = route.params;
    const { t } = useTranslation();
    const DataToRemove = new Set(["Body Weight", "Milk (lit)", "Species", "Main Fodder", "Season"]);
    console.log("details on the results page: ")
    console.log(details)

    const findFixedFormula = (animalData) => {
        console.log("=============================== Animal Data ==================================")
        console.log(animalData)

        // let bw = animalData['Body Weight']
        // let mp = animalData['Milk Production']
        // let sp = animalData['species']
        // let ss = animalData['Main Fodder']

        let bw = animalData['Body Weight']['weight']
        let mp = animalData['Milk Production']['milk']
        let sp = animalData['species']['animal']
        let ss = animalData['Main Fodder']['feed']

        console.log(bw, mp, sp, ss)

        console.log("General Search for Feed Formula")
        let found = FixedFormulaLibrary
        .filter(item => item["Body Weight"] == bw && item["Milk (lit)"] == mp && item["Species"] == sp && item["Main Fodder"] == ss)
        console.log(found)
        setFixedRes(found)
    }

    useEffect(() => {
        findFixedFormula(details)
    }, [details])

    const LeftContent = props => <Image
    style={{width: 90, height: 90}}
    source={require('../assets/logo/icon.png')}
    />

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ margin: 10, marginTop: 0 }}>
                <Card>
                    <Card.Title 
                    title="Here is your feed recipie" 
                    right={LeftContent} 
                    titleVariant='headlineSmall' titleStyle={{fontWeight: "bold"}}
                    subtitle="UVA-gro"
                    />
                </Card>

                {/* <View style={{ backgroundColor: 'rgb(10, 100, 10)', borderRadius: 50, padding: 10, marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 28, paddingLeft: 15, color: 'white', alignSelf: "center" }}>{t("Your Fixed Formula")}</Text>
                    <Text style={{ fontWeight: 'light', fontSize: 14, paddingLeft: 15, color: 'white', alignSelf: "center" }}>
                        {t("Details")}
                    </Text>
                </View> */}

                <DataTable>
                    <DataTable.Header style={{backgroundColor: "rgba(10, 90, 10, 1)"}}>
                        <DataTable.Title textStyle={{color: 'white', fontWeight: "bold"}}>Feedstuffs</DataTable.Title>
                        <DataTable.Title textStyle={{color: 'white', fontWeight: "bold"}} numeric>Amount / Quantity</DataTable.Title>
                    </DataTable.Header>

                    {fixedRes && JSON.stringify(fixedRes[0]) !== '{}'
                            && Object.keys(fixedRes[0])
                                .filter((name) => {
                                    return !DataToRemove.has(name);
                                })
                                .map((k, i) => (
                        <DataTable.Row key={k}>
                                <DataTable.Cell>{
                                                    t(k.split("(kg)")[0].split("(grams)")[0])
                                                }
                                </DataTable.Cell>
                                <DataTable.Cell>
                                {fixedRes[0][k]}
                                                {
                                                    k.includes("(kg)") ?
                                                        " Kg" :
                                                        k.includes("(grams") ?
                                                            " Grams" :
                                                            "  "
                                                }
                                </DataTable.Cell>
                                {/* <DataTable.Cell numeric>{item.fat}</DataTable.Cell> */}
                        </DataTable.Row>
                    ))}

                </DataTable>


                {/* <View style={{ backgroundColor: "pink", opacity: 0.7, padding: 10, borderColor: 'green', borderWidth: 3, borderRadius: 10 }}>
                    <View>
                        {
                            fixedRes && JSON.stringify(fixedRes[0]) !== '{}'
                            && Object.keys(fixedRes[0])
                                .filter((name) => {
                                    return !DataToRemove.has(name);
                                })
                                .map((k, i) => (
                                    <View key={i}
                                        style={{
                                            flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center",
                                            borderBottomColor: 'rgb(120, 30, 0)', borderBottomWidth: 1,
                                        }}
                                    >
                                        <View style={{ height: 35, flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
                                            <Text style={{ fontSize: 14, fontWeight: '800', width: 200 }}>
                                                {
                                                    t(k.split("(kg)")[0].split("(grams)")[0])
                                                }
                                            </Text>
                                        </View>

                                        <View style={{ height: 35, flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
                                            <Text style={{ fontSize: 14, fontWeight: '800', width: 100 }}>
                                                {fixedRes[0][k]}
                                                {
                                                    k.includes("(kg)") ?
                                                        " Kg" :
                                                        k.includes("(grams") ?
                                                            " Grams" :
                                                            "  "
                                                }
                                            </Text>
                                        </View>
                                    </View>

                                ))
                        }
                    </View>
                </View> */}

                {/* sponsors display */}
                <SponsorsDisplay/>

            </ScrollView>
        </SafeAreaView>
    );
}

export default Fixed_Formulas;