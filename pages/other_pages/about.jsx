import React, { useCallback, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Linking, SafeAreaView, TouchableOpacity, TextInput, Alert, Image } from "react-native"
import SponsorsDisplay from "../components/sponsors_display";

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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 10 }}>
        {/* Team */}
        <Team/>
        {/* Guidelines */}
        <Guidelines/>
        {/* Project Information */}
        <ProjectInfo/>
        {/* Contact */}
        <Contact/>
        {/* sponsors displayed */}
        <SponsorsDisplay/>
      </ScrollView>
    </SafeAreaView>
  );
}

const Team = () => {
  return (
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
            source={require("../../assets/images/team/mubarik.jpg")}
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
            source={require("../../assets/images/team/nasrullah.jpg")}
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
            source={require("../../assets/images/team/zafarullah.jpg")}
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
            source={require("../../assets/images/team/abdullah.jpg")}
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

  )
}

const Guidelines = () => {
  return (
    <View>
    <Text style={styles.title}>Guidelines</Text>
    <View style={styles.contentContainer}>
      <View>
        <Text style={[styles.ptext, {}]}>
          Step 1: Touch the tab "Formulate Feed"
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 2: Select your animal
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 3: Select body weight and milk production level of your animal
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 4: Screen will appear from where you can select feed ingredients from 3 different categories. Select at first two ingredients from each category by scrolling down
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 5: Screen will appear with your required BASE formulae as dry matter and as fed.
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 6: Now go back and experiment with various feedstuffs available and get the formula of your choice.
        </Text>
        <Image
          style={{ width: 250, height: 625, alignSelf: "center" }}
          source={require("../../assets/images/demo/LeastCost.jpg")}
        />
      </View>

      <View>
        <Text style={{ borderBottomColor: 'grey', borderBottomWidth: 2, alignSelf: "center", marginBottom: 5, fontSize: 14, fontWeight: 'bold' }}>
          Please keep in mind some basic rules to properly use this application.
        </Text>

        <Text style={[styles.ptext, {}]}>
          1. Select ingredients wisely, for example, it is better to select at least one succulent fodder along with one dry roughage for better results. Selection of too many dry roughages only or succulent fodders only may disturb the formula results.
        </Text>
        <Text style={[styles.ptext, {}]}>
          2. As body weight and milk production of your animal increases, try to increase the number of ingredients from each category.
        </Text>
        <Text style={[styles.ptext, {}]}>
          3. We are hoping for the best results based on least cost, however, 100% is not possible. In case of any problem please contact our team members via email or phone call.
        </Text>
      </View>

    </View>
  </View>

  )
}

const ProjectInfo = () => {
  return (
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

  )
}

const Contact = () => {
  return (
    <View style={{ marginBottom: 30 }}>
    <Text style={styles.title}>Contact Us</Text>
    <View style={styles.contentContainer}>
      <Text>
        Email:
        <OpenURLButton url='mailto:uvagro.pak@gmail.com'>
          <Text style={{ color: 'blue' }}>uvagro.pak@gmail.com</Text>
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

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    backgroundColor: "rgb(100, 10, 10)",
    color: "white",
    padding: 5,
    paddingLeft: 15,
    fontWeight: "500",
    borderRadius: 15,
  },
  contentContainer: {
    marginVertical: 10,
  },
  teamMemberContainer: {
    height: 140,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  teamMemberImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  teamMemberInfo: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  teamMemberRole: {
    fontWeight: "600",
  },
  teamMemberName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  teamMemberDescription: {
    fontSize: 12,
  },
  ptext: {
    fontSize: 14,
    // fontWeight: "500",
    textAlign: "justify",
  },
  linkText: {
    color: "blue",
  },
});


export default Settings;

