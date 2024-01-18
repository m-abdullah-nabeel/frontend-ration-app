import React from "react";
import { View, ScrollView, Text as TextNative, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from "react-native"
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import BlockAd from "./ads/block_ad";
import SponsorsDisplay from "./components/sponsors_display";

import AdsData from "./ads/ads.json";

const MenuScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const adData0 = AdsData[0]
    const adData1 = AdsData[1]

    return (
        <View style={{ flex: 1 }}>
          <ScrollView>

            {/* <View style={{ padding: 16, elevation: 2, backgroundColor: 'rgba(153, 150, 10, 1)' }}>
              <Text style={{ fontSize: 20, color: "rgba(250, 250, 250, 1)", fontWeight: 'bold', marginBottom: 8 }}>UVA-gro Formulation Insights</Text>
              <Text style={{ fontSize: 14, color: "rgba(250, 250, 250, 1)", marginBottom: 8 }}>
              Unlock precision in animal nutrition with our innovative Least Cost Feed Formulation tool. Tailored for optimal results, our Least Cost Feed Formulation feature is equally practical for any species, ensuring efficient and cost-effective feed planning to meet the unique nutritional needs of your animals. Explore now for smarter and more sustainable animal feed management.
              </Text>
            </View> */}

            <HorizontalCard 
                navigation={ navigation } t={ t } 
                link={"Specie Selector"} titleText={"Get Fixed Formulas"} 
                subtitleText={t("prepared-formula-link-description")}
                imageSource={require("../assets/images/winterFeed.jpg")}
            />

            {/* <HorizontalCard 
                navigation={ navigation } t={ t } 
                link={"Animal Selector"} titleText={"Simple feed formulate"} 
                subtitleText={"Least Cost Feed Formulation"}
                descText={"Unlock precision in animal nutrition with our innovative Least Cost Feed Formulation tool. Tailored for optimal results, this feature is equally practical for any species, ensuring efficient and cost-effective feed planning to meet the unique nutritional needs of your animals. Explore now for smarter and more sustainable animal feed management."}
                imageSource={require("../assets/images/summerFeed.jpg")}
            /> */}
            
            <HorizontalCard 
                navigation={ navigation } t={ t } 
                link={"Prem Animal Inputs"} titleText={"feed formulate"} 
                subtitleText={"Least Cost Feed Formulation"} 
                // descText={"Unlock precision in animal nutrition with our innovative Least Cost Feed Formulation tool. Tailored for optimal results, this feature is equally practical for any species, ensuring efficient and cost-effective feed planning to meet the unique nutritional needs of your animals. Explore now for smarter and more sustainable animal feed management."}
                imageSource={require("../assets/images/cattlefeed.jpg")}
            />

          <BlockAd adData={adData0}/>
          <BlockAd adData={adData1}/>
            

          </ScrollView>

          <View style={{marginVertical: 10}}>
            <SponsorsDisplay/>
          </View>
          
        </View>
    )
}

export default MenuScreen;

const HorizontalCard = ({ navigation, t, link, titleText, subtitleText, imageSource, descText }) => {
    return (
      <Card 
        mode="outlined"
        style={{
          marginVertical: 8,
          marginHorizontal: 0, padding: 0,
          // borderRadius: 10,
          // elevation: 1,
          backgroundColor: "rgba(10, 200, 10, 0)"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(link);
          }}
        >
            <View style={{ 
                height: 125,
                flex: 1, flexDirection: "row", justifyContent: "space-between",
            }}>
                <View style={{
                    flexDirection: "column", 
                    justifyContent: "center",
                    padding: 20,
                    flex: 6
                }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 24,
                            fontWeight: 'bold',
                        }}
                        >
                        {t(titleText)}
                    </Text>
                    {subtitleText && (
                    <Text
                        style={{
                            color: 'black', // Change the color based on your design
                            fontSize: 14,
                            marginBottom: descText ? 8 : 0,
                            // alignSelf: "center"
                        }}
                    >
                        {t(subtitleText)}
                    </Text>
                    )}
                </View>

                <View style={{
                    flex: 4, 
                    // backgroundColor: "red"
                }}>
                    {imageSource && (
                    <Card.Cover
                        source={imageSource}
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: 'cover',
                        }}
                    />
                    )}
                </View>

          </View>
  
          <View style={{ }}>
            {descText && (
              <Text
                style={{
                    padding: 12,
                  color: 'black', // Change the color based on your design
                  fontSize: 14,
                }}
              >
                {t(descText)}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </Card>
    );
};
  
  
