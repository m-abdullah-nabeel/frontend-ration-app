import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Alert, Modal, Pressable } from "react-native";
import Item from "./animalItem";

const ANIMALS = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Cattle / Buffalo',
    // image: 'goat',
    image: '../assets/animals/cow.png'

  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Sheep / Goat',
    image: 'goat'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Poultry',
    image: 'goat'
  },
];

// const Requiring = ({ visible, animal }) => {
//   const [modalVisible, setModalVisible] = useState(true);

//   return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Hello World! from Requiring</Text>
//             <Text style={styles.modalText}>{visible}</Text>
//             <Text style={styles.modalText}>{animal}</Text>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//       <Pressable
//         style={[styles.button, styles.buttonOpen]}
//         onPress={() => setModalVisible(true)}
//       >
//         <Text style={styles.textStyle}>Show Modal</Text>
//       </Pressable>
//     </View>
//   )
// }

const OnlyModal = ({ visible, setVisible, animal }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World! from OnlyModal</Text>
            <Text style={styles.modalText}>{visible}</Text>
            <Text style={styles.modalText}>{animal}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const AnimalSelector = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <View>
        <Text>{toString(visible)}</Text>
      </View>

      <View style={{}}>
        <Text style={{
          backgroundColor: 'rgb(0, 100, 0)', color: 'white', borderRadius: 50,
          paddingLeft: 20, paddingTop: 15, paddingBottom: 15, paddingRight: 20,
          fontSize: 24, fontWeight: 'bold'
        }}>
          {/* <Requiring visible={false} animal={'cow'} /> */}
          Select Your Animal
        </Text>
      </View>
      <View style={{
        flexDirection: 'row', margin: 10, flexWrap: 'wrap', alignItems: 'center', paddingLeft: 20
      }}>

        <TouchableOpacity
          // style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            setVisible(true)
          }}
        // onPress={() => { navigation.navigate('Stuff Selector', { animal: 'Cattle', }); }}
        >
          <View style={styles.animal}>
            <Image style={styles.image} source={require('../assets/animals/cow.png')} />
          </View>
        </TouchableOpacity>

        <OnlyModal visible={visible} setVisible={setVisible} animal={'cow'} />

        {/* <View>
          <TouchableOpacity onPress={() => { navigation.navigate('Stuff Selector', { animal: 'Cattle', }); }}>
            <View style={styles.animal}>
              <Image style={styles.image} source={require('../assets/animals/cow.png')} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { navigation.navigate('Stuff Selector', { animal: 'Buffalo', }); }}>
            <View style={styles.animal}>
              <Image style={styles.image} source={require('../assets/animals/buffalo.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Stuff Selector', { animal: 'Goat', }); }}>
            <View style={styles.animal}>
              <Image style={styles.image} source={require('../assets/animals/goat.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Stuff Selector', { animal: 'Sheep', }); }}>
            <View style={styles.animal}>
              <Image style={styles.image} source={require('../assets/animals/sheep.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Stuff Selector', { animal: 'Camel', }); }}>
            <View style={styles.animal}>
              <Image style={styles.image} source={require('../assets/animals/camel.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Stuff Selector', { animal: 'Horse', }); }}>
            <View style={styles.animal}>
              <Image style={styles.image} source={require('../assets/animals/horse.png')} />
            </View>
          </TouchableOpacity>
        </View> */}

      </View>
    </View >
  )
}

export default AnimalSelector;







const styles = StyleSheet.create({
  animal: {
    backgroundColor: "rgba(25, 0, 200, .5)",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 100,

  },
  image: {
    width: 120,
    height: 100,
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
