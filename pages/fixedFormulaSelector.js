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

// here new
const local_bw = [
    { label: '400', value: 400 },
    { label: '450', value: 450 },
    { label: '500', value: 500 },
];

const breed_data = ['Local', "Imported"];

const imported_bw = [
    { label: '600', value: 600 },
    { label: '650', value: 650 },
    { label: '700', value: 700 },
    { label: '750', value: 750 }
];

const feed_categories_based_on_feedstuffs = [
    'Maize fodder based',
    'Sorghum fodder based',
    'Barseem fodder based',
    'Alfalfa fodder based',
    'Corn silage based'
]

const before_weaning_local_wt = [20,25,30]
const before_weaning_imported_wt = [40,50,60,70,80]

const calf_wt_after_weaning_local = [40,60,80,100,130,160,190]
const calf_wt_after_weaning_imported = [100,150,200,250,300,350,400,450,500,550,600]

const drycow_local_wt = [400,450,500]
const drycow_imported_wt = [600,650,700,750]

const closeup_local_wt = [400,450,500]
const closeup_imported_wt = [600,650,700,750]


const prepare_dropdown_data = (data_array) => {
    const dropdown_data = data_array.map(value => ({ label: value.toString().toUpperCase(), value }));
    // console.log(dropdown_data);
    return dropdown_data
}

const DropdownData = ({ data, statement, translated, placeholderText, inputCheck, setInputCheck }) => {
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
                    setInputCheck({
                        ...inputCheck, // Copy the old fields
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


const OnlyModal = ({ visible, setVisible, animal, navigation, input, stage }) => {
    const [error, setError] = useState(true)
    // const [input, setInput] = useState([])
    // const [inputData, setInputData] = useState([])
    const [inputData, setInputData] = useState({
        'breed': breed_data, 
        'weight': ['Please Select Breed First'], 
        'major_feedstuff': feed_categories_based_on_feedstuffs
    })
    const [inputCheck, setInputCheck] = useState({'breed': null, 'weight': null, 'major_feedstuff':null})

    useEffect(()=>{
        if (inputCheck['breed'] == 'local') {
            alert("Local")
            // setInputData()
        }
        if (inputCheck['breed'] == 'imported') {
            alert("Imported")
        }

    }, [inputCheck])


    const { t } = useTranslation();

    
    useEffect(()=>{
        function hasEmptyValues(obj) {
            for (const key in obj) {
              if (obj[key] === null || obj[key] === '' || obj[key] === undefined) {
                return true; // Return true if any key has an empty, null, or undefined value
              }
            }
            return false; // Return false if all keys have non-empty, non-null, and defined values
          }
        
          setError(hasEmptyValues(inputCheck))
        
    }, [inputCheck])

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
                    }}
                >
                    <View style={[styles.centeredView, { backgroundColor: "rgba(50, 50, 50, 0.5)" }]}>
                        <View style={[styles.modalView, { backgroundColor: "rgba(255, 255, 255, 1)" }]}>
                        <Text style={[styles.modalText, { fontSize: 18, fontWeight: 'bold' }]}>
                                {t("your animal")} {t(animal)}
                            </Text>
                            <Text style={[styles.modalText, { fontSize: 18, fontWeight: 'bold' }]}>
                                {stage}
                            </Text>

                            <Text>
                                <View>
                                {
                                    Object.keys(inputData).map((item)=>{
                                        return (
                                            <Text>
                                                {/* {JSON.stringify(item)}
                                                ==============
                                                {JSON.stringify(inputData[item])}
                                                ==============------------ */}
                                                <DropdownData
                                                    data={prepare_dropdown_data(inputData[item])}
                                                    statement="Testing !!"
                                                    translated={t("Testing")}
                                                    placeholderText={item}
                                                    inputCheck={inputCheck} setInputCheck={setInputCheck}
                                                />

                                            </Text>
                                        )
                                    })
                                }
                                </View>
                                <View>     
                                    <Text>
                                    inputData
                                    {
                                        JSON.stringify(inputData)
                                    }    
                                    </Text>   

                                    <Text>
                                    Input Check
                                    {
                                        JSON.stringify(inputCheck)
                                    }    
                                    </Text>   

                                    {/* <DropdownData
                                        data={prepare_dropdown_data(closeup_local_wt)}
                                        statement="Testing !!"
                                        translated={t("Testing")}
                                        placeholderText={t("Body Weight") + " (" + (["Body Weight"]).toString() + "Kg)"}
                                        inputCheck={inputCheck} setInputCheck={setInputCheck}
                                    /> */}

                                </View>
                            </Text>

                            {
                                error ? (
                                    <Text style={[styles.textStyle, { marginTop: 30, color: "red" }]}>{t("animal parameter error")}</Text>) : (
                                    <Pressable
                                        style={[styles.button, styles.buttonClose, { margin: 10 }]}
                                        onPress={() => {
                                            setVisible(false)
                                            navigation.navigate('Fixed Feedstuffs', { details: '' });
                                        }}
                                    >
                                        <Text style={styles.textStyle}>{t("animal parameter next")}</Text>
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

const stages_of_cattle = [
    'before_weaning',
    'after_weaning',
    'dry_period',
    'closeup'
]

const FixedFormulaSelector = ({ route, navigation }) => {
    const [visible, setVisible] = useState(false);
    const [species, setSpecies] = useState('')
    const [stage, setStage] = useState('')
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

            {/* <OnlyModal visible={visible} setVisible={setVisible} stage={stage} navigation={navigation} animal={species} input={input} /> */}
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
            <TouchableOpacity onPress={() => { setVisible(true), setSpecies(species) }}>
                <Image style={styles.image} source={picture} />
                <Text>{stage}</Text>
            </TouchableOpacity>
            <OnlyModal visible={visible} setVisible={setVisible} stage={stage} navigation={navigation} animal={species} input={input} />
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
