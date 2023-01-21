import React, { useCallback } from "react";
import { ScrollView, View, Text, StyleSheet, Linking, SafeAreaView } from "react-native"
import YoutubePlayer from "react-native-youtube-iframe";

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
    position: "Application Developer"
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 10 }}>
        <View>
          <Text style={styles.title}>Guidelines</Text>
          <View style={styles.contentContainer}>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
            {/* <YoutubePlayer
              height={200}
              videoId={"iee2TATGMyI"}
            /> */}
          </View>
        </View>
        <View>
          <Text style={styles.title}>Project Information</Text>
          <View style={styles.contentContainer}>
            <Text style={{ fontSize: 14, fontWeight: '500', textAlign: 'justify', }}>
              The project, sponsored by the Arass Foundation and the University of Veterinary and Animal Sciences Lahore,
              aimed to develop a mobile app for the extension of veterinary knowledge. The app, which utilizes a least cost feed formulation algorithm,
              allows farmers to formulate feed using available feedstuffs.
              The motivation behind the project was to translate the knowledge of animal nutrition to farmers,
              particularly those in remote areas, and empower them to utilize modern technologies and
              knowledge for the profitable living of their animals. The app, which can be used on a mobile device,
              even in remote areas, allows farmers to formulate feed on the palm of their
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
                  <View key={i} style={{}}>
                    <Text>{k.role}</Text>
                    <Text>{k.name}</Text>
                    <Text>{k.position}</Text>
                  </View>
                )
              )
            }
          </View>
        </View>

        {/* Contact */}
        <View>
          <Text style={styles.title}>Contact Us</Text>
          <View style={styles.contentContainer}>
            {/* <Text>Project Manager: +92 311 703 9097</Text> */}
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
    // flex: 1,
    fontSize: 24,
    backgroundColor: 'rgb(100, 10, 10)',
    color: 'white',
    padding: 5,
    paddingLeft: 15,
    fontWeight: '500',
    borderRadius: 15,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  contentContainer: {
    margin: 10
  }
});


export default Settings;