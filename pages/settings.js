import React, { useCallback, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Linking, SafeAreaView, Pressable, TextInput, Alert } from "react-native"
import LanguageChanger from './languageChanger';

// redux 
import { useSelector, useDispatch } from "react-redux";
import { setUsername } from "../redux/actions/counts";

const portfolioURL = "http://dr-abdullah-nabeel.web.app";

const team_info = [
  {
    name: "Dr. Mubarik Mahmood",
    role: "Principal Investigator",
    position: "Assistant Professor, Animal Nutrition, UVAS, Lahore subcampus, Jhang"
  },
  {
    name: "Dr. Nasrullah Khan",
    role: "Co-Principal Investigator",
    position: "Associate Professor, University of the Punjab, Lahore"
  },
  {
    name: "Dr. Muhammad Zafar Ullah Khan",
    role: "Industrial Partner",
    position: "Director ARASS PVT Ltd, Lahore"
  },
  {
    name: "Ms. Kanwal Refique",
    role: "Others",
    position: "Lecturer Poultry Production,UVAS, Lahore subcampus, Jhang"
  },
  {
    name: "Mr. Abdul Ayaz Khan",
    role: "Others",
    position: "Lecturer, IT, UVAS, Lahore subcampus, Jhang"
  },
  {
    name: "Dr. Muhammad Abdullah Nabeel",
    role: "Others",
    position: "Student"
  }
]

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  }, [url]);

  return <Text onPress={handlePress}>{children}</Text>;
};

function Settings() {
  const [text, onChangeText] = React.useState('Text under testing');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 10 }}>
        <Text style={[styles.ptext, { alignSelf: "center" }]}>Under Development</Text>
        <Text style={[styles.ptext, { alignSelf: "center" }]}>We are considering only CP and ME at this time</Text>

        <LanguageChanger />

        {/* redux */}
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.title}>Redux Text Testing state</Text>
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />

            {/* <Text>{name}</Text> */}
          </View>
        </View>

        <View>
          <Text style={styles.title}>Guidelines</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.ptext}>
              1. Choose your animal and its parameters, it will help us identify the nutrient requirements of the animals
            </Text>
            <Text style={styles.ptext}>
              2. Then select the feed stuffs, you have to choose at least one feedstuff from each of given 4 categories,
              This will save the data of available feedstuffs, we extract price and nutrient compositions of selected feedstuffs for next step.
            </Text>
            <Text style={styles.ptext}>
              3. Now the next page will contain the formulas generated scientifically using linear programming,
              This page can result into warning, if the algorithm thinks that selected feedtuffs cant meet the nutrient requirements of animal.
              This can occur due to:
            </Text>
            <Text style={styles.ptext}>
              a. If the animal requires too much nutrients ( High values of CP and ME), we are still working on it to minimize this error
              by updating our feedstuffs
            </Text>
            <Text style={styles.ptext}>
              b. If the selected feedstuffs are low in nutrients, this can be compensated by selecting more feedstuffs
              (A use case is when the combination of even all selected feedstuffs CP doesn't sum up to the required CP keeping in mind inclusion levels etc.)
            </Text>
            <Text style={styles.ptext}>
              c. Sometimes miscellaneous errors can happen and we note that error whenever any user gets this error.
              However, probabilty of such error is low (A use case is when the user has no internet)
            </Text>
          </View>
        </View>

        {/* Project Information */}
        <View>
          <Text style={styles.title}>Project Information</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.ptext}>
              The project, sponsored by the Arass Foundation and the University of Veterinary and Animal Sciences Lahore,
              aimed to develop a mobile app as an extension of veterinary knowledge. The app, which utilizes a least cost feed formulation algorithm,
              allows farmers to formulate efficient feed formulas using available feedstuffs.
              The motivation behind the project was to translate the knowledge of animal nutrition to farmers,
              particularly those in remote areas, and empower them to utilize modern technologies and
              knowledge for the profitable living of their animals. The app, which can be used on a mobile device,
              remotely, allows farmers to formulate feed on the palm of their
              hand as long as they have internet access.
            </Text>
          </View>
        </View>

        {/* Team */}
        <View>
          <Text style={styles.title}>Team</Text>
          <View style={styles.contentContainer}>
            {
              team_info.map(
                (k, i) => (
                  <View key={i} style={{ margin: 5, borderBottomWidth: 2, borderBottomColor: 'black' }}>
                    <Text style={{ fontWeight: 'bold' }}>{k.role}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{k.name}</Text>
                    <Text>{k.position}</Text>
                  </View>
                )
              )
            }
          </View>
        </View>

        {/* Contact */}
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.title}>Contact Us</Text>
          <View style={styles.contentContainer}>
            <Text>
              Email:
              <OpenURLButton url='mailto:2018-dvmj-007@uvas.edu.pk/'>
                <Text style={{ color: 'blue' }}>contact@uvagro.com</Text>
              </OpenURLButton>
            </Text>
            <Text>
              UVAS:
              <OpenURLButton url='https://uvas.edu.pk/'>
                <Text style={{ color: 'blue' }}>https://uvas.edu.pk</Text>
              </OpenURLButton>
            </Text>
            <Text>
              ARASS:
              <OpenURLButton url='https://arass.org/'>
                <Text style={{ color: 'blue' }}>https://arass.org</Text>
              </OpenURLButton>
            </Text>
          </View>
        </View>

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


export default Settings;