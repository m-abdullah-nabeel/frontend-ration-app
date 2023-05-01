import React, { useCallback, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Linking, SafeAreaView, TouchableOpacity, TextInput, Alert, Image } from "react-native"

// redux 
// import { useSelector, useDispatch } from "react-redux";
// import { setUsername } from "../redux/actions/counts";

// const portfolioURL = "http://dr-abdullah-nabeel.web.app";

let testLoc = "abdullah.jpg"

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
        {/* redux */}
        {/* <View style={{ marginBottom: 30 }}>
          <Text style={styles.title}>Redux Text Testing state</Text>
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />

            <Text>{name}</Text>
          </View>
        </View> */}

        <View>
          <Text style={styles.title}>Guidelines</Text>
          <View style={styles.contentContainer}>
            <View>
              <Text style={{ borderColor: 'grey', borderWidth: 2, fontSize: 18, fontWeight: 'bold' }}>
                How to use this application
              </Text>
              <Text style={[styles.ptext, { borderColor: 'grey', borderWidth: 2 }]}>
                Please follow these steps for proper utilization of the application
                Open UVA-gro Application.
                You will see the following screen
                If you want to get fixed formula, click the tab "Get fixed feed formulas". Then follow these steps
                Step 1: Select season
                Step 2: Select your animal
                Step 3: Select weight and milk production level of your animal
                Step 4: Select main fodders you have
                Step 5: Relevant formula will appear on the screen
              </Text>
            </View>

            <View>
              <Text style={{ borderColor: 'grey', borderWidth: 2, fontSize: 18, fontWeight: 'bold' }}>
                If you want to get new formula by selecting your own feed ingredients, then follow these steps
              </Text>

              <Text style={[styles.ptext, { borderColor: 'grey', borderWidth: 2 }]}>
                Step 1: Click on the tab "formulate feed"
                Step 2: Select your animal
                Step 3: Select body weight and milk production level of your animal
                Step 4: Screen will appear from where you can select feed ingredients from 4 different categories. Select at least one ingredient from each category by scrolling down
                Step 5: Screen will appear with your required formulae based upon dry matter and as fed.
                Step 6: Use as fed formula fo feed your animal
              </Text>
            </View>

            <View>
              <Text style={{ borderColor: 'grey', borderWidth: 2, fontSize: 18, fontWeight: 'bold' }}>
                Please keep in mind some basic rules to properly use this application.
              </Text>

              <Text style={[styles.ptext, { borderColor: 'grey', borderWidth: 2 }]}>
                1. Select ingredients wisely, for example, it is better to select at least one succulent fodder along with one dry roughage for better results. Selection of too many dry roughages only or succulent fodders only may disturb the formula results.
                2. As body weight and milk production of your animal increases, try to increase the number of ingredients from each category.
                3. We are hoping for the best results based on least cost, however, 100% is not possible. In case of any problem please contact our team members via email or phone call.
              </Text>
            </View>

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
          <View style={[styles.contentContainer]}>
            <View
              style={{
                height: 140, borderRadius: 10, flexDirection: 'row', justifyContent: "space-between",
                borderBottomColor: 'grey', borderBottomWidth: 1
              }}
            >
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: 100, }}>
                <Image
                  style={{ width: 100, height: 100, borderRadius: 100 }}
                  source={require("../assets/images/team/mubarik.jpg")}
                />
              </View>

              <View style={{ flex: 1, justifyContent: "center", }}>
                <Text style={{ fontWeight: '600' }}>Principal Investigator</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Dr. Mubarik Mahmood</Text>
                <Text style={{ fontSize: 12 }}>Assistant Professor, Animal Nutrition, UVAS, Lahore subcampus, Jhang</Text>
              </View>
            </View>
          </View>
          <View style={[styles.contentContainer]}>
            <View
              style={{
                height: 140, borderRadius: 10, flexDirection: 'row', justifyContent: "space-between",
                borderBottomColor: 'grey', borderBottomWidth: 1
              }}
            >
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: 100, }}>
                <Image
                  style={{ width: 100, height: 100, borderRadius: 100 }}
                  source={require("../assets/images/team/nasrullah.jpg")}
                />
              </View>

              <View style={{ flex: 1, justifyContent: "center", }}>
                <Text style={{ fontWeight: '600' }}>Co-Principal Investigator</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Dr. Nasrullah Khan</Text>
                <Text style={{ fontSize: 12 }}>Associate Professor, University of the Punjab, Lahore</Text>
              </View>
            </View>
          </View>
          <View style={[styles.contentContainer]}>
            <View
              style={{
                height: 140, borderRadius: 10, flexDirection: 'row', justifyContent: "space-between",
                borderBottomColor: 'grey', borderBottomWidth: 1
              }}
            >
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: 100, }}>
                <Image
                  style={{ width: 100, height: 100, borderRadius: 100 }}
                  source={require("../assets/images/team/zafarullah.jpg")}
                />
              </View>

              <View style={{ flex: 1, justifyContent: "center", }}>
                <Text style={{ fontWeight: '600' }}>Industrial Partner</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Dr. Muhammad Zafar Ullah Khan</Text>
                <Text style={{ fontSize: 12 }}>Director ARASS PVT Ltd, Lahore</Text>
              </View>
            </View>
          </View>

          <View style={[styles.contentContainer]}>
            <View
              style={{
                height: 140, borderRadius: 10, flexDirection: 'row', justifyContent: "space-between",
                borderBottomColor: 'grey', borderBottomWidth: 1
              }}
            >
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: 100, }}>
                <Image
                  style={{ width: 100, height: 100, borderRadius: 100 }}
                  source={require("../assets/images/team/abdullah.jpg")}
                />
              </View>

              <View style={{ flex: 1, justifyContent: "center", }}>
                <Text style={{ fontWeight: '600' }}>App Developer</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Dr. Muhammad Abdullah Nabeel</Text>
                <Text style={{ fontSize: 12 }}>Tech Lead, CyberSecure Solutions</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact */}
        {/* <View style={{ marginBottom: 30 }}>
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
        </View> */}

        {/* sponsors displayed */}
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={{
            backgroundColor: 'rgb(10, 100, 10)',
            width: '100%', height: 50, marginBottom: 10,
            flexDirection: 'row', alignItems: "center", justifyContent: 'space-around',
            borderColor: "black", borderWidth: 1,
          }}>
            {/* <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 105, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
              <Text style={{
                alignSelf: 'center', padding: 3, fontSize: 12, textAlign: "center", fontWeight: 'bold',
              }}>
                Visit Our Team
              </Text>

            </View> */}

            <TouchableOpacity
              onPress={async () => await Linking.openURL(url_arass)}
            >
              <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 150, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <Image
                  style={{ width: 50, height: 27 }}
                  source={require('../assets/arass.png')}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => await Linking.openURL(url_uvas)}
            >
              <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 150, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <Image
                  style={{ width: 50, height: 23 }}
                  source={require('../assets/uvas-big.png')}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* <View style={{ flexDirection: "row", alignSelf: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ width: 100, height: 45 }}
                        source={require('../assets/uvas-big.png')}
                    />
                    <Image
                        style={{ width: 100, height: 45 }}
                        source={require('../assets/arass.png')}
                    />
                </View> */}
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