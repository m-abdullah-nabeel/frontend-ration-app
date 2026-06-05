import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Alert, Modal, Pressable, TextInput } from "react-native";
import { Avatar, Button, Card } from 'react-native-paper';
// import { Avatar, Button, Card, Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { resetAnimalInput, selectFeedFormulationData } from "../../redux/animalInputSlice";
// Translation
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import { setSpecies as globalSpecies, selectSpecies } from "../../redux/speciesSlice"; 
import { REQUIREMENT_PROFILES } from "../expert-ff-data/requirementProfiles";
import NutrientTab from "./nutrient_tab";
import FeedstuffTab from "./feedstuff_tab";

const ExpertHome = ({ navigation }) => {
  const { t } = useTranslation();
  const selectedSpecies = useSelector(selectSpecies);
  const selectedFeedData = useSelector(selectFeedFormulationData);
  const [activeTab, setActiveTab] = useState("nutrients");
  const [nutrients, setNutrients] = useState([
  { id: "CP", name: "Crude Protein", unit: "%", min: "18", max: "22" },
  { id: "ME", name: "Metabolizable Energy", unit: "kcal/kg", min: "2500", max: "3000" },
  { id: "Ca", name: "Calcium", unit: "%", min: "0.8", max: "1.2" },
]);


  return (
    <View style={{flex: 1}}>

      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          borderRadius: 10,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#ccc",
        }}
      >
        {/* Nutrient Tab */}
        <TouchableOpacity
          onPress={() => setActiveTab("nutrients")}
          style={{
            flex: 1,
            paddingVertical: 14,
            alignItems: "center",
            backgroundColor:
              activeTab === "nutrients" ? "#4CAF50" : "#f5f5f5",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: activeTab === "nutrients" ? "#fff" : "#333",
            }}
          >
            Nutrient Requirements
          </Text>
        </TouchableOpacity>

        {/* Feedstuffs Tab */}
        <TouchableOpacity
          onPress={() => setActiveTab("feedstuffs")}
          style={{
            flex: 1,
            paddingVertical: 14,
            alignItems: "center",
            backgroundColor:
              activeTab === "feedstuffs" ? "#4CAF50" : "#f5f5f5",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: activeTab === "feedstuffs" ? "#fff" : "#333",
            }}
          >
            Feedstuffs
          </Text>
        </TouchableOpacity>
      </View>

      
      {/* Contents */}
      {/* FEEDSTUFFS TAB */}
        {activeTab === "feedstuffs" && ( <FeedstuffTab nutrientsSelected={nutrients} />
      )}

      {/* FEEDSTUFFS TAB */}
        {activeTab === "nutrients" && (
          <NutrientTab
            nutrients={nutrients}
            setNutrients={setNutrients}
          />
        )}

      {/* Modal */}
    </View>
  )
}

export default ExpertHome;