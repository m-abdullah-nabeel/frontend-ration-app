import { useEffect, useState } from 'react';
import nutrientdata from '../../assets/data/feeds_nutrient.json';
import animalsReqdata from '../../assets/data/nutrients_required.json';

import RequirementsSheep from '../../assets/data/animal_requirements/sheep.json';
import RequirementsGoat from '../../assets/data/animal_requirements/goat.json';
import RequirementsCattle from '../../assets/data/animal_requirements/cattle.json';
import RequirementsBuffalo from '../../assets/data/animal_requirements/buffalo.json';

const useIngredientSelector = (species) => {
  const [ingredients, setIngredients] = useState([]);
  const [factors, setFactors] = useState()

  const [compo, setCompo] = useState([]);
  
  const RuminnatsIngredients = [
    {
      title: "Fodders",
      min_selection: 2,
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
        "Cow pea (Rawanhan)"
      ]
    },
    {
      title: "Energy Supplements",
      min_selection: 1,
      cat_msg: "Select at least 1",
      data: [
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
        "Sugarcane Bagasse"
  
      ]
    },
    {
      title: "Protein Supplements",
      min_selection: 1,
      cat_msg: "Select at least 1",
      data: [
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
  
  useEffect(() => {
    if (species==="Cattle" || species==="Buffalo") {
      setIngredients(RuminnatsIngredients)
    //   setFactors()
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
    const foundNutrient = nutrientdata.find((x) => x.name === ingredient);
    // if (foundNutrient) {
    //   // Do something with the found nutrient object
    //   console.log('Found Ingredient:', foundNutrient);
    // } else {
    //   console.log('Ingredient not found');
    // }
    return foundNutrient
  }

  return {
    ingredients,
    factors,
    getCompositions,
    updateCompositiononAdd
  };
};

export default useIngredientSelector;
