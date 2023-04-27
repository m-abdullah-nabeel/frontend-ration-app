import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Alert, Modal, Pressable } from "react-native";
// import { Dropdown } from 'react-native-material-dropdown';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

// testing language
import { useTranslation } from 'react-i18next';

const large_ruminant_bw = [
  { label: '300', value: 300 },
  { label: '350', value: 350 },
  { label: '400', value: 400 },
  { label: '450', value: 450 },
  { label: '500', value: 500 },
  { label: '550', value: 550 },
  { label: '600', value: 600 },
  // { label: '650', value: 650 },
  // { label: '700', value: 700 },
];

const large_ruminant_mp = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  // { label: '25', value: 25 },
  // { label: '30', value: 30 },
  // { label: '35', value: 35 },
  // { label: '40', value: 40 },
];

const small_ruminant_bw = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
  { label: '40', value: 40 },
  { label: '50', value: 50 },
  { label: '60', value: 60 },
  { label: '70', value: 70 },
  { label: '80', value: 80 },
  { label: '90', value: 90 },
  { label: '100', value: 100 },
];

const small_ruminant_mp = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 }
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

const OnlyModal = ({ visible, setVisible, animal, navigation, input }) => {
  const [error, setError] = useState(true)
  const [cond, setCond] = useState({
    "species": '',
    "Body Weight": '',
    "Milk Production": ''
  });

  const { t } = useTranslation();

  useEffect(() => {
    console.log("####################################################")
    console.log(input)
    console.log("Species: " + JSON.stringify(cond['species']))
    // uncomment this to see logs
    console.log(cond)
    // console.log(cond['species'])
    // console.log(cond['Body Weight'])
    // console.log(cond['Milk Production'])
    // console.log(cond)
    // console.log(Object.values(cond))
    // console.log(Object.values(cond).includes(""))
    // console.log("########################")

    // errors logic
    Object.values(cond).includes("")
      ? setError(true)
      : setError(false)
  }, [cond])

  useEffect(() => {
    // setVisible(false);
    setError(true);
    setCond({
      species: animal,
      "Body Weight": '',
      "Milk Production": ''
    })
  }, [visible])

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'column' }}>
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
              species: animal,
              "Body Weight": '',
              "Milk Production": ''
            })
          }}
        >
          <View style={[styles.centeredView, { backgroundColor: "rgba(50, 50, 50, 0.5)" }]}>
            <View style={[styles.modalView, { backgroundColor: "rgba(255, 255, 255, 1)" }]}>
              <Text style={[styles.modalText, { fontSize: 18, fontWeight: 'bold' }]}>
                {t("your animal")} {t(animal)}
              </Text>

              <DropdownCom
                // data={inputs[0]}
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

              {
                error ? (<
                  Text style={[styles.textStyle, { marginTop: 30, color: "red" }]}>{t("animal parameter error")}</Text>) : (
                  <Pressable
                    style={[styles.button, styles.buttonClose, { margin: 10 }]}
                    onPress={() => {
                      setVisible(false)
                      navigation.navigate('Stuff Selector', { animal: animal, req_data: cond });
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

const AnimalSelector = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [species, setSpecies] = useState('')
  const [input, setInput] = useState([])

  const { t } = useTranslation();

  useEffect(() => {
    console.log(JSON.stringify(species) + " is selected")
    if (species == 'Cattle' || species == "Buffalo") {
      console.log("A large ruminant " + JSON.stringify(species) + " is selected")
      setInput([large_ruminant_bw, large_ruminant_mp])
    }
    if (species == 'Goat' || species == "Sheep") {
      console.log("A small ruminant " + JSON.stringify(species) + " is selected")
      setInput([small_ruminant_bw, small_ruminant_mp])
    }

  }, [species])

  // console.log(species)

  return (
    <View>
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

      <View style={{
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'
      }}>

        <View style={styles.animal}>
          <TouchableOpacity onPress={() => { setVisible(true), setSpecies("Cattle") }}>
            <Image style={styles.image} source={require('../assets/animals/cow.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.animal}>
          <TouchableOpacity onPress={() => { setVisible(true), setSpecies("Buffalo") }}>
            <Image style={styles.image} source={require('../assets/animals/buffalo.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.animal}>
          <TouchableOpacity onPress={() => { setVisible(true), setSpecies("Goat") }}>
            <Image style={styles.image} source={require('../assets/animals/goat.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.animal}>
          <TouchableOpacity onPress={() => { setVisible(true), setSpecies("Sheep") }}>
            <Image style={styles.image} source={require('../assets/animals/sheep.png')} />
          </TouchableOpacity>
        </View>

        <OnlyModal visible={visible} setVisible={setVisible} navigation={navigation} animal={species} input={input} />

      </View>
    </View >
  )
}

export default AnimalSelector;

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
