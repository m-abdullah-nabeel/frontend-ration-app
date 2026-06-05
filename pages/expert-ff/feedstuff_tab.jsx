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


const FeedstuffTab = ({ nutrientsSelected }) => {
  const [showFeedModal, setShowFeedModal] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [mode, setMode] = useState("view");
  const [feedData, setFeedData] = useState({
    name: "",
    nutrients: {
      ME: "",
      CP: "",
      NDF: "",
      Ca: "",
    },
  });

  const [feedstuffs, setFeedstuffs] = useState([
    {
      id: "barseem",
      name: "Barseem",
      nutrients: {
        DM: "12.5",
        CP: "23.5",
        NDF: "44.1",
        ME: "2300",
      },
      cost: "12",
      min: "0",
      max: "1",
    },
    {
      id: "alfalfa",
      name: "Alfalfa (Lucerne)",
      nutrients: {
        DM: "20",
        CP: "20.6",
        NDF: "39.9",
        ME: "2240",
      },
      cost: "5",
      min: "0",
      max: "1",
    },
    {
      id: "napier_grass",
      name: "Napier grass",
      nutrients: {
        DM: "17.9",
        CP: "9.7",
        NDF: "71.5",
        ME: "1950",
      },
      cost: "5",
      min: "0",
      max: "1",
    },
    {
      id: "rye_grass",
      name: "Rye grass",
      nutrients: {
        DM: "13.5",
        CP: "23.3",
        NDF: "43.5",
        ME: "2400",
      },
      cost: "5",
      min: "0",
      max: "1",
    },
    {
      id: "millet",
      name: "Millet",
      nutrients: {
        DM: "20",
        CP: "12.4",
        NDF: "64.8",
        ME: "2190",
      },
      cost: "5",
      min: "0",
      max: "1",
    },
    {
      id: "barley",
      name: "Barley",
      nutrients: {
        DM: "25",
        CP: "11",
        NDF: "57.6",
        ME: "2190",
      },
      cost: "5",
      min: "0",
      max: "1",
    },
  ]);

const handleMinChange = (id, value) => {
setFeedstuffs((prev) =>
    prev.map((item) =>
    item.id === id
        ? { ...item, min: value }
        : item
    )
);
};

const handleMaxChange = (id, value) => {
setFeedstuffs((prev) =>
    prev.map((item) =>
    item.id === id
        ? { ...item, max: value }
        : item
    )
);
};

  const handleDeleteFeed = (id) => {
    setFeedstuffs((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };


  return (
      <View style={{flex: 1}}>
        {/* Adding Custom Nutrients in Menu */}
        <ScrollView>
            {/* Display Nutrients Selected */}
            {/* <View>
                {nutrientsSelected.map((i) => (
                    <Text key={i.id}>{i.id}</Text>
                ))}
            </View> */}
          <View>
            {/* Load Feeds or Add New */}
            <View style={{ padding: 12, gap: 10 }}>

              {/* Load from store */}
              <TouchableOpacity
                onPress={() => console.log("Load from store")}
                style={{
                  backgroundColor: "#E3F2FD",
                  padding: 14,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#90CAF9",
                }}
              >
                <Text style={{ color: "#0D47A1", fontWeight: "bold" }}>
                  📦 Load Feedstuffs from Store
                </Text>
                <Text style={{ fontSize: 12, color: "#555" }}>
                  Select from pre-defined feedstuffs
                </Text>
              </TouchableOpacity>

              {/* Add custom */}
              <TouchableOpacity
                onPress={() => {
                setMode("add");
                setSelectedFeed({
                  name: "",
                  nutrients: {
                    ME: "",
                    CP: "",
                    NDF: "",
                    Ca: "",
                  },
                });
                setShowFeedModal(true);
                }}
                style={{
                  backgroundColor: "#E8F5E9",
                  padding: 14,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#A5D6A7",
                }}
              >
                <Text style={{ color: "#1B5E20", fontWeight: "bold" }}>
                  ➕ Add Custom Feedstuff
                </Text>
                <Text style={{ fontSize: 12, color: "#555" }}>
                  Create a new feed ingredient
                </Text>
              </TouchableOpacity>

            </View>

            <View>
              {feedstuffs.map((item) => (
                <FeedstuffComponent
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  min={item.min}
                  max={item.max}
                  price={item.cost}
                  onChangeMin={handleMinChange}
                  onChangeMax={handleMaxChange}
                  onViewNutrients={() => {
                    setMode("view");
                    setSelectedFeed(item);
                    setShowFeedModal(true);
                  }}
                  onDelete={handleDeleteFeed}
                  nutrientsSelected={nutrientsSelected}
                />
              ))}
            </View>

            {/* Display Nutrients Selected */}
            {/* <View>
                {nutrientsSelected.map((i) => (
                    <Text key={i.id}>{i.id}</Text>
                ))}
            </View> */}


          </View>


        </ScrollView >

        <FeedstuffModal
          visible={showFeedModal}
          onClose={() => setShowFeedModal(false)}
          mode={mode}
          feedData={feedData}
          setFeedData={setFeedData}
          selectedFeed={selectedFeed}
          nutrientsSelected={nutrientsSelected}
        />

        {/* Formula Options */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 12,
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderColor: "#ddd",
            flexDirection: "row",
            gap: 10,
          }}
        >

          {/* 🟢 Formulate Button */}
          <TouchableOpacity
            onPress={() => console.log("Formulate Feed")}
            style={{
              flex: 1,
              backgroundColor: "#4CAF50",
              paddingVertical: 14,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              elevation: 2,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Formulate Feed
            </Text>
          </TouchableOpacity>

          {/* 🔵 Slide Up Button */}
          <TouchableOpacity
            onPress={() => console.log("Open Results")}
            style={{
              flex: 1,
              backgroundColor: "#2196F3",
              paddingVertical: 14,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              elevation: 2,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              View Results
            </Text>
          </TouchableOpacity>

        </View>
      </View>

  )
}

const FeedstuffComponent = ({
  id,
  name,
  min,
  max,
  price,
  onChangeMin,
  onChangeMax,
  onViewNutrients,
  onDelete,
  nutrientsSelected
}) => {

  const [showFeedModal, setShowFeedModal] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null); // data
  const [mode, setMode] = useState("view"); // "view" or "add"

  return (
    <Card style={{ margin: 10, padding: 12 }}>

      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {name} 
        </Text>

        <Button
          mode="contained"
          buttonColor="red"
          onPress={() => onDelete(id)}
        >
          Delete
        </Button>
      </View>

      {/* Display Nutrients Selected */}
      {/* <View>
          {nutrientsSelected.map((i) => (
              <Text key={i.id}>{i.id}</Text>
          ))}
      </View> */}

      {/* Min / Max */}
      <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
        <TextInput
          placeholder="Min %"
          keyboardType="numeric"
          value={min}
          onChangeText={(val) => onChangeMin(id, val)}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
          }}
        />

        <TextInput
          placeholder="Max %"
          keyboardType="numeric"
          value={max}
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

      {/* Price */}
      <View
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: "#f5f5f5",
          borderRadius: 8,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          Price: Rs. {price} / kg
        </Text>
      </View>

      {/* View Nutrients Button */}
      <TouchableOpacity
        onPress={() => onViewNutrients(id)}
        style={{
          marginTop: 10,
          backgroundColor: "#2196F3",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          View Nutrient Composition
        </Text>
      </TouchableOpacity>

      <Modal visible={showFeedModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <View
            style={{
              height: "70%",
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 16,
            }}
          >
            {/* Title */}
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              {mode === "view" ? "Nutrient Composition" : "Add Feedstuff"}
            </Text>

            {/* Feed Name */}
            <TextInput
              placeholder="Feed Name"
              value={selectedFeed?.name}
              editable={mode === "add"}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 10,
              }}
            />

            {/* Nutrient Inputs */}
            {nutrientsSelected.map((item) => {
              const nutrientKey = item.id;

              return (
                <TextInput
                  key={nutrientKey}
                  placeholder={nutrientKey}
                  value={
                    selectedFeed?.nutrients?.[nutrientKey]?.toString() || ""
                  }
                  editable={mode === "add"}
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 8,
                  }}
                />
              );
            })}
            {/* Buttons */}
            {mode === "add" && (
              <TouchableOpacity
                style={{
                  backgroundColor: "#4CAF50",
                  padding: 12,
                  borderRadius: 8,
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Save Feedstuff
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setShowFeedModal(false)}
              style={{
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "red" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </Card>
  );
};

const FeedstuffModal = ({
  visible,
  onClose,
  mode, // "view" or "add"
  feedData,
  setFeedData,
  nutrientsSelected
}) => {
  const handleChange = (key, value) => {
    setFeedData((prev) => ({
      ...prev,
      nutrients: {
        ...prev.nutrients,
        [key]: value,
      },
    }));
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <View
          style={{
            height: "70%",
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16,
          }}
        >
          {/* Title */}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            {mode === "view" ? "Nutrient Composition" : "Add Feedstuff"}
          </Text>


          {/* Feed Name */}
          <TextInput
            // placeholder="Feed Name"
            placeholder={JSON.stringify(feedData)}
            value={feedData?.name}
            editable={mode === "add"}
            onChangeText={(val) =>
              setFeedData((prev) => ({ ...prev, name: val }))
            }
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              marginBottom: 10,
            }}
          />

          <View>
              {nutrientsSelected.map((nutrient) => (
                  <TextInput
                    key={nutrient.id}
                    placeholder={nutrient.id}
                    // value={feedData?.nutrients[nutrient.id]}
                    editable={mode === "add"}
                    onChangeText={(val) => handleChange(nutrient, val)}
                    style={{
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 8,
                      padding: 10,
                      marginBottom: 8,
                    }}
                  >
                    {nutrient.id}
                  </TextInput>
              ))}
          </View>


          {/* Nutrients */}
          {/* {["ME", "CP", "NDF", "Ca"].map((nutrient) => (
            <TextInput
              key={nutrient}
              placeholder={nutrient}
              value={feedData?.nutrients[nutrient]}
              editable={mode === "add"}
              onChangeText={(val) => handleChange(nutrient, val)}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 8,
              }}
            />
          ))} */}

          {/* Save Button */}
          {mode === "add" && (
            <TouchableOpacity
              style={{
                backgroundColor: "#4CAF50",
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Save Feedstuff
              </Text>
            </TouchableOpacity>
          )}

          {/* Close */}
          <TouchableOpacity
            onPress={onClose}
            style={{ marginTop: 10, alignItems: "center" }}
          >
            <Text style={{ color: "red" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FeedstuffTab;
