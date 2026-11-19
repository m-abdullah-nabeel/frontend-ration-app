import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Card } from "react-native-paper";
import {
  FEEDSTUFF_CATEGORIES,
  STORE_FEEDSTUFFS,
} from "../expert-ff-data/feedstuffStore";

const FeedstuffTab = ({
  nutrientsSelected,
  feedstuffs,
  setFeedstuffs,
  batchKg,
  setBatchKg,
  onFormulate,
  onViewResults,
  hasResults,
}) => {
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState("add"); // "add" | "edit"
  const [editingFeed, setEditingFeed] = useState(null);

  const handleUpdateField = (id, field, value) => {
    setFeedstuffs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDeleteFeed = (id, name) => {
    Alert.alert("Remove Feedstuff", `Remove "${name}" from this formulation?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () =>
          setFeedstuffs((prev) => prev.filter((item) => item.id !== id)),
      },
    ]);
  };

  const openAddCustomModal = () => {
    setFormMode("add");
    setEditingFeed(null);
    setShowFormModal(true);
  };

  const openEditModal = (feedItem) => {
    setFormMode("edit");
    setEditingFeed(feedItem);
    setShowFormModal(true);
  };

  const handleSaveForm = (savedFeed) => {
    if (formMode === "add") {
      setFeedstuffs((prev) => [savedFeed, ...prev]);
    } else {
      setFeedstuffs((prev) =>
        prev.map((item) => (item.id === savedFeed.id ? savedFeed : item))
      );
    }
    setShowFormModal(false);
    setEditingFeed(null);
  };

  const handleToggleStoreItem = (storeItem) => {
    setFeedstuffs((prev) => {
      const exists = prev.some(
        (f) => f.id === storeItem.id || f.storeName === storeItem.storeName
      );
      if (exists) {
        return prev.filter(
          (f) => f.id !== storeItem.id && f.storeName !== storeItem.storeName
        );
      }
      return [...prev, { ...storeItem, nutrients: { ...storeItem.nutrients } }];
    });
  };

  // Count how many feedstuffs have missing values for active nutrients
  const missingCount = useMemo(() => {
    return feedstuffs.reduce((count, f) => {
      const hasMissing = nutrientsSelected.some((n) => {
        const val = f.nutrients?.[n.id];
        return val === undefined || val === null || String(val).trim() === "";
      });
      return count + (hasMissing ? 1 : 0);
    }, 0);
  }, [feedstuffs, nutrientsSelected]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 95 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Active Nutrients & Ration Target Info */}
        <View
          style={{
            marginHorizontal: 12,
            marginTop: 6,
            padding: 12,
            backgroundColor: "#E8F5E9",
            borderLeftWidth: 5,
            borderLeftColor: "#4CAF50",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#1B5E20", fontWeight: "bold", fontSize: 13 }}>
            Active Nutrients ({nutrientsSelected.length}):{" "}
            {nutrientsSelected.length > 0
              ? nutrientsSelected.map((n) => n.id).join(", ")
              : "None selected"}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 8,
              paddingTop: 8,
              borderTopWidth: 1,
              borderTopColor: "#C8E6C9",
            }}
          >
            <Text style={{ color: "#2E7D32", fontSize: 13, fontWeight: "600" }}>
              Ration Batch Target (kg DM):
            </Text>
            <TextInput
              value={batchKg}
              onChangeText={setBatchKg}
              keyboardType="numeric"
              placeholder="100"
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#A5D6A7",
                borderRadius: 6,
                paddingHorizontal: 10,
                paddingVertical: 4,
                minWidth: 75,
                textAlign: "center",
                fontWeight: "bold",
                color: "#1B5E20",
              }}
            />
          </View>
        </View>

        {/* Missing Nutrients Banner */}
        {missingCount > 0 && (
          <View
            style={{
              marginHorizontal: 12,
              marginTop: 8,
              padding: 10,
              backgroundColor: "#FFF3E0",
              borderLeftWidth: 4,
              borderLeftColor: "#FB8C00",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#E65100", fontSize: 12, lineHeight: 17 }}>
              {missingCount} feedstuff{missingCount > 1 ? "s are" : " is"} missing
              values for one or more active nutrients (e.g., store ingredients only
              include DM, CP, NDF, ME). Tap "Edit Feedstuff" on highlighted cards to
              fill them in.
            </Text>
          </View>
        )}

        {/* Load Store or Add Custom Buttons */}
        <View style={{ padding: 12, flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            onPress={() => setShowStoreModal(true)}
            style={{
              flex: 1,
              backgroundColor: "#E3F2FD",
              padding: 13,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#90CAF9",
            }}
          >
            <Text style={{ color: "#0D47A1", fontWeight: "bold", fontSize: 14 }}>
              📦 Load from Store
            </Text>
            <Text style={{ fontSize: 11, color: "#455A64", marginTop: 3 }}>
              {STORE_FEEDSTUFFS.length} ingredients available
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openAddCustomModal}
            style={{
              flex: 1,
              backgroundColor: "#E8F5E9",
              padding: 13,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#A5D6A7",
            }}
          >
            <Text style={{ color: "#1B5E20", fontWeight: "bold", fontSize: 14 }}>
              ➕ Add Custom
            </Text>
            <Text style={{ fontSize: 11, color: "#455A64", marginTop: 3 }}>
              Create unique feedstuff
            </Text>
          </TouchableOpacity>
        </View>

        {/* Selected Feedstuffs List */}
        {feedstuffs.length === 0 ? (
          <View
            style={{
              margin: 12,
              padding: 24,
              backgroundColor: "#fff",
              borderRadius: 12,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#E0E0E0",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#555" }}>
              No Feedstuffs Selected
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#777",
                textAlign: "center",
                marginTop: 6,
              }}
            >
              Load ingredients from the Store or create your own custom feedstuff
              above.
            </Text>
          </View>
        ) : (
          feedstuffs.map((item) => (
            <FeedstuffCard
              key={item.id}
              item={item}
              nutrientsSelected={nutrientsSelected}
              onUpdateField={handleUpdateField}
              onEdit={() => openEditModal(item)}
              onDelete={() => handleDeleteFeed(item.id, item.name)}
            />
          ))
        )}
      </ScrollView>

      {/* Store Feedstuffs Picker Modal */}
      <StoreFeedstuffsModal
        visible={showStoreModal}
        onClose={() => setShowStoreModal(false)}
        selectedFeedstuffs={feedstuffs}
        onToggleItem={handleToggleStoreItem}
      />

      {/* Unified Add / Edit Feedstuff Modal */}
      <FeedstuffFormModal
        visible={showFormModal}
        mode={formMode}
        initialFeed={editingFeed}
        nutrientsSelected={nutrientsSelected}
        existingFeedstuffs={feedstuffs}
        onClose={() => {
          setShowFormModal(false);
          setEditingFeed(null);
        }}
        onSave={handleSaveForm}
      />

      {/* Sticky Bottom Action Bar */}
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
        <TouchableOpacity
          onPress={onFormulate}
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
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
            Formulate Feed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onViewResults}
          style={{
            flex: 1,
            backgroundColor: hasResults ? "#2196F3" : "#90CAF9",
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            elevation: hasResults ? 2 : 0,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
            View Results
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* ============================================================================
 * Feedstuff Card Component
 * ============================================================================ */
const FeedstuffCard = ({
  item,
  nutrientsSelected,
  onUpdateField,
  onEdit,
  onDelete,
}) => {
  const missingNutrients = nutrientsSelected.filter((n) => {
    const val = item.nutrients?.[n.id];
    return val === undefined || val === null || String(val).trim() === "";
  });

  const minVal = parseFloat(item.minPct);
  const maxVal = parseFloat(item.maxPct);
  const hasRangeError =
    !Number.isNaN(minVal) &&
    !Number.isNaN(maxVal) &&
    (minVal > maxVal || minVal < 0 || maxVal > 100);

  return (
    <Card
      style={{
        marginHorizontal: 12,
        marginVertical: 6,
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 12,
      }}
    >
      {/* Header Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#222" }}>
            {item.name}
          </Text>
          <View style={{ flexDirection: "row", gap: 6, marginTop: 4 }}>
            <View
              style={{
                backgroundColor: item.source === "custom" ? "#E8F5E9" : "#E3F2FD",
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: item.source === "custom" ? "#2E7D32" : "#1565C0",
                }}
              >
                {item.source === "custom" ? "Custom Feedstuff" : "From Store"}
              </Text>
            </View>
            {item.category ? (
              <View
                style={{
                  backgroundColor: "#F5F5F5",
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 6,
                }}
              >
                <Text style={{ fontSize: 11, color: "#666" }}>{item.category}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <TouchableOpacity
          onPress={onDelete}
          style={{
            backgroundColor: "#FFEBEE",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#C62828", fontWeight: "bold", fontSize: 12 }}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>

      {/* Missing Nutrients Warning */}
      {missingNutrients.length > 0 && (
        <TouchableOpacity
          onPress={onEdit}
          style={{
            marginTop: 8,
            paddingHorizontal: 10,
            paddingVertical: 6,
            backgroundColor: "#FFF3E0",
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#FFCC80",
          }}
        >
          <Text style={{ fontSize: 12, color: "#E65100", fontWeight: "600" }}>
            Missing: {missingNutrients.map((n) => n.id).join(", ")} — Tap to enter
          </Text>
        </TouchableOpacity>
      )}

      {/* Nutrient Snapshot Chips */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 6,
          marginTop: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#F5F5F5",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
          }}
        >
          <Text style={{ fontSize: 11, color: "#444" }}>
            DM: <Text style={{ fontWeight: "bold" }}>{item.nutrients?.DM || "—"}%</Text>
          </Text>
        </View>

        {nutrientsSelected
          .filter((n) => n.id !== "DM")
          .map((n) => {
            const val = item.nutrients?.[n.id];
            const isMissing =
              val === undefined || val === null || String(val).trim() === "";
            return (
              <View
                key={n.id}
                style={{
                  backgroundColor: isMissing ? "#FFF8E1" : "#F5F5F5",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    color: isMissing ? "#E65100" : "#444",
                  }}
                >
                  {n.id}:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {isMissing ? "—" : val}
                  </Text>
                </Text>
              </View>
            );
          })}
      </View>

      {/* Inline Cost, Min %, Max % */}
      <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
        <View style={{ flex: 1.2 }}>
          <Text style={{ fontSize: 11, color: "#666", marginBottom: 3 }}>
            Cost (Rs./kg)
          </Text>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            value={String(item.cost ?? "")}
            onChangeText={(val) => onUpdateField(item.id, "cost", val)}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 8,
              fontWeight: "600",
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 11, color: "#666", marginBottom: 3 }}>
            Min (%)
          </Text>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            value={String(item.minPct ?? "")}
            onChangeText={(val) => onUpdateField(item.id, "minPct", val)}
            style={{
              borderWidth: 1,
              borderColor: hasRangeError ? "#D32F2F" : "#ccc",
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 11, color: "#666", marginBottom: 3 }}>
            Max (%)
          </Text>
          <TextInput
            placeholder="100"
            keyboardType="numeric"
            value={String(item.maxPct ?? "")}
            onChangeText={(val) => onUpdateField(item.id, "maxPct", val)}
            style={{
              borderWidth: 1,
              borderColor: hasRangeError ? "#D32F2F" : "#ccc",
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}
          />
        </View>
      </View>

      {hasRangeError && (
        <Text style={{ fontSize: 11, color: "#D32F2F", marginTop: 4 }}>
          Min % and Max % must be between 0–100 with Min ≤ Max.
        </Text>
      )}

      {/* Edit Button */}
      <TouchableOpacity
        onPress={onEdit}
        style={{
          marginTop: 10,
          backgroundColor: "#2196F3",
          paddingVertical: 10,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}>
          Edit Feedstuff & Nutrient Composition
        </Text>
      </TouchableOpacity>
    </Card>
  );
};

/* ============================================================================
 * Store Feedstuffs Picker Modal
 * ============================================================================ */
const StoreFeedstuffsModal = ({
  visible,
  onClose,
  selectedFeedstuffs,
  onToggleItem,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Suggested");

  const filteredList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return STORE_FEEDSTUFFS.filter((item) => {
      const matchesCategory =
        activeCategory === "All" ||
        (activeCategory === "Suggested" && item.isSuggested) ||
        item.category === activeCategory;

      const matchesSearch =
        q === "" || item.name.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const isSelected = (storeItem) =>
    selectedFeedstuffs.some(
      (f) => f.id === storeItem.id || f.storeName === storeItem.storeName
    );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
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
            height: "85%",
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16,
          }}
        >
          {/* Modal Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#0D47A1" }}>
                Feedstuff Store
              </Text>
              <Text style={{ fontSize: 12, color: "#666" }}>
                Tap items to add or remove ({selectedFeedstuffs.length} selected)
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: "#4CAF50",
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Done</Text>
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              paddingHorizontal: 10,
              marginBottom: 10,
              backgroundColor: "#FAFAFA",
            }}
          >
            <TextInput
              placeholder="Search feedstuffs (e.g. Barseem, Silage, Soybean)..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ flex: 1, paddingVertical: 9, fontSize: 14 }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Text style={{ color: "#888", fontWeight: "bold", padding: 4 }}>
                  Clear
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Category Filter Chips */}
          <View style={{ marginBottom: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {FEEDSTUFF_CATEGORIES.map((cat) => {
                  const active = activeCategory === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => setActiveCategory(cat)}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 7,
                        borderRadius: 20,
                        backgroundColor: active ? "#1565C0" : "#F0F4F8",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: active ? "#fff" : "#333",
                        }}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          {/* Store Ingredient List */}
          <FlatList
            data={filteredList}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text
                style={{
                  textAlign: "center",
                  color: "#777",
                  marginTop: 30,
                  fontSize: 14,
                }}
              >
                No feedstuffs match "{searchQuery}".
              </Text>
            }
            renderItem={({ item }) => {
              const added = isSelected(item);
              return (
                <TouchableOpacity
                  onPress={() => onToggleItem(item)}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 12,
                    marginBottom: 8,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: added ? "#4CAF50" : "#E0E0E0",
                    backgroundColor: added ? "#E8F5E9" : "#fff",
                  }}
                >
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#222",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 11, color: "#666", marginTop: 3 }}>
                      DM: {item.nutrients.DM || "—"}% • CP: {item.nutrients.CP || "—"}%
                      {" • "}ME: {item.nutrients.ME || "—"} • NDF:{" "}
                      {item.nutrients.NDF || "—"}%
                    </Text>
                    <Text style={{ fontSize: 11, color: "#2E7D32", marginTop: 2 }}>
                      Default Price: Rs. {item.cost}/kg • {item.category}
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: added ? "#4CAF50" : "#E3F2FD",
                      paddingHorizontal: 12,
                      paddingVertical: 7,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: added ? "#fff" : "#1565C0",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      {added ? "✓ Added" : "+ Add"}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

/* ============================================================================
 * Unified Add / Edit Feedstuff Modal
 * ============================================================================ */
const FeedstuffFormModal = ({
  visible,
  mode, // "add" | "edit"
  initialFeed,
  nutrientsSelected,
  existingFeedstuffs,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("10");
  const [minPct, setMinPct] = useState("0");
  const [maxPct, setMaxPct] = useState("100");
  const [nutrientValues, setNutrientValues] = useState({});

  useEffect(() => {
    if (!visible) return;

    if (mode === "edit" && initialFeed) {
      setName(initialFeed.name || "");
      setCost(String(initialFeed.cost ?? "0"));
      setMinPct(String(initialFeed.minPct ?? "0"));
      setMaxPct(String(initialFeed.maxPct ?? "100"));
      setNutrientValues({ ...(initialFeed.nutrients || {}) });
    } else {
      setName("");
      setCost("10");
      setMinPct("0");
      setMaxPct("100");
      const emptyNutrients = { DM: "" };
      nutrientsSelected.forEach((n) => {
        emptyNutrients[n.id] = "";
      });
      setNutrientValues(emptyNutrients);
    }
  }, [visible, mode, initialFeed, nutrientsSelected]);

  const handleNutrientChange = (nutrientId, val) => {
    setNutrientValues((prev) => ({
      ...prev,
      [nutrientId]: val,
    }));
  };

  const handlePressSave = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      Alert.alert("Name Required", "Please enter a feedstuff name.");
      return;
    }

    const duplicate = existingFeedstuffs.some(
      (f) =>
        f.name.trim().toLowerCase() === trimmedName.toLowerCase() &&
        f.id !== initialFeed?.id
    );
    if (duplicate) {
      Alert.alert(
        "Duplicate Name",
        `A feedstuff named "${trimmedName}" is already in your list.`
      );
      return;
    }

    const parsedCost = parseFloat(cost);
    if (Number.isNaN(parsedCost) || parsedCost < 0) {
      Alert.alert("Invalid Price", "Please enter a valid non-negative price.");
      return;
    }

    const parsedMin = parseFloat(minPct);
    const parsedMax = parseFloat(maxPct);
    if (
      Number.isNaN(parsedMin) ||
      Number.isNaN(parsedMax) ||
      parsedMin < 0 ||
      parsedMax > 100 ||
      parsedMin > parsedMax
    ) {
      Alert.alert(
        "Invalid Inclusion Range",
        "Min % and Max % must be between 0 and 100, with Min ≤ Max."
      );
      return;
    }

    const parsedDM = parseFloat(nutrientValues.DM);
    if (Number.isNaN(parsedDM) || parsedDM <= 0 || parsedDM > 100) {
      Alert.alert(
        "Dry Matter Required",
        "Please enter a valid Dry Matter (DM %) between 1 and 100."
      );
      return;
    }

    const savedObject = {
      id:
        mode === "edit" && initialFeed
          ? initialFeed.id
          : `custom_${Date.now()}`,
      storeName: initialFeed?.storeName || null,
      category: initialFeed?.category || "Custom",
      source: mode === "edit" && initialFeed ? initialFeed.source : "custom",
      name: trimmedName,
      cost: cost.trim(),
      minPct: minPct.trim(),
      maxPct: maxPct.trim(),
      nutrients: { ...nutrientValues },
    };

    onSave(savedObject);
  };

  // Render DM once at the top, then all other active nutrients from Tab 1
  const dynamicNutrients = nutrientsSelected.filter((n) => n.id !== "DM");

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      >
        <View
          style={{
            maxHeight: "88%",
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1B5E20" }}>
              {mode === "edit" ? "Edit Feedstuff" : "Create Custom Feedstuff"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ color: "#D32F2F", fontWeight: "bold", fontSize: 15 }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {/* Feed Name */}
            <Text style={{ fontSize: 12, fontWeight: "600", color: "#555", marginBottom: 4 }}>
              Feedstuff Name *
            </Text>
            <TextInput
              placeholder="e.g. Farm Maize Silage or Mineral Mix"
              value={name}
              onChangeText={setName}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 12,
              }}
            />

            {/* Price & Inclusion Limits */}
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 14 }}>
              <View style={{ flex: 1.2 }}>
                <Text style={{ fontSize: 12, fontWeight: "600", color: "#555", marginBottom: 4 }}>
                  Price (Rs./kg) *
                </Text>
                <TextInput
                  placeholder="e.g. 12"
                  keyboardType="numeric"
                  value={cost}
                  onChangeText={setCost}
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 10,
                  }}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: "600", color: "#555", marginBottom: 4 }}>
                  Min (%)
                </Text>
                <TextInput
                  placeholder="0"
                  keyboardType="numeric"
                  value={minPct}
                  onChangeText={setMinPct}
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 10,
                  }}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: "600", color: "#555", marginBottom: 4 }}>
                  Max (%)
                </Text>
                <TextInput
                  placeholder="100"
                  keyboardType="numeric"
                  value={maxPct}
                  onChangeText={setMaxPct}
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 10,
                  }}
                />
              </View>
            </View>

            {/* Nutrient Composition Section */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#333",
                marginBottom: 8,
                paddingTop: 8,
                borderTopWidth: 1,
                borderTopColor: "#EEE",
              }}
            >
              Nutrient Composition (DM Basis)
            </Text>

            {/* Always include Dry Matter */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                gap: 10,
              }}
            >
              <View style={{ flex: 1.4 }}>
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#222" }}>
                  Dry Matter (DM) *
                </Text>
                <Text style={{ fontSize: 11, color: "#777" }}>Unit: %</Text>
              </View>
              <TextInput
                placeholder="e.g. 25"
                keyboardType="numeric"
                value={String(nutrientValues.DM ?? "")}
                onChangeText={(val) => handleNutrientChange("DM", val)}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 10,
                }}
              />
            </View>

            {/* Dynamic Selected Nutrients from Tab 1 */}
            {dynamicNutrients.length === 0 ? (
              <Text style={{ fontSize: 12, color: "#777", marginBottom: 10 }}>
                Add nutrients in the Nutrient Requirements tab to enter their values
                here.
              </Text>
            ) : (
              dynamicNutrients.map((nutrient) => (
                <View
                  key={nutrient.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    gap: 10,
                  }}
                >
                  <View style={{ flex: 1.4 }}>
                    <Text style={{ fontSize: 13, fontWeight: "600", color: "#222" }}>
                      {nutrient.name} ({nutrient.id})
                    </Text>
                    <Text style={{ fontSize: 11, color: "#777" }}>
                      Unit: {nutrient.unit || "%"}
                    </Text>
                  </View>
                  <TextInput
                    placeholder={`Enter ${nutrient.id}`}
                    keyboardType="numeric"
                    value={String(nutrientValues[nutrient.id] ?? "")}
                    onChangeText={(val) => handleNutrientChange(nutrient.id, val)}
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 8,
                      padding: 10,
                    }}
                  />
                </View>
              ))
            )}

            {/* Save Button */}
            <TouchableOpacity
              onPress={handlePressSave}
              style={{
                backgroundColor: "#4CAF50",
                padding: 14,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
                {mode === "edit" ? "Save Changes" : "Add Feedstuff"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default FeedstuffTab;