import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Alert, Modal, Pressable } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
// testing language
import { useTranslation } from 'react-i18next';

const fixed_formula_spcs = [
    { label: 'Cattle', value: 'Cattle' },
    { label: 'Buffalo', value: 'Buffalo' },
];

const fixed_formula_bw_cattle = [
    { label: '350', value: 350 },
    { label: '400', value: 400 },
    { label: '450', value: 450 },
];

const fixed_formula_mp_cattle = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
];

const fixed_formula_bw_buffalo = [
    { label: '500', value: 500 },
    { label: '600', value: 600 },
];

const fixed_formula_mp_buffalo = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
];

const DropdownCom = ({ data, statement, translated, placeholderText, cond, setCond }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'rgb(130, 30, 1)', fontWeight: '700' }]}>
                    {/* {statement} */}
                    {translated}
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={{ width: '80%', margin: 10 }}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'rgb(130, 30, 1)' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? placeholderText : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setCond({
                        ...cond, // Copy the old fields
                        [statement]: item.value // But override this one
                    });
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'rgb(130, 30, 1)' : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />
        </View>
    )
}

const OnlyModal = ({ visible, setVisible, animal, navigation, season }) => {
    const [error, setError] = useState(true)
    const [input, setInput] = useState([])
    const [cond, setCond] = useState({
        "Season": season,
        "species": '',
        "Body Weight": '',
        "Milk Production": ''
    });

    const { t } = useTranslation();
    let species = JSON.stringify(cond['species'])

    useEffect(() => {
        console.log("####################################################")
        console.log("input: ")
        console.log(input)
        console.log("Species: " + JSON.stringify(cond['species']))
        // uncomment this to see logs
        console.log(cond)
        species = cond['species']

        // errors logic
        Object.values(cond).includes("")
            ? setError(true)
            : setError(false)
    }, [cond])

    useEffect(() => {
        // console.log(JSON.stringify(species) + " is Changed as species")
        if (species == 'Cattle') {
            console.log("Species: " + JSON.stringify(species) + " is selected")
            setInput([fixed_formula_bw_cattle, fixed_formula_mp_cattle])
        }
        if (species == 'Buffalo') {
            console.log("Species: " + JSON.stringify(species) + " is selected")
            setInput([fixed_formula_bw_buffalo, fixed_formula_mp_buffalo])
        }

        setCond({
            ...cond, // Copy the old fields
            "Milk Production": '',   // But override this one
            "Body Weight": ''  // But override this one
        });

    }, [species])

    useEffect(() => {
        setError(true);
        setCond({
            "Season": season,
            "species": '',
            "Body Weight": '',
            "Milk Production": ''
        })
    }, [visible])

    return (
        <View
            style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'column' }}
        >
            <TouchableOpacity onPress={() => { setVisible(false) }}>
                <Modal
                    animationType="slide" transparent={true} visible={visible}
                    statusBarTranslucent={true} animated={true}
                    // onback
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setVisible(false);
                        setError(true);
                        setCond({
                            "Season": season,
                            species: animal,
                            "Body Weight": '',
                            "Milk Production": ''
                        })
                    }}
                >
                    <View style={[styles.centeredView, { backgroundColor: "rgba(50, 50, 50, 0.5)" }]}>
                        <View style={[styles.modalView, { backgroundColor: "rgba(255, 255, 255, 1)" }]}>
                            {/* <Text style={[styles.modalText, { fontSize: 18, fontWeight: 'bold' }]}>
                                {t("your animal")} {t(animal)}
                            </Text> */}
                            <Text style={[styles.modalText, { fontSize: 18, fontWeight: 'bold' }]}>
                                select parameters
                            </Text>

                            <DropdownCom
                                // data={inputs[0]}
                                data={fixed_formula_spcs}
                                // change statement name in above cond of errors if ever change this
                                statement="species"
                                translated="Select Species"
                                // translated={t("Body Weight")}
                                placeholderText="Made to Select Cattle or Buffalo"
                                // placeholderText={t("Body Weight") + " (" + (cond["Body Weight"]).toString() + "Kg)"}
                                cond={cond}
                                setCond={setCond}
                            />

                            {
                                cond['species'] == '' ?
                                    null :
                                    (
                                        <>
                                            <DropdownCom
                                                data={input[0]}
                                                // change statement name in above cond of errors if ever change this
                                                statement="Body Weight"
                                                translated={t("Body Weight")}
                                                placeholderText={t("Body Weight") + " (" + (cond["Body Weight"]).toString() + "Kg)"}
                                                cond={cond}
                                                setCond={setCond}
                                            />

                                            <DropdownCom
                                                data={input[1]}
                                                // change statement name in above cond of errors
                                                statement="Milk Production"
                                                translated={t("Milk Production")}
                                                placeholderText={t("Milk Production") + " (" + (cond['Milk Production']).toString() + "Litres)"}
                                                cond={cond}
                                                setCond={setCond}
                                            />

                                        </>
                                    )
                            }

                            {
                                error ? (<
                                    Text style={[styles.textStyle, { marginTop: 30, color: "red" }]}>{t("animal parameter error")}</Text>) : (
                                    <Pressable
                                        style={[styles.button, styles.buttonClose, { margin: 10 }]}
                                        onPress={() => {
                                            setVisible(false)
                                            navigation.navigate('Fixed Formula Display', { details: cond });
                                        }}
                                    >
                                        {/* <Text style={styles.textStyle}>{t("animal parameter next")}</Text> */}
                                        <Text style={styles.textStyle}>{t("Show Formulas")}</Text>
                                    </Pressable>
                                )
                            }
                        </View>
                    </View>
                </Modal >

            </TouchableOpacity>
        </View >
    )
}

const FixedFormulaSelector = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [species, setSpecies] = useState('')
    const [season, setSeason] = useState("")

    const { t } = useTranslation();

    return (
        <View style={{ flex: 1, }}>
            <View
                style={{
                    backgroundColor: 'rgb(0, 100, 0)', borderRadius: 50,
                    paddingLeft: 20, paddingTop: 15, paddingBottom: 15, paddingRight: 20, marginBottom: 10,
                }}
            >
                <Text style={{
                    color: 'white', alignSelf: "center",
                    fontSize: 24, fontWeight: 'bold'
                }}>
                    {/* {t("select animal header")} */}
                    Get Fixed Ration Formula
                </Text>

            </View>

            <View style={{ flex: 3 }}>
                <View style={{ flex: 1, justifyContent: "center", padding: 2 }}>
                    <TouchableOpacity onPress={() => { setVisible(true), setSpecies("Cattle"), setSeason("Summer") }}>
                        <View style={{ height: '100%', }}>
                            <Image source={require("../assets/images/summerFeed.jpg")}
                                style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                    justifyContent: 'center', alignItems: 'center',
                                    height: '100%', width: "100%",
                                    borderRadius: 10,
                                }}
                            />

                            <View style={{
                                position: 'absolute', top: 5, left: 5, right: 5, bottom: 5,
                                backgroundColor: "rgba(10, 100, 10, 0.5)", borderRadius: 5,
                                flex: 1, alignItems: "center", justifyContent: "center",
                            }}>
                                <Text style={{
                                    fontSize: 18, fontWeight: 'bold',
                                    padding: 15,
                                    color: 'white'
                                }}>{t('summer formula')}</Text>
                                <Text style={{
                                    fontSize: 12,
                                    fontWeight: "bold", alignSelf: 'center',
                                    color: 'white', textAlign: 'center',
                                    borderColor: 'white', borderWidth: 2, padding: 2
                                }}>{t('coming soon')}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 1, justifyContent: "center", padding: 2 }}>
                    <TouchableOpacity onPress={() => { setVisible(true), setSpecies("Cattle"), setSeason("Winter") }}>
                        <View style={{ height: '100%', }}>
                            <Image source={require("../assets/images/winterFeed.jpg")}
                                style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                    justifyContent: 'center', alignItems: 'center',
                                    height: '100%', width: "100%",
                                    borderRadius: 10,
                                }}
                            />

                            <View
                                style={{
                                    position: 'absolute', top: 5, left: 5, right: 5, bottom: 5,
                                    backgroundColor: "rgba(10, 100, 10, 0.5)", borderRadius: 5,
                                    flex: 1, alignItems: "center", justifyContent: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18, fontWeight: 'bold',
                                        padding: 15,
                                        color: 'white'
                                    }}
                                >{t('winter formula')}</Text>
                                <Text style={{
                                    fontSize: 12,
                                    color: 'white',
                                    borderBottomWidth: 2, fontWeight: "bold", borderBottomColor: 'white',
                                    alignSelf: 'center',
                                    borderColor: 'white', borderWidth: 2, padding: 2,
                                }}
                                >{t('coming soon')}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1 }}></View>

            <OnlyModal visible={visible} setVisible={setVisible} navigation={navigation} animal={species} season={season} />
        </View >
    )
}

export default FixedFormulaSelector;

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
