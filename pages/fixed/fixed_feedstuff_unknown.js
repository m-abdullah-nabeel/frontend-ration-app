import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, FlatList, SectionList, StatusBar, Button, Pressable } from "react-native";
// testing language
import { useTranslation } from 'react-i18next';
import { t } from "i18next";

const FixedFeedStuffs = [
    "Barseem and wheat straw based",
    "Alfalfa and wheat straw based",
    "Maize based",
    "Sorghum based",
    "Maize Silage based"
]

const FixedStuffSelector = ({ route, navigation }) => {
    const [fodder, setFodder] = useState('');
    const { details } = route.params;

    useEffect(() => {
        details["Main Fodder"] = fodder
        console.log(details)

    }, [fodder])

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'rgb(10, 100, 10)', borderRadius: 50, padding: 10, marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 28, paddingLeft: 15, color: 'white', alignSelf: "center" }}>{t("select main fodder")}</Text>
                <Text style={{ fontWeight: 'light', fontSize: 14, paddingLeft: 15, color: 'white', alignSelf: "center" }}>
                    {t("your animal")} {t(details["species"])}
                </Text>
            </View>

            <View>
                {
                    FixedFeedStuffs.map(
                        (x) => {
                            return (
                                <TouchableOpacity key={x}
                                    style={[styles.item]}
                                    onPress={() => {
                                        setFodder(x)
                                        navigation.navigate('Fixed Formula Display', { details: details });
                                        console.log("details==========")
                                        console.log(details)
                                    }}

                                >
                                    <Text
                                        style={{ fontSize: 18, fontWeight: 'bold' }}
                                    >
                                        {t(x)}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    )
                }

            </View>
        </ScrollView>
    )
}

export default FixedStuffSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginVertical: 8
    },
    header: {
        fontSize: 24,
        fontWeight: '800',
        borderRadius: 20,
        padding: 10,
        paddingLeft: 20,
        backgroundColor: 'rgb(200, 200, 200)'
    },
    title: {
        fontSize: 24
    }
});
