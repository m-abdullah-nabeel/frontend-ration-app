import rawIngredients from "../../assets/data/ingredients.json";

export const FEEDSTUFF_CATEGORIES = ["Suggested", "All", "Fodders", "Energy", "Protein"];

const FODDER_NAMES = new Set([
  "Barseem",
  "Maize",
  "Oat (Jai)",
  "Mustard (Sarson)",
  "Maize Silage",
  "Sugarcane",
  "Sugarcane tops",
  "Mott grass",
  "Johnson grass (Baru)",
  "Wheat Straw (toori)",
  "Rice Straw (Parali)",
  "Millet stovers",
  "Maize stovers",
  "Sorghum stovers",
  "Corn cobs",
  "Rice Husk (Phakk)",
  "Barseem Hay",
  "Lucerne Hay",
  "Cowpea Hay",
  "Millet Straw",
  "Cowpea Mature",
  "Fenugreek Early Vegetative",
  "Sorghum Silage",
  "Rhodes Grass",
  "Alfalfa (Lucerne)",
  "Napier grass",
  "Rye grass",
  "Millet",
  "Barley",
  "Sorghum",
  "Jantar",
  "Cow pea (Rawanhan)",
]);

const ENERGY_NAMES = new Set([
  "Maize grain",
  "Wheat grain",
  "Millet grain",
  "Mamni",
  "Maize bran",
  "Wheat Bran (Chokar)",
  "Rice polish",
  "Sugarbeet pulp",
  "Apple pomace",
  "Citrus waste",
  "Channa Karra",
  "Massar Karra",
  "Mung Karra",
  "Dry dates",
  "Potato",
  "Sorghum Grains",
  "Barley Grains",
  "Oats Grains",
  "Rice Grains",
  "Millet Grains",
  "Cane Molasses",
  "Sugarcane Bagasse",
  "Biscuit waste",
  "De-oiled rice polish",
  "Maize oil cake",
  "Re-rice polish",
  "Vermicelles",
  "Black pea seeds",
  "Black pea hulls",
  "Pea seeds",
  "Flaxseed cake",
  "Vegetable Oils",
  "Animal Fats",
]);

const PROTEIN_NAMES = new Set([
  "Cottonseed cake (Khal)",
  "Soybean meal",
  "Canola meal",
  "Rapeseed meal",
  "Maize gluten meal 30%",
  "Maize gluten meal 60%",
  "Palm kernel cake",
  "Sunflower meal",
  "Guar meal",
  "Linseed meal",
]);

export const SUGGESTED_FEEDSTUFF_NAMES = [
  "Barseem",
  "Alfalfa (Lucerne)",
  "Maize Silage",
  "Wheat Straw (toori)",
  "Maize grain",
  "Wheat Bran (Chokar)",
  "Rice polish",
  "Cottonseed cake (Khal)",
  "Soybean meal",
  "Canola meal",
  "Cane Molasses",
];

const STARTER_NAMES = [
  "Barseem",
  "Maize Silage",
  "Wheat Straw (toori)",
  "Maize grain",
  "Cottonseed cake (Khal)",
];

const getCategory = (name) => {
  if (FODDER_NAMES.has(name)) return "Fodders";
  if (ENERGY_NAMES.has(name)) return "Energy";
  if (PROTEIN_NAMES.has(name)) return "Protein";
  return "Other";
};

const cleanNumberString = (val, fallback = "") => {
  if (val === undefined || val === null || val === "") return fallback;
  const num = parseFloat(val);
  if (Number.isNaN(num)) return fallback;
  // Trim unnecessary trailing zeroes like 12.50 -> 12.5, 2300.00 -> 2300
  return String(Number(num.toFixed(4)));
};

// Store JSON uses 0-1 fractions (e.g., "0.00", "1.00"); UI uses 0-100%
const fractionToPercentString = (val, fallback = "0") => {
  if (val === undefined || val === null || val === "") return fallback;
  const num = parseFloat(val);
  if (Number.isNaN(num)) return fallback;
  const pct = num <= 1 ? num * 100 : num;
  return String(Number(pct.toFixed(2)));
};

const slugify = (text) =>
  String(text || "feed")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

export const STORE_FEEDSTUFFS = (Array.isArray(rawIngredients) ? rawIngredients : []).map(
  (item, index) => ({
    id: `store_${slugify(item.name)}_${index}`,
    storeName: item.name,
    name: item.name,
    category: getCategory(item.name),
    isSuggested: SUGGESTED_FEEDSTUFF_NAMES.includes(item.name),
    source: "store",
    cost: cleanNumberString(item.cost, "10"),
    minPct: fractionToPercentString(item.min, "0"),
    maxPct: fractionToPercentString(item.max, "100"),
    nutrients: {
      DM: cleanNumberString(item.DM, ""),
      CP: cleanNumberString(item.CP, ""),
      NDF: cleanNumberString(item.NDF, ""),
      ME: cleanNumberString(item.ME, ""),
    },
  })
);

export const getStarterFeedstuffs = () => {
  const starters = STARTER_NAMES.map((targetName) =>
    STORE_FEEDSTUFFS.find((item) => item.storeName === targetName)
  ).filter(Boolean);

  if (starters.length >= 2) {
    return starters;
  }
  return STORE_FEEDSTUFFS.slice(0, 4);
};