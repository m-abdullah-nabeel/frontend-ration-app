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


const RequirementUnit = ({
  id,
  nutrientName,
  unit,
  minValue,
  maxValue,
  onChangeMin,
  onChangeMax,
  onDelete,
}) => {
  return (
    <Card
      // mode="outlined"
      style={{
        marginVertical: 8,
        padding: 10,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ flexDirection: "column", gap: 10 }}>
        
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {nutrientName} ({id})
          </Text>

          {/* <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {nutrientName} ({unit})
          </Text> */}

          <Button
            mode="contained"
            buttonColor="red"
            onPress={() => onDelete(id)}
          >
            Delete
          </Button>
        </View>

        {/* Inputs */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          
          {/* Min Input */}
          <TextInput
            placeholder="Min"
            keyboardType="numeric"
            value={minValue}
            onChangeText={(val) => onChangeMin(id, val)}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
            }}
          />

          {/* Max Input */}
          <TextInput
            placeholder="Max"
            keyboardType="numeric"
            value={maxValue}
            onChangeText={(val) => onChangeMax(id, val)}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
            }}
          />
        </View>
      </View>
    </Card>
  );
};

const NutrientTab = ({ nutrients, setNutrients }) => {
  const [newNutrientId, setNewNutrientId] = useState("");
  const [newNutrientName, setNewNutrientName] = useState("");
  const [newNutrientUnit, setNewNutrientUnit] = useState("");

  const loadProfile = (profileName) => {
    setNutrients(REQUIREMENT_PROFILES[profileName]);
  };

  const handleMinChange = (id, value) => {
    setNutrients((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, min: value } : n
      )
    );
  };

  const handleMaxChange = (id, value) => {
    setNutrients((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, max: value } : n
      )
    );
  };

  const handleDelete = (id) => {
    setNutrients((prev) => prev.filter((n) => n.id !== id));
  };

  const nutrientExists = nutrients.some(
    (n) =>
      n.id === newNutrientId.trim().toUpperCase()
  );

  const handleAddNutrient = () => {

    if (!newNutrientId.trim()) {
      Alert.alert("Error", "Please enter nutrient ID");
      return;
    }

    if (!newNutrientName.trim()) {
      Alert.alert("Error", "Please enter nutrient name");
      return;
    }

    // Normalize ID
    const nutrientId = newNutrientId
      .trim()
      .toUpperCase();

    // Check duplicates
    const alreadyExists = nutrients.some(
      (nutrient) => nutrient.id === nutrientId
    );

    if (alreadyExists) {
      Alert.alert(
        "Duplicate Nutrient",
        `${nutrientId} already exists`
      );
      return;
    }

    const newNutrient = {
      id: nutrientId,
      name: newNutrientName.trim(),
      unit: newNutrientUnit || "%",
      min: "",
      max: "",
    };

    setNutrients((prev) => [...prev, newNutrient]);

    // Clear Inputs
    setNewNutrientId("");
    setNewNutrientName("");
    setNewNutrientUnit("");
  };

  return (
      <View style={{flex: 1}}>
        {/* Adding Custom Nutrients in Menu */}
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 140,
          }}
        >
          <View>

            <View
              style={{
                margin: 12,
                padding: 12,
                backgroundColor: "#E8F5E9", // light green
                borderLeftWidth: 5,
                borderLeftColor: "#4CAF50", // highlight line
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "#2E7D32",
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                Keep adding nutrients required for animal feed formulation.
              </Text>
            </View>

            <View>
              {nutrients.map((nutrient) => (
                <RequirementUnit
                  key={nutrient.id}
                  id={nutrient.id}
                  nutrientName={nutrient.name}
                  unit={nutrient.unit}
                  minValue={nutrient.min}
                  maxValue={nutrient.max}
                  onChangeMin={handleMinChange}
                  onChangeMax={handleMaxChange}
                  onDelete={handleDelete}
                />
              ))}
            </View>
          </View>

          <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
            <View style={{ padding: 10, gap: 10 }}>

              {/* Nutrient ID */}
              <TextInput
                placeholder="Nutrient ID (e.g. ME)"
                value={newNutrientId}
                onChangeText={setNewNutrientId}
                autoCapitalize="characters"
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 10,
                }}
              />

              {/* Nutrient Name */}
              <TextInput
                placeholder="Nutrient Name (e.g. Metabolizable Energy)"
                value={newNutrientName}
                onChangeText={setNewNutrientName}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 10,
                }}
              />

              {/* Unit */}
              <TextInput
                placeholder="Unit (e.g. %, kcal/kg)"
                value={newNutrientUnit}
                onChangeText={setNewNutrientUnit}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 10,
                }}
              />

            </View>
            {nutrientExists && (
              <Text style={{ color: "red" }}>
                Nutrient already exists
              </Text>
            )}
            <TouchableOpacity
              onPress={handleAddNutrient}
              style={{
                backgroundColor: "#4CAF50",
                paddingVertical: 14,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                + Add New Nutrient
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView >

        {/* Load default requirements */}

        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingVertical: 10,
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderColor: "#eee",
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            <View style={{ flexDirection: "row" }}>

              {/* Card 1 */}
              <TouchableOpacity
                // onPress={() => console.log("Dairy")}
                onPress={() => loadProfile("DAIRY_CATTLE")}
                style={{
                  width: 220,
                  marginRight: 12,
                  backgroundColor: "#E8F5E9",
                  borderRadius: 12,
                  padding: 14,
                  elevation: 2,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2E7D32" }}>
                  Dairy Cattle
                </Text>
                <Text style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
                  Load nutrient requirements
                </Text>
              </TouchableOpacity>

              {/* Card 2 */}
              <TouchableOpacity
                // onPress={() => console.log("Broiler")}
                onPress={() => loadProfile("BROILER_STARTER")}
                style={{
                  width: 220,
                  marginRight: 12,
                  backgroundColor: "#E3F2FD",
                  borderRadius: 12,
                  padding: 14,
                  elevation: 2,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1565C0" }}>
                  Broiler Poultry
                </Text>
                <Text style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
                  Load nutrient requirements
                </Text>
              </TouchableOpacity>

              {/* Card 3 */}
              <TouchableOpacity
                // onPress={() => console.log("Beef")}
                onPress={() => loadProfile("BEEF_CATTLE")}
                style={{
                  width: 220,
                  marginRight: 12,
                  backgroundColor: "#FFF3E0",
                  borderRadius: 12,
                  padding: 14,
                  elevation: 2,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#EF6C00" }}>
                  Beef Cattle
                </Text>
                <Text style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
                  Load nutrient requirements
                </Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </View>
        
      </View>

  )
}

export default NutrientTab;