import { useEffect, useState } from 'react';
import nutrientdata from '../../assets/data/feeds_nutrient.json';
import Compositions from '../../assets/data/ingredients.json';

const useIngredientSelector = (species) => {
  const [ingredients, setIngredients] = useState([]);
  const [factors, setFactors] = useState()

  const [compo, setCompo] = useState([]);
  
  // const RuminnatsIngredients = [
  //   {
  //     title: "Fodders",
  //     min_selection: 2,
  //     cat_msg: "Select at least 2",
  //     data: [
  //       "Barseem",
  //       "Maize",
  //       "Oat (Jai)",
  //       "Mustard (Sarson)",
  //       "Maize Silage",
  //       "Sugarcane",
  //       "Sugarcane tops",
  //       "Mott grass",
  //       "Johnson grass (Baru)",
  //       "Wheat Straw (toori)",
  //       "Rice Straw (Parali)",
  //       "Millet stovers",
  //       "Maize stovers",
  //       "Sorghum stovers",
  //       "Corn cobs",
  //       "Rice Husk (Phakk)",
  //       "Barseem Hay",
  //       "Lucerne Hay",
  //       "Cowpea Hay",
  //       "Millet Straw",
  //       "Cowpea Mature",
  //       "Fenugreek Early Vegetative",
  //       "Sorghum Silage",
  //       "Rhodes Grass",
  //       "Alfalfa (Lucerne)",
  //       "Napier grass",
  //       "Rye grass",
  //       "Millet",
  //       "Barley",
  //       "Sorghum",
  //       "Jantar",
  //       "Cow pea (Rawanhan)"
  //     ]
  //   },
  //   {
  //     title: "Energy Supplements",
  //     min_selection: 1,
  //     cat_msg: "Select at least 1",
  //     data: [
  //       "Maize grain",
  //       "Wheat grain",
  //       "Millet grain",
  //       "Mamni",
  //       "Maize bran",
  //       "Wheat Bran (Chokar)",
  //       "Rice polish",
  //       "Sugarbeet pulp",
  //       "Apple pomace",
  //       "Citrus waste",
  //       "Channa Karra",
  //       "Massar Karra",
  //       "Mung Karra",
  //       "Dry dates",
  //       "Potato",
  //       "Sorghum Grains",
  //       "Barley Grains",
  //       "Oats Grains",
  //       "Rice Grains",
  //       "Millet Grains",
  //       "Cane Molasses",
  //       "Sugarcane Bagasse",
  //       "Biscuit waste",
  //       "De-oiled rice polish",
  //       "Maize oil cake",
  //       "Re-rice polish",
  //       "Vermicelles",
  //       "Black pea seeds",
  //       "Black pea hulls",
  //       "Pea seeds",
  //       "Flaxseed cake",
  //       "Vegetable Oils",
  //       "Animal Fats"  
  //     ]
  //   },
  //   {
  //     title: "Protein Supplements",
  //     min_selection: 1,
  //     cat_msg: "Select at least 1",
  //     data: [
  //       "Cottonseed cake (Khal)",
  //       "Soybean meal",
  //       "Canola meal",
  //       "Rapeseed meal",
  //       "Maize gluten meal 30%",
  //       "Maize gluten meal 60%",
  //       "Palm kernel cake",
  //       "Sunflower meal",
  //       "Guar meal",
  //       "Linseed meal"
  //     ]
  //   },
  // ];
  
  const RuminnatsIngredients = [
    {
      title: "Ingredients",
      min_selection: 0,
      cat_msg: "Select at least 2",
      data: [
        "Barseem",
        "Maize",
        "Oat (Jai)",
        "Mustard (Sarson)",
        "Maize Silage",
        "Sugarcane",
        "Sugarcane tops",
        "Mott grass",
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
        "Cottonseed cake (Khal)",
        "Soybean meal",
        "Canola meal",
        "Rapeseed meal",
        "Maize gluten meal 30%",
        "Maize gluten meal 60%",
        "Palm kernel cake",
        "Sunflower meal",
        "Guar meal",
        "Linseed meal"
      ]
    },
  ];


  const RuminantFields = [
    // { name: "Name", data_field: "name", api_reference: "name" },
    { name: "Dry Matter (%)", data_field: "DM", api_reference: "DM" },
    { name: "Crude Protein", data_field: "CP", api_reference: "CP" },
    { name: "Neutral Detergent Fiber", data_field: "NDF", api_reference: "NDF" },
    { name: "Metabolizable Energy", data_field: "ME", api_reference: "ME" },
    { name: "Cost", data_field: "cost", api_reference: "cost" },
    { name: "Minimum", data_field: "min", api_reference: "min" },
    { name: "Maximum", data_field: "max", api_reference: "max" },
];

  useEffect(() => {
    if (
      species==="Cattle" || species==="Buffalo" ||
      species==="Goat" || species==="Sheep"
    ) {
      setIngredients(RuminnatsIngredients)
      setFactors(RuminantFields)
    }
  }, [])

  // Requirements
  const getCompositions = (namesList, NutrientObject) => {
    let newlist = [];
    namesList.map(
      (a) => {
        NutrientObject.find(x => x.name == a) !== undefined ?
          newlist.push(NutrientObject.find(x => x.name == a)) :
          null
      }
    )
    setCompo(newlist)
  }

  const updateCompositiononAdd = (ingredient) => {
    const foundNutrient = Compositions.find((x) => x.name === ingredient);
    // if (foundNutrient) {
    //   // Do something with the found nutrient object
    //   console.log('Found Ingredient:', foundNutrient);
    // } else {
    //   console.log('Ingredient not found');
    // }
    return foundNutrient
  }

  function extractValues(jsonData, fields) {
    return jsonData.map(item => {
        const extractedItem = {};
        fields.forEach(key => {
            extractedItem[key] = item[key];
        });
        return extractedItem;
    });
  }

  return {
    ingredients,
    factors,
    extractValues,
    getCompositions,
    updateCompositiononAdd
  };
};

export default useIngredientSelector;
