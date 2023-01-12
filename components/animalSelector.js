import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Alert, Modal, Pressable } from "react-native";

const OnlyModal = ({ visible, setVisible, animal, navigation }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide" transparent={true} visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Age</Text>
            <Text style={styles.modalText}>Select Body Weight</Text>
            <Text style={styles.modalText}>Select Production</Text>
            {/* <Text style={styles.modalText}>{visible}</Text> */}
            <Text style={styles.modalText}>{animal}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setVisible(false)
                navigation.navigate('Stuff Selector', { animal: animal });
              }}
            >
              <Text style={styles.textStyle}>Go to feedstuffs</Text>
            </Pressable>
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
      <Text style={{
        backgroundColor: 'rgb(0, 100, 0)', color: 'white', borderRadius: 50,
        paddingLeft: 20, paddingTop: 15, paddingBottom: 15, paddingRight: 20,
        fontSize: 24, fontWeight: 'bold'
      }}>
        Select Your Animal
      </Text>

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
          <TouchableOpacity onPress={() => { setVisible(true), setSpecies("Camel") }}>
            <Image style={styles.image} source={require('../assets/animals/camel.png')} />
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
        <View style={styles.animal}>
          <TouchableOpacity onPress={() => { setVisible(true), setSpecies("Horse") }}>
            <Image style={styles.image} source={require('../assets/animals/horse.png')} />
          </TouchableOpacity>
        </View>

        <OnlyModal visible={visible} setVisible={setVisible} navigation={navigation} animal={species} />

      </View>
    </View >
  )
}

export default AnimalSelector;







const styles = StyleSheet.create({
  animal: {
    borderColor: 'black',
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
    marginTop: 22
  },
  modalView: {
    margin: 20,
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
    backgroundColor: "#2196F3",
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
