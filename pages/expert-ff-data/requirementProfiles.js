import StoreIngredientsRaw from "../../assets/data/ingredients.json";

export const SUGGESTED_NUTRIENTS = [
  { id: "DM", name: "Dry Matter", unit: "%", min: "85", max: "100" },
  { id: "CP", name: "Crude Protein", unit: "%", min: "15", max: "18" },
  { id: "ME", name: "Metabolizable Energy", unit: "kcal/kg", min: "2500", max: "2900" },
  { id: "NDF", name: "Neutral Detergent Fiber", unit: "%", min: "28", max: "36" },
  { id: "ADF", name: "Acid Detergent Fiber", unit: "%", min: "18", max: "22" },
  { id: "TDN", name: "Total Digestible Nutrients", unit: "%", min: "65", max: "75" },
  { id: "EE", name: "Ether Extract", unit: "%", min: "3", max: "6" },
  { id: "CF", name: "Crude Fiber", unit: "%", min: "12", max: "20" },
  { id: "Ca", name: "Calcium", unit: "%", min: "0.8", max: "1.2" },
  { id: "P", name: "Phosphorus", unit: "%", min: "0.4", max: "0.6" },
  { id: "AvP", name: "Available Phosphorus", unit: "%", min: "0.45", max: "0.65" },
  { id: "Lys", name: "Lysine", unit: "%", min: "1.1", max: "1.3" },
  { id: "Met", name: "Methionine", unit: "%", min: "0.45", max: "0.60" },
  { id: "Na", name: "Sodium", unit: "%", min: "0.15", max: "0.20" },
];

export const PROFILE_META = [
  {
    key: "DAIRY_CATTLE",
    title: "Dairy Cattle",
    subtitle: "Lactating cow/buffalo defaults",
    bg: "#E8F5E9",
    color: "#2E7D32",
  },
  {
    key: "BROILER_STARTER",
    title: "Broiler Poultry",
    subtitle: "Starter ration defaults",
    bg: "#E3F2FD",
    color: "#1565C0",
  },
  {
    key: "BEEF_CATTLE",
    title: "Beef Cattle",
    subtitle: "Growing/finishing defaults",
    bg: "#FFF3E0",
    color: "#EF6C00",
  },
];

export const REQUIREMENT_PROFILES = {
  BROILER_STARTER: [
    { id: "CP", name: "Crude Protein", unit: "%", min: "20", max: "23" },
    { id: "ME", name: "Metabolizable Energy", unit: "kcal/kg", min: "3000", max: "3200" },
    { id: "Lys", name: "Lysine", unit: "%", min: "1.1", max: "1.3" },
    { id: "Met", name: "Methionine", unit: "%", min: "0.45", max: "0.60" },
    { id: "Ca", name: "Calcium", unit: "%", min: "0.9", max: "1.2" },
    { id: "AvP", name: "Available Phosphorus", unit: "%", min: "0.45", max: "0.65" },
    { id: "Na", name: "Sodium", unit: "%", min: "0.15", max: "0.20" },
  ],

  DAIRY_CATTLE: [
    { id: "CP", name: "Crude Protein", unit: "%", min: "16", max: "18" },
    { id: "ME", name: "Metabolizable Energy", unit: "kcal/kg", min: "2600", max: "2900" },
    { id: "NDF", name: "Neutral Detergent Fiber", unit: "%", min: "28", max: "35" },
    { id: "ADF", name: "Acid Detergent Fiber", unit: "%", min: "18", max: "22" },
    { id: "Ca", name: "Calcium", unit: "%", min: "0.8", max: "1.2" },
    { id: "P", name: "Phosphorus", unit: "%", min: "0.4", max: "0.6" },
    { id: "EE", name: "Ether Extract", unit: "%", min: "3", max: "6" },
  ],

  BEEF_CATTLE: [
    { id: "CP", name: "Crude Protein", unit: "%", min: "12", max: "14" },
    { id: "ME", name: "Metabolizable Energy", unit: "kcal/kg", min: "2400", max: "2700" },
    { id: "NDF", name: "Neutral Detergent Fiber", unit: "%", min: "25", max: "40" },
    { id: "Ca", name: "Calcium", unit: "%", min: "0.5", max: "0.9" },
    { id: "P", name: "Phosphorus", unit: "%", min: "0.25", max: "0.5" },
    { id: "TDN", name: "Total Digestible Nutrients", unit: "%", min: "65", max: "75" },
    { id: "EE", name: "Ether Extract", unit: "%", min: "2", max: "5" },
  ],
};

// Popular ingredients surfaced first as smart suggestions in the Store modal
export const RECOMMENDED_STORE_NAMES = [
  "Barseem",
  "Maize",
  "Maize Silage",
  "Wheat Straw (toori)",
  "Maize grain",
  "Wheat grain",
  "Wheat Bran (Chokar)",
  "Cottonseed cake (Khal)",
  "Soybean meal",
  "Canola meal",
  "Cane Molasses",
];

const toSlug = (str) =>
  String(str || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

// Normalize assets/data/ingredients.json into the expert-ff feedstuff structure
export const STORE_INGREDIENTS = (StoreIngredientsRaw || []).map((item, idx) => {
  const { name, cost, min, max, ...nutrientFields } = item;
  const normalizedNutrients = {};

  Object.keys(nutrientFields).forEach((key) => {
    const val = nutrientFields[key];
    if (val !== undefined && val !== null && val !== "") {
      normalizedNutrients[key] = String(val);
    }
  });

  return {
    id: `store_${toSlug(name)}_${idx}`,
    name: String(name || `Ingredient ${idx + 1}`),
    nutrients: normalizedNutrients,
    cost: cost !== undefined && cost !== null ? String(cost) : "0",
    min: min !== undefined && min !== null ? String(min) : "0",
    max: max !== undefined && max !== null ? String(max) : "1",
    isCustom: false,
    isRecommended: RECOMMENDED_STORE_NAMES.includes(name),
  };
});