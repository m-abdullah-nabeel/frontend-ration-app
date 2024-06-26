import { useEffect, useState } from 'react';
import nutrientdata from '../../assets/data/feeds_nutrient.json';
import animalsReqdata from '../../assets/data/nutrients_required.json';

import RequirementsSheep from '../../assets/data/animal_requirements/sheepPrem.json';
import RequirementsGoat from '../../assets/data/animal_requirements/goatPrem.json';
import RequirementsCattle from '../../assets/data/animal_requirements/cattlePrem.json';
import RequirementsBuffalo from '../../assets/data/animal_requirements/buffaloPrem.json';

const RuminantFields = [
  // { name: "Name", data_field: "name", api_reference: "name" },
  { name: "Minimum Dry Matter Intake", data_field: "DMI", api_reference: "minDM" },
  { name: "Maximum Dry Matter Intake", data_field: "DMI", api_reference: "maxDM" },
  { name: "Minimum Crude Protein", data_field: "minCP", api_reference: "minCP" },
  { name: "Maximum Crude Protein", data_field: "maxCP", api_reference: "maxCP" },
  { name: "Minimum Metabolizable Energy", data_field: "minME", api_reference: "minME" },
  { name: "Maximum Metabolizable Energy", data_field: "maxME", api_reference: "maxME" },
  { name: "Minimum Neutral Detergent Fiber", data_field: "minNDF", api_reference: "minNDF" },
  { name: "Maximum Neutral Detergent Fiber", data_field: "maxNDF", api_reference: "maxNDF" },
];


const useAnimalReqFactor = (species) => {
  const [nutrientInput, SetNutrientInput] = useState([]);
  const [factors, setFactors] = useState()

  const [compo, setCompo] = useState([]);
  const [showReq, setShowReq] = useState([])
  
  const [largeRuminantBW] = useState([
    { label: '300', value: 300 },
    { label: '350', value: 350 },
    { label: '400', value: 400 },
    { label: '450', value: 450 },
    { label: '500', value: 500 },
    { label: '550', value: 550 },
    { label: '600', value: 600 },
    { label: '650', value: 650 },
    { label: '700', value: 700 },
  ]);

  const [largeRuminantMP] = useState([
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
    { label: '30', value: 30 },
    { label: '35', value: 35 },
    { label: '40', value: 40 },
  ]);

  const [smallRuminantBW] = useState([
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 },
    { label: '50', value: 50 },
    { label: '60', value: 60 },
    { label: '70', value: 70 },
    { label: '80', value: 80 },
    { label: '90', value: 90 },
    { label: '100', value: 100 },
  ]);

  const [smallRuminantMP] = useState([
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ]);

  useEffect(() => {
    if (species==="Cattle" || species==="Buffalo") {
      SetNutrientInput([
        { id: "bodyWeight", name: "Body Weight", data: largeRuminantBW, dataUnit: "Kilograms"},
        { id: "milkProduction", name: "Milk Production", data: largeRuminantMP, dataUnit: "Litres" },
      ])
      setFactors(RuminantFields)
    }
    if (species==="Goat" || species==="Sheep") {
      SetNutrientInput([
        { id: "bodyWeight", name: "Body Weight", data: smallRuminantBW, dataUnit: "Kilograms" },
        { id: "milkProduction", name: "Milk Production", data: smallRuminantMP, dataUnit: "Litres" },
      ])
      setFactors(RuminantFields)
    }
  }, [])

  // Requirements
  const getNutriReq = (species, factorData) => {
    let ReqObj;
    if (species == "Cattle") {
      ReqObj = RequirementsCattle
    }
    if (species == "Buffalo") {
      ReqObj = RequirementsBuffalo
    }
    if (species == "Sheep") {
      ReqObj = RequirementsSheep
    }
    if (species == "Goat") {
      ReqObj = RequirementsGoat
    }

    let bw = factorData['Body Weight']
    let mp = factorData['Milk Production']

    // alert("Data Recieved\n" + "Species: " + species + "\n" + "Details: " + JSON.stringify(factorData))

    let found = ReqObj.filter(item => item['BW'] == bw && item.Milk == mp)[0]
    console.log(found)
    // alert(JSON.stringify(found))
    setShowReq(found)

    // let dmi = found['dmi']
    // let cp_T = found['cp_req']
    // let me_T = found['me_req']
    // setShowReq([Number(cp_T), Number(me_T), 28])
    // let me = (Number(me_T) / Number(dmi)).toFixed(2)
    // let cp = (Number(cp_T) / (Number(dmi) * 1000) * 100).toFixed(2)
    // setShowReq([Number(cp), Number(me), 28])
    return found
  }

  return {
    nutrientInput,
    factors,
    getNutriReq
  };
};

export default useAnimalReqFactor;
