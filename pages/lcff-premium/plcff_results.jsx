import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, Linking, Image, ScrollView, Pressable, ActivityIndicator, Dimensions } from "react-native"
import { ButtonPaper, DataTable } from 'react-native-paper';
import nutrientdata from '../../assets/data/feeds_nutrient.json';
import animalsReqdata from '../../assets/data/nutrients_required.json';
import SponsorsDisplay from "../components/sponsors_display";
import { setNutrientRequirements, selectFeedFormulationData } from "../../redux/animalInputSlice";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";

const windowHeight = Dimensions.get('window').height;

function DetailsScreen() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false)
  const [feasible, setFeasible] = useState(false)
  const selectedFeedData = useSelector(selectFeedFormulationData)
  const { t } = useTranslation();

  const url_backend_render = 'https://uva-gro-backend-api.onrender.com/api/premium/formulate'
  console.log("Selected Feed Data: ")
  console.log(selectedFeedData)
  const ingredients = selectedFeedData.ingredients
  const nutrientRequirements = selectedFeedData.nutrientRequirements

  const getCalculations = async (reqUrl) => {
    console.log(`Requesting ${reqUrl}`)
    try {
      if (ingredients.length > 0 && Object.keys(nutrientRequirements).length > 0) {
        setLoading(true)
        let reqData = {
          "ingredients": ingredients,
          "nutrientRequirements": nutrientRequirements
        }
        console.log("reqData")
        console.log(reqData)

        const response = await fetch(reqUrl, {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // "Content-type": "application/json; charset=UTF-8",
          'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
          },
          body: JSON.stringify(reqData),
      });

        const json = await response.json();
        setData(json);
        if (data.success == true && data.results.length!==0) {
          setFeasible(true)
        }
        console.log(json);
        setLoading(false);
      } else {
        console.log("Invalid Data")
      }
    } catch (error) {
      console.error("Errors Details: ", error);
    } finally {
      setLoading(false);
    }
    console.log("Concluding Calculations")
  }

  useEffect(() => {
    getCalculations(url_backend_render)
  }, []);

  const Loading = () => (
    <View style={{height: windowHeight * 0.8, flex: 1, alignItems: 'center', justifyContent: "center", }}>
      <ActivityIndicator animating size={100} color="green" />
    </View>
  )

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* <View style={{ flex: 1 }}>
        {isLoading?<Loading />:(
          feasible?<Text>Feasible</Text>:<Text>Not Feasible</Text>
        )}
      </View> */}
      <View style={{ margin: 1 }}>
        {isLoading ?<Loading/>:
          <View style={{marginTop: 10}}>
            <Text style={{fontWeight: "bold", padding: 15}}>Results</Text>

            <ScrollView horizontal>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title style={{ width: 200 }}>Ingredients</DataTable.Title>
                  <DataTable.Title style={{ width: 150 }}>Dry Matter Basis</DataTable.Title>
                  <DataTable.Title style={{ width: 150 }}>As Fed Basis</DataTable.Title>
                  <DataTable.Title style={{ width: 100 }}>CP</DataTable.Title>
                  <DataTable.Title style={{ width: 150 }}>ME</DataTable.Title>
                  <DataTable.Title style={{ width: 100 }}>NDF</DataTable.Title>
                </DataTable.Header>

                {data.success == true && 
                data.results && data.results.length!==0 && 
                data.formula && data.formula.length!==0 ?
                data.formula.map((key) => {
                  const val = key.value
                  const dmval = (key.value * 100).toFixed(2)
                  // const dmi = data.nutrientRequirements.minDM
                  const dmi = nutrientRequirements.minDM
                  const asfed = ((dmi * key.value)/(key.DM /100)).toFixed(2)
                  const cp = ((asfed*key.DM/100)*(key.CP/100)).toFixed(2)
                  const me = ((asfed*key.DM/100)*(key.ME)).toFixed(2)
                  const ndf = ((asfed*key.DM/100)*(key.NDF/100)).toFixed(2)
                  return (
                    <DataTable.Row key={key.name}>
                      <DataTable.Cell style={{ width: 200 }}>{key.name}</DataTable.Cell>
                      <DataTable.Cell style={{ width: 150 }}>{dmval} %</DataTable.Cell>
                      <DataTable.Cell style={{ width: 150 }}>{asfed} Kg</DataTable.Cell>
                      <DataTable.Cell style={{ width: 100 }}>{cp} Kg</DataTable.Cell>
                      <DataTable.Cell style={{ width: 150 }}>{me} Mcal</DataTable.Cell>
                      <DataTable.Cell style={{ width: 100 }}>{ndf} Kg</DataTable.Cell>
                    </DataTable.Row>
                  )
                }) : <Text>No combination found with given constraints</Text>}     

              </DataTable>
            </ScrollView>

            <SponsorsDisplay />
          </View>
        }
      </View>
    </ScrollView>
  );
}

export default DetailsScreen;
