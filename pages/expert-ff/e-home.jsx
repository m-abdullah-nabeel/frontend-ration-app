import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { selectSpecies } from "../../redux/speciesSlice";
import { getStarterFeedstuffs } from "../expert-ff-data/feedstuffStore";
import NutrientTab from "./nutrient_tab";
import FeedstuffTab from "./feedstuff_tab";

const ExpertHome = ({ navigation }) => {
  const selectedSpecies = useSelector(selectSpecies);
  const [activeTab, setActiveTab] = useState("nutrients");

  const [nutrients, setNutrients] = useState([
    { id: "CP", name: "Crude Protein", unit: "%", min: "18", max: "22" },
    { id: "ME", name: "Metabolizable Energy", unit: "kcal/kg", min: "2500", max: "3000" },
    { id: "Ca", name: "Calcium", unit: "%", min: "0.8", max: "1.2" },
  ]);

  const [feedstuffs, setFeedstuffs] = useState(() => getStarterFeedstuffs());
  const [batchKg, setBatchKg] = useState("100");

  const [lastPayload, setLastPayload] = useState(null);
  const [showResultsModal, setShowResultsModal] = useState(false);

  const parseOptionalNum = (val) => {
    if (val === undefined || val === null || String(val).trim() === "") return null;
    const num = parseFloat(val);
    return Number.isNaN(num) ? null : num;
  };

  const buildPayload = () => {
    const parsedBatch = parseFloat(batchKg);

    return {
      species: selectedSpecies || "Custom",
      batch_kg: Number.isNaN(parsedBatch) || parsedBatch <= 0 ? 100 : parsedBatch,
      nutrients: nutrients.map((n) => ({
        id: n.id,
        name: n.name,
        unit: n.unit || "%",
        min: parseOptionalNum(n.min),
        max: parseOptionalNum(n.max),
      })),
      feedstuffs: feedstuffs.map((f) => {
        const minPct = parseFloat(f.minPct);
        const maxPct = parseFloat(f.maxPct);
        const costVal = parseFloat(f.cost);
        const dmVal = parseFloat(f.nutrients?.DM);

        const nutrientMap = {};
        // Always include DM if available
        nutrientMap.DM = Number.isNaN(dmVal) ? 0 : dmVal;

        // Include all currently selected nutrients (missing default to 0)
        nutrients.forEach((n) => {
          const val = parseFloat(f.nutrients?.[n.id]);
          nutrientMap[n.id] = Number.isNaN(val) ? 0 : val;
        });

        return {
          id: f.id,
          name: f.name,
          source: f.source || "custom",
          cost_as_fed: Number.isNaN(costVal) ? 0 : costVal,
          min_inclusion: Number.isNaN(minPct) ? 0 : Number((minPct / 100).toFixed(4)),
          max_inclusion: Number.isNaN(maxPct) ? 1 : Number((maxPct / 100).toFixed(4)),
          dm_pct: Number.isNaN(dmVal) ? 100 : dmVal,
          nutrients: nutrientMap,
        };
      }),
    };
  };

  const validateAndFormulate = () => {
    if (nutrients.length === 0) {
      Alert.alert(
        "No Nutrients Defined",
        "Please add at least 1 nutrient requirement in the Nutrient Requirements tab."
      );
      setActiveTab("nutrients");
      return;
    }

    for (const n of nutrients) {
      const minVal = parseOptionalNum(n.min);
      const maxVal = parseOptionalNum(n.max);
      if (minVal === null && maxVal === null) {
        Alert.alert(
          "Incomplete Nutrient Requirement",
          `Please enter at least a Min or Max target for ${n.name} (${n.id}).`
        );
        setActiveTab("nutrients");
        return;
      }
      if (minVal !== null && maxVal !== null && minVal > maxVal) {
        Alert.alert(
          "Invalid Nutrient Range",
          `For ${n.name} (${n.id}), Min (${minVal}) cannot be greater than Max (${maxVal}).`
        );
        setActiveTab("nutrients");
        return;
      }
    }

    if (feedstuffs.length < 2) {
      Alert.alert(
        "More Feedstuffs Needed",
        "Please add at least 2 feedstuffs to formulate a least-cost ration."
      );
      return;
    }

    let totalMinPct = 0;
    let totalMaxPct = 0;

    for (const f of feedstuffs) {
      const cost = parseFloat(f.cost);
      const minPct = parseFloat(f.minPct);
      const maxPct = parseFloat(f.maxPct);
      const dm = parseFloat(f.nutrients?.DM);

      if (Number.isNaN(cost) || cost < 0) {
        Alert.alert("Invalid Cost", `Please enter a valid cost (Rs./kg) for "${f.name}".`);
        return;
      }
      if (Number.isNaN(dm) || dm <= 0 || dm > 100) {
        Alert.alert(
          "Invalid Dry Matter (DM %)",
          `Please edit "${f.name}" and enter a valid Dry Matter % between 1 and 100.`
        );
        return;
      }
      if (
        Number.isNaN(minPct) ||
        Number.isNaN(maxPct) ||
        minPct < 0 ||
        maxPct > 100 ||
        minPct > maxPct
      ) {
        Alert.alert(
          "Invalid Inclusion Limits",
          `For "${f.name}", Min % and Max % must be between 0 and 100, with Min ≤ Max.`
        );
        return;
      }

      totalMinPct += minPct;
      totalMaxPct += maxPct;
    }

    if (totalMinPct > 100.01) {
      Alert.alert(
        "Infeasible Min Limits",
        `Total minimum inclusion across all feedstuffs is ${totalMinPct.toFixed(
          1
        )}%, which exceeds 100%. Please reduce some Min % limits.`
      );
      return;
    }

    if (totalMaxPct < 99.99) {
      Alert.alert(
        "Infeasible Max Limits",
        `Total maximum inclusion across all feedstuffs is ${totalMaxPct.toFixed(
          1
        )}%, which is below 100%. Please increase Max % limits or add more feedstuffs.`
      );
      return;
    }

    // Check for missing nutrient values across active nutrients
    const missingItems = [];
    feedstuffs.forEach((f) => {
      const missingForFeed = nutrients
        .filter((n) => {
          const val = f.nutrients?.[n.id];
          return val === undefined || val === null || String(val).trim() === "";
        })
        .map((n) => n.id);

      if (missingForFeed.length > 0) {
        missingItems.push(`• ${f.name}: ${missingForFeed.join(", ")}`);
      }
    });

    const finalizePreview = () => {
      const payload = buildPayload();
      setLastPayload(payload);
      setShowResultsModal(true);
    };

    if (missingItems.length > 0) {
      Alert.alert(
        "Missing Nutrient Values",
        `Some feedstuffs do not have values for all active nutrients:\n\n${missingItems
          .slice(0, 5)
          .join("\n")}${
          missingItems.length > 5 ? `\n...and ${missingItems.length - 5} more` : ""
        }\n\nYou can go back and tap Edit on those feedstuffs, or proceed treating missing values as 0.`,
        [
          { text: "Go Back & Edit", style: "cancel" },
          { text: "Proceed (Use 0)", onPress: finalizePreview },
        ]
      );
      return;
    }

    finalizePreview();
  };

  const handleViewResults = () => {
    if (!lastPayload) {
      Alert.alert(
        "No Formulation Yet",
        'Tap "Formulate Feed" first to validate and generate your ration data.'
      );
      return;
    }
    setShowResultsModal(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F7F9F7" }}>
      {/* Top Tabs */}
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          borderRadius: 10,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#ccc",
          backgroundColor: "#fff",
        }}
      >
        <TouchableOpacity
          onPress={() => setActiveTab("nutrients")}
          style={{
            flex: 1,
            paddingVertical: 13,
            alignItems: "center",
            backgroundColor: activeTab === "nutrients" ? "#4CAF50" : "#f5f5f5",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: activeTab === "nutrients" ? "#fff" : "#333",
            }}
          >
            Nutrient Requirements ({nutrients.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("feedstuffs")}
          style={{
            flex: 1,
            paddingVertical: 13,
            alignItems: "center",
            backgroundColor: activeTab === "feedstuffs" ? "#4CAF50" : "#f5f5f5",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: activeTab === "feedstuffs" ? "#fff" : "#333",
            }}
          >
            Feedstuffs ({feedstuffs.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === "nutrients" && (
        <NutrientTab nutrients={nutrients} setNutrients={setNutrients} />
      )}

      {activeTab === "feedstuffs" && (
        <FeedstuffTab
          nutrientsSelected={nutrients}
          feedstuffs={feedstuffs}
          setFeedstuffs={setFeedstuffs}
          batchKg={batchKg}
          setBatchKg={setBatchKg}
          onFormulate={validateAndFormulate}
          onViewResults={handleViewResults}
          hasResults={Boolean(lastPayload)}
        />
      )}

      {/* Payload / Results Preview Modal (Ready for Phase 2 FastAPI integration) */}
      <Modal
        visible={showResultsModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowResultsModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        >
          <View
            style={{
              maxHeight: "82%",
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1B5E20" }}>
                Formulation Request Ready
              </Text>
              <TouchableOpacity onPress={() => setShowResultsModal(false)}>
                <Text style={{ color: "#D32F2F", fontWeight: "bold", fontSize: 15 }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 12, color: "#555", marginBottom: 10 }}>
              All frontend validations passed. This structured payload is ready to be sent
              to the upgraded FastAPI solver in the next step:
            </Text>

            <ScrollView
              style={{
                backgroundColor: "#F4F6F8",
                borderRadius: 10,
                padding: 12,
                borderWidth: 1,
                borderColor: "#E0E0E0",
              }}
            >
              <Text
                selectable
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#222",
                }}
              >
                {JSON.stringify(lastPayload, null, 2)}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExpertHome;