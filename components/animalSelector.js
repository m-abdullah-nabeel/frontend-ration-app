import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Alert, Modal, Pressable } from "react-native";
// import { Dropdown } from 'react-native-material-dropdown';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const bodyWeights = [
  { label: '300', value: 300 },
  { label: '350', value: 350 },
  { label: '400', value: 400 },
  { label: '450', value: 450 },
  { label: '500', value: 500 },
  { label: '550', value: 550 },
  { label: '600', value: 600 },
  { label: '650', value: 650 },
  { label: '700', value: 700 },
];

const milkProduc = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: '25', value: 25 },
  { label: '30', value: 30 },
  { label: '35', value: 35 },
  { label: '40', value: 40 },
];

const DropdownCom = ({ data, statement, placeholderText, cond, setCond }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue', fontWeight: '700' }]}>
          {statement}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={{ width: '80%', margin: 10 }}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
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
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  )
}

const OnlyModal = ({ visible, setVisible, animal, navigation }) => {
  const [error, setError] = useState(true)
  const [cond, setCond] = useState({
    species: 'cattle',
    "Body Weight": '',
    "Milk Production": ''
  })
  // console.log(cond)

  useEffect(() => {
    // uncomment this to see logs
    // console.log(cond)
    // console.log(Object.values(cond))
    // console.log(Object.values(cond).includes(""))
    // console.log("########################")

    // errors logic
    Object.values(cond).includes("")
      ? setError(true)
      : setError(false)
  }, [cond])

  return (
    <View
      style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'column' }}
    >
      <Modal
        animationType="slide" transparent={true} visible={visible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setVisible(false);
        }}
      >
        <View style={[styles.centeredView, { backgroundColor: "rgba(100, 100, 100, 0.2)" }]}>
          <View style={[styles.modalView, { backgroundColor: "rgba(139, 150, 150, 1)" }]}>
            {/* <Text>Errors: {JSON.stringify(error)}</Text>
            {
              Object.entries(cond).map(v => {
                return (
                  <Text key={v}>{v[0]} = {v[1]}</Text>
                )
              })
            }
            <Text>{JSON.stringify(cond)}</Text> */}
            <Text style={[styles.modalText, { fontSize: 18, fontWeight: 'bold' }]}>Select Parameters of {animal}</Text>

            <DropdownCom
              data={bodyWeights}
              // change statement name in above cond of errors if ever change this
              statement={"Body Weight"}
              placeholderText={"Select Body Weight"}
              cond={cond}
              setCond={setCond}
            />

            <DropdownCom
              data={milkProduc}
              // change statement name in above cond of errors
              statement={"Milk Production"}
              placeholderText={"Select Milk Production"}
              cond={cond}
              setCond={setCond}
            />

            {
              error ? "" : (
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setVisible(false)
                    navigation.navigate('Stuff Selector', { animal: animal });
                  }}
                >
                  <Text style={styles.textStyle}>Go to feedstuffs</Text>
                </Pressable>

              )
            }
          </View>
        </View>
      </Modal >
    </View >
  )
}

const AnimalSelector = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [species, setSpecies] = useState('')

  return (
    <View>
      <View style={{
        backgroundColor: 'rgb(0, 100, 0)', borderRadius: 50,
        paddingLeft: 20, paddingTop: 15, paddingBottom: 15, paddingRight: 20, marginBottom: 10,
      }}>
        <Text style={{
          color: 'white',
          fontSize: 24, fontWeight: 'bold', //paddingBottom: 5,
        }}>
          Select Your Animal
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
        {/* <View style={styles.animal}>
          <TouchableOpacity onPress={() => { setVisible(true), setSpecies("Camel") }}>
            <Image style={styles.image} source={require('../assets/animals/camel.png')} />
          </TouchableOpacity>
        </View> */}
        {/* <View style={styles.animal}>
          <TouchableOpacity onPress={() => { setVisible(true), setSpecies("Goat") }}>
            <Image style={styles.image} source={require('../assets/animals/goat.png')} />
          </TouchableOpacity>
        </View> */}
        {/* <View style={styles.animal}>
          <TouchableOpacity onPress={() => { setVisible(true), setSpecies("Sheep") }}>
            <Image style={styles.image} source={require('../assets/animals/sheep.png')} />
          </TouchableOpacity>
        </View> */}
        {/* <View style={styles.animal}>
          <TouchableOpacity onPress={() => { setVisible(true), setSpecies("Horse") }}>
            <Image style={styles.image} source={require('../assets/animals/horse.png')} />
          </TouchableOpacity>
        </View> */}

        <OnlyModal visible={visible} setVisible={setVisible} navigation={navigation} animal={species} />

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
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 9
  },
  modalView: {
    // margin: 20,
    // marginBottom: 10,
    width: "100%",
    height: '40%',
    backgroundColor: "white",
    borderRadius: 20,
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
