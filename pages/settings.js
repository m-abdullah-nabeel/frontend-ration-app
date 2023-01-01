import React, { useCallback } from "react";
import { ScrollView, View, Text, StyleSheet, Linking } from "react-native"
import YoutubePlayer from "react-native-youtube-iframe";


const portfolioURL = "http://dr-abdullah-nabeel.web.app";

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
    <ScrollView style={{ padding: 10 }}>
      <View>
        <Text style={styles.title}>Guidelines</Text>
        <View style={styles.contentContainer}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
          <YoutubePlayer
            height={200}
            videoId={"iee2TATGMyI"}
          />
        </View>
      </View>
      <View>
        <Text style={styles.title}>Project Information</Text>
        <View style={styles.contentContainer}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </Text>
          {/* <View>
            <YoutubePlayer
              height={200}
              videoId={"iee2TATGMyI"}
            />
          </View> */}
        </View>
      </View>
      <View>
        <Text style={styles.title}>Team</Text>
        <View style={styles.contentContainer}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      </View>
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
      <View>
        <Text style={styles.title}>Developer</Text>
        <View style={styles.contentContainer}>
          <Text>
            {/* Contact Developer at */}
            <OpenURLButton url={portfolioURL}>
              Contact Developer at &nbsp;
              <Text style={{ color: 'blue' }}>dr-abdullah-nabeel.web.app</Text>
            </OpenURLButton>
          </Text>
        </View>
      </View>
      {/* <View style={{ flex: 1, alignItems: 'center', height: 50 }}>
        <Text>&copy; &nbsp; CopyRight Preserved</Text>
      </View> */}

    </ScrollView>
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