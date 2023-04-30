import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Linking, SafeAreaView, TouchableOpacity, Image } from "react-native"
import FixedFormulaLibrary from '../assets/data/fixed_formulas/_combined.json';
import { useTranslation } from 'react-i18next';

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

        let bw = animalData['Body Weight']
        let mp = animalData['Milk Production']
        let sp = animalData['species']
        let ss = animalData['Main Fodder']

        let found = FixedFormulaLibrary
            .filter(item => item["Body Weight"] == bw && item["Milk (lit)"] == mp && item["Species"] == sp && item["Main Fodder"] == ss)
        console.log(found)
        setFixedRes(found)
    }

    useEffect(() => {
        findFixedFormula(details)
    }, [details])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ margin: 10, marginTop: 0 }}>
                <View style={{ backgroundColor: 'rgb(10, 100, 10)', borderRadius: 50, padding: 10, marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 28, paddingLeft: 15, color: 'white', alignSelf: "center" }}>{t("Your Fixed Formula")}</Text>
                    <Text style={{ fontWeight: 'light', fontSize: 14, paddingLeft: 15, color: 'white', alignSelf: "center" }}>
                        {t("Details")}
                    </Text>
                </View>

                <View style={{ backgroundColor: "pink", opacity: 0.7, padding: 10, borderColor: 'green', borderWidth: 3, borderRadius: 10 }}>
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
                                                {/* {t(k)} */}
                                                {/* {t("Barseem")} */}
                                                {console.log(t(`${k.split("(kg)")[0].split("(grams)")[0]}`))}
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

                </View>

                {/* sponsors display */}
                <View style={{
                    flex: 1, width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around',
                    borderColor: "black", borderWidth: 1, backgroundColor: 'rgb(10, 100, 10)', height: 50, marginTop: 20
                }}>

                    <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 100, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                        <Text style={{
                            alignSelf: 'center', padding: 3, fontSize: 12, textAlign: "center", fontWeight: 'bold',
                        }}>
                            Visit Our Team
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={async () => await Linking.openURL(url_arass)}
                    >
                        <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 100, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <Image
                                style={{ width: 50, height: 27 }}
                                source={require('../assets/arass.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={async () => await Linking.openURL(url_uvas)}
                    >
                        <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 100, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <Image
                                style={{ width: 50, height: 23 }}
                                source={require('../assets/uvas-big.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

export default Fixed_Formulas;