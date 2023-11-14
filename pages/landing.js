import React, { useEffect, useRef, useState } from "react";
import { Text, View, Image, Linking, Easing } from "react-native";
import { TouchableOpacity, StatusBar } from "react-native";
import { Animated } from 'react-native';
// translation
import '../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import LanguageChanger from './languageChanger';

import { Dimensions } from 'react-native';

// "splash": {
//   "image": "./assets/splash.png",
//   "resizeMode": "contain",
//   "backgroundColor": "#ffffff",
//   "autoHide": 5
// },

const Landing = ({ navigation }) => {
    const [animationComplete, setAnimationComplete] = useState(false);
    return (
        <View style={{ flex: 1 }}>
            {
                animationComplete?
                <LandingPage navigation={navigation}/>:
                <AnimatedSplashCpomponent animationComplete={animationComplete} setAnimationComplete={setAnimationComplete}/>
            }
        </View >
    )
}

const LandingPage = ({ navigation }) => {
    const url_uvas = "https://uvas.edu.pk";
    const url_arass = "https://arass.org/";
    const { t } = useTranslation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 500, // Adjust the duration of the fade-in animation as needed
          useNativeDriver: true,
        }
      ).start();
    }, [fadeAnim]);
  
    return (
      <Animated.View style={{ flex: 1, backgroundColor: 'rgba(10, 100, 10, 1)', opacity: fadeAnim }}>
        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
          <View style={{
            position: 'absolute', top: StatusBar.currentHeight + 5, right: 10,
          }}>
            <LanguageChanger />
          </View>
          <View
            style={{
              width: 250, height: 250,
              borderRadius: 125, alignSelf: 'center', justifyContent: 'center', alignItems: 'center',
              borderColor: "black", borderWidth: 1,
              backgroundColor: "rgba(255, 255, 255, 1)",
            }}>
            <Image
              style={{ width: 180, height: 180, }}
              source={require('../assets/logo/icon.png')}
            />
          </View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 20 }}>
            {t('welcomeMessage')}
          </Text>
        </View>
  
        <View style={{ flex: 2, justifyContent: 'center', paddingLeft: 35, paddingRight: 35, }}>
          <View style={{ flex: 2, width: '100%', justifyContent: 'space-around', }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Formulate');
              }}
            >
              <View style={{
                backgroundColor: 'white', padding: 15, borderRadius: 25, alignItems: 'center',
              }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'rgb(120, 20, 10)' }}>
                  {t('proceed landing')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
  
          <View style={{
            flex: 1, width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around',
            backgroundColor: 'rgb(10, 100, 10)'
          }}>
  
            <TouchableOpacity
              onPress={async () => await Linking.openURL(url_arass)}
            >
              <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 140, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <Image
                  style={{ width: 50, height: 27 }}
                  source={require('../assets/arass.png')}
                />
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity
              onPress={async () => await Linking.openURL(url_uvas)}
            >
              <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 140, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <Image
                  style={{ width: 50, height: 23 }}
                  source={require('../assets/uvas-big.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
  
        </Animated.View>
    )
  }
export default Landing;

const AnimatedSplashCpomponent = ({animationComplete, setAnimationComplete}) => {
    const pathlogo = "../assets/logo/icon.png"
    // const [animationComplete, setAnimationComplete] = useState(false);
    const enlargeAnim = useRef(new Animated.Value(1)).current;
    const flipAnim = useRef(new Animated.Value(0)).current;
    const scaleDownAnim = useRef(new Animated.Value(1)).current;
    const fadeInText = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      const startAnimation = () => {
        Animated.sequence([
          // Enlarge quickly
          Animated.timing(enlargeAnim, {
            toValue: 1.10,
            duration: 500, // Adjust the duration as needed
            easing: Easing.linear,
            useNativeDriver: true,
          }),
  
          // Flip horizontally
          Animated.timing(flipAnim, {
            toValue: 1,
            duration: 1000, // Adjust the duration as needed
            easing: Easing.linear,
            useNativeDriver: true,
          }),
  
          // Scale down
          Animated.timing(scaleDownAnim, {
            toValue: 0.75,
            duration: 1000, // Adjust the duration as needed
            easing: Easing.linear,
            useNativeDriver: true,
          }),
  
          // Fade in text
          Animated.timing(fadeInText, {
            toValue: 1,
            duration: 500, // Adjust the duration as needed
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Animation complete, set the state
          setAnimationComplete(true);
        });
      };
  
      startAnimation();
    }, [enlargeAnim, flipAnim, scaleDownAnim, fadeInText]);
  
    // Combine transformations for the logo
    const animatedImageStyle = {
      transform: [
        { scale: enlargeAnim },
        {
          rotateY: flipAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '180deg', '360deg'],
          }),
        },
        { scale: scaleDownAnim },
      ],
    };
  
    // Combine transformations for the text
    const animatedTextStyle = {
      opacity: fadeInText,
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Your logo/image component with animation */}
        <Animated.Image
          source={require(pathlogo)}
          style={{
            width: 200, // Adjust the width as needed
            height: 200, // Adjust the height as needed
            ...animatedImageStyle,
          }}
        />
  
        {/* Your animated text component */}
        {/* <View style={{width: "75%", alignItems: "center"}}>
            <Animated.Text style={{ ...animatedTextStyle, marginTop: 15, fontSize: 22, color: "rgba(10, 100, 10, 1)", textAlign: "center" }}>
            Struggling to Enhance Successful Livestock Farming 
            </Animated.Text>
        </View> */}
  
        {/* Display a message or perform actions when the animation is complete */}
        {/* {animationComplete && (
          <Text style={{ marginTop: 20, fontSize: 16, color: 'green' }}>
            Animation Complete!
          </Text>
        )} */}
      </View>
    );
  };
  