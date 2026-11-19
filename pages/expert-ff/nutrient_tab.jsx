import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { Button, Card } from "react-native-paper";
import {
  REQUIREMENT_PROFILES,
  PROFILE_META,
  SUGGESTED_NUTRIENTS,
} from "../expert-ff-data/requirementProfiles";

const QUICK_UNITS = ["%", "kcal/kg", "Mcal/kg", "g/kg", "mg/kg"];

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
      style={{
        marginVertical: 6,
        marginHorizontal: 12,
        padding: 12,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ flexDirection: "column", gap: 10 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#222" }}>
              {nutrientName} ({id})
            </Text>
            <Text style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
              Unit: {unit || "%"}
            </Text>
          </View>

          <Button
            mode="contained"
            compact
            buttonColor="#D32F2F"
            onPress={() => onDelete(id)}
          >
            Delete
          </Button>
        </View>

        {/* Min / Max Inputs */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>
              Min ({unit || "%"})
            </Text>
            <TextInput
              placeholder="Min"
              keyboardType="numeric"
              value={minValue}
              onChangeText={(val) => onChangeMin(id, val)}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                backgroundColor: "#FAFAFA",
              }}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>
              Max ({unit || "%"})
            </Text>
            <TextInput
              placeholder="Max"
              keyboardType="numeric"
              value={maxValue}
              onChangeText={(val) => onChangeMax(id, val)}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                backgroundColor: "#FAFAFA",
              }}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

const NutrientTab = ({ nutrients, setNutrients, onGoToFeedstuffs }) => {
  const [newNutrientId, setNewNutrientId] = useState("");
  const [newNutrientName, setNewNutrientName] = useState("");
  const [newNutrientUnit, setNewNutrientUnit] = useState("%");
  const [newNutrientMin, setNewNutrientMin] = useState("");
  const [newNutrientMax, setNewNutrientMax] = useState("");

  const loadProfile = (profileKey, title) => {
    const profileNutrients = REQUIREMENT_PROFILES[profileKey];
    if (!profileNutrients) return;
    setNutrients(profileNutrients.map((item) => ({ ...item })));
    Alert.alert("Profile Loaded", `${title} nutrient requirements loaded.`);
  };

  const handleMinChange = (id, value) => {
    setNutrients((prev) =>
      prev.map((n) => (n.id === id ? { ...n, min: value } : n))
    );
  };

  const handleMaxChange = (id, value) => {
    setNutrients((prev) =>
      prev.map((n) => (n.id === id ? { ...n, max: value } : n))
    );
  };

  const handleDelete = (id) => {
    setNutrients((prev) => prev.filter((n) => n.id !== id));
  };

  const handleAddSuggested = (suggestedItem) => {
    const alreadyExists = nutrients.some(
      (n) => n.id.toUpperCase() === suggestedItem.id.toUpperCase()
    );
    if (alreadyExists) return;

    setNutrients((prev) => [...prev, { ...suggestedItem }]);
  };

  const normalizedInputId = newNutrientId.trim().toUpperCase().replace(/\s+/g, "_");
  const nutrientExists =
    normalizedInputId.length > 0 &&
    nutrients.some((n) => n.id.toUpperCase() === normalizedInputId);

  const availableSuggestions = SUGGESTED_NUTRIENTS.filter(
    (s) => !nutrients.some((n) => n.id.toUpperCase() === s.id.toUpperCase())
  );

  const handleAddNutrient = () => {
    if (!normalizedInputId) {
      Alert.alert("Error", "Please enter a Nutrient ID (e.g. ASH, LYS, Zn).");
      return;
    }

    if (!newNutrientName.trim()) {
      Alert.alert("Error", "Please enter a Nutrient Name.");
      return;
    }

    if (nutrientExists) {
      Alert.alert("Duplicate Nutrient", `${normalizedInputId} already exists.`);
      return;
    }

    if (
      newNutrientMin !== "" &&
      newNutrientMax !== "" &&
      Number(newNutrientMin) > Number(newNutrientMax)
    ) {
      Alert.alert("Invalid Range", "Minimum value cannot be greater than Maximum value.");
      return;
    }

    const newNutrient = {
      id: normalizedInputId,
      name: newNutrientName.trim(),
      unit: newNutrientUnit.trim() || "%",
      min: newNutrientMin.trim(),
      max: newNutrientMax.trim(),
      isCustom: true,
    };

    setNutrients((prev) => [...prev, newNutrient]);

    setNewNutrientId("");
    setNewNutrientName("");
    setNewNutrientUnit("%");
    setNewNutrientMin("");
    setNewNutrientMax("");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        {/* Guidance Banner */}
        <View
          style={{
            marginHorizontal: 12,
            marginTop: 4,
            marginBottom: 8,
            padding: 12,
            backgroundColor: "#E8F5E9",
            borderLeftWidth: 5,
            borderLeftColor: "#2E7D32",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#1B5E20", fontSize: 13, lineHeight: 19 }}>
            Tap suggested nutrients below, load an animal profile, or create your own
            unique custom nutrient.
          </Text>
        </View>

        {/* Smart Suggested Nutrients */}
        {availableSuggestions.length > 0 && (
          <View style={{ marginHorizontal: 12, marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#444",
                marginBottom: 8,
              }}
            >
              Suggested Nutrients (Tap to Add)
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {availableSuggestions.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleAddSuggested(item)}
                    style={{
                      backgroundColor: "#E3F2FD",
                      borderColor: "#90CAF9",
                      borderWidth: 1,
                      borderRadius: 20,
                      paddingHorizontal: 12,
                      paddingVertical: 7,
                    }}
                  >
                    <Text style={{ color: "#0D47A1", fontWeight: "600", fontSize: 13 }}>
                      + {item.id} ({item.name})
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Active Nutrients List */}
        <View>
          {nutrients.length === 0 ? (
            <Text style={{ textAlign: "center", color: "#777", marginVertical: 20 }}>
              No nutrients selected. Tap a suggestion or load a profile below.
            </Text>
          ) : (
            nutrients.map((nutrient) => (
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
            ))
          )}
        </View>

        {/* Create Custom Unique Nutrient */}
        <Card
          style={{
            marginHorizontal: 12,
            marginTop: 12,
            padding: 14,
            backgroundColor: "#fff",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#1B5E20",
              marginBottom: 10,
            }}
          >
            Create Custom Unique Nutrient
          </Text>

          <View style={{ gap: 10 }}>
            <TextInput
              placeholder="Nutrient ID (e.g. ASH, ZN, LYS)"
              value={newNutrientId}
              onChangeText={setNewNutrientId}
              autoCapitalize="characters"
              style={{
                borderWidth: 1,
                borderColor: nutrientExists ? "#D32F2F" : "#ccc",
                borderRadius: 8,
                padding: 10,
              }}
            />

            {nutrientExists && (
              <Text style={{ color: "#D32F2F", fontSize: 12 }}>
                Nutrient ID "{normalizedInputId}" is already added.
              </Text>
            )}

            <TextInput
              placeholder="Nutrient Name (e.g. Total Ash, Zinc)"
              value={newNutrientName}
              onChangeText={setNewNutrientName}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
              }}
            />

            <View>
              <TextInput
                placeholder="Unit (e.g. %, kcal/kg, mg/kg)"
                value={newNutrientUnit}
                onChangeText={setNewNutrientUnit}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 10,
                }}
              />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 6 }}
              >
                <View style={{ flexDirection: "row", gap: 6 }}>
                  {QUICK_UNITS.map((u) => (
                    <TouchableOpacity
                      key={u}
                      onPress={() => setNewNutrientUnit(u)}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 14,
                        backgroundColor:
                          newNutrientUnit === u ? "#2E7D32" : "#EEEEEE",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: newNutrientUnit === u ? "#fff" : "#333",
                        }}
                      >
                        {u}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TextInput
                placeholder="Min (optional)"
                keyboardType="numeric"
                value={newNutrientMin}
                onChangeText={setNewNutrientMin}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 10,
                }}
              />
              <TextInput
                placeholder="Max (optional)"
                keyboardType="numeric"
                value={newNutrientMax}
                onChangeText={setNewNutrientMax}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 10,
                }}
              />
            </View>

            <TouchableOpacity
              onPress={handleAddNutrient}
              style={{
                backgroundColor: "#2E7D32",
                paddingVertical: 13,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
                + Add Custom Nutrient
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {onGoToFeedstuffs && (
          <TouchableOpacity
            onPress={onGoToFeedstuffs}
            style={{
              marginHorizontal: 12,
              marginTop: 14,
              backgroundColor: "#1565C0",
              paddingVertical: 14,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
              Next: Configure Feedstuffs →
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Quick Load Animal Profiles */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingVertical: 10,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#e0e0e0",
        }}
      >
        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            color: "#666",
            paddingHorizontal: 12,
            marginBottom: 6,
          }}
        >
          QUICK LOAD PRESET PROFILES
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          <View style={{ flexDirection: "row" }}>
            {PROFILE_META.map((profile) => (
              <TouchableOpacity
                key={profile.key}
                onPress={() => loadProfile(profile.key, profile.title)}
                style={{
                  width: 195,
                  marginRight: 10,
                  backgroundColor: profile.bg,
                  borderRadius: 12,
                  padding: 12,
                  elevation: 1,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", color: profile.color }}
                >
                  {profile.title}
                </Text>
                <Text style={{ fontSize: 11, color: "#555", marginTop: 3 }}>
                  {profile.subtitle}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default NutrientTab;