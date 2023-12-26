import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, Linking, Image, ScrollView, Pressable, ActivityIndicator, Dimensions } from "react-native"
import { Button as ButtonPaper, DataTable } from 'react-native-paper';
import nutrientdata from '../../assets/data/feeds_nutrient.json';
import animalsReqdata from '../../assets/data/nutrients_required.json';
import SponsorsDisplay from "../components/sponsors_display";
import { setNutrientRequirements, selectFeedFormulationData } from "../../redux/animalInputSlice";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';

import BlockAd from "../ads/block_ad";
import AdsData from "../ads/ads.json";

const windowHeight = Dimensions.get('window').height;

function DetailsScreen() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [feasible, setFeasible] = useState(false)
  const selectedFeedData = useSelector(selectFeedFormulationData)
  const { t } = useTranslation();
  const navigation = useNavigation();
  const adData1 = AdsData[0]
  const adData2 = AdsData[1]

  const url_backend_render = 'https://uva-gro-backend-api.onrender.com/api/premium/formulate'
  console.log("Selected Feed Data: ")
  console.log(selectedFeedData)
  const ingredients = selectedFeedData.ingredients
  const nutrientRequirements = selectedFeedData.nutrientRequirements

  const getCalculations = async (reqUrl) => {
    console.log(`Requesting ${reqUrl}`)
    try {
      if (
        ingredients.length > 0 && 
        Object.keys(nutrientRequirements).length > 0
      ) {
        setLoading(true)

        let reqData = {"ingredients": ingredients,"nutrientRequirements": nutrientRequirements}
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
        
        console.log(json);
        // alert("CURRENT DATA IS: ")
        // alert(JSON.stringify(json))
      } else {
        console.log("Invalid Data")
        setError(true)
        setErrMsg("Invalid Data (Missing necessary inputs to proceed).")
      }
    } catch (error) {
      console.error("Errors Details: ", error);
      setError(true)
      setErrMsg("Probable Internet Issue.")
    } finally {
      setLoading(false);
    }
    console.log("Concluding Calculations")
  }

  useEffect(() => {
    const setFeasibility = () => {
      if (
        data && data.length !==0 &&
        data.success === true &&
        data.results && data.results.length!==0 && 
        data.formula && data.formula.length!==0
      ) {
        setFeasible(true);
        setLoading(false);
      } else if (
        data.success === false
      ) {
        setFeasible(false)
      }
    }
    setFeasibility()
  }, [data])

  useEffect(() => {
    getCalculations(url_backend_render)
  }, []);

  const Loading = () => (
    <View style={{height: windowHeight * 0.8, flex: 1, alignItems: 'center', justifyContent: "center", }}>
      <ActivityIndicator animating size={100} color="green" />
    </View>
  )

  const DisplayResults = () => {
    return (
      <View style={{ marginVertical: 10}}>
        <BlockAd adData={adData1}/>
        <DryMatterFormula/>
        <AsFedFormula/>
        <NutrientProfile />

      </View>
    )
  }

  const DryMatterFormula = () => {
    return (
      <View>
        <View style={{
          backgroundColor: "rgba(153, 150, 10, 1)",
          borderRadius: 10, padding: 10, margin: 5, alignSelf: "center", width: "100%",
        }}>
          <Text style={{
            fontSize: 18, fontWeight: 'bold', color: "rgb(250, 250, 250)", alignSelf: "center",
          }}>
            Least Cost Feed Formulation
          </Text>
        </View>

        <View style={{
          backgroundColor: "rgba(153, 150, 10, 1)",
          borderRadius: 10, padding: 10, margin: 5, alignSelf: "center", width: "100%",
        }}>
          <Text style={{
            fontSize: 18, fontWeight: 'bold', color: "rgb(250, 250, 250)", alignSelf: "center",
          }}>
            {t("Dry Matter Formula")}
            {/* Least Cost Feed Formulation */}
          </Text>
        </View>

        <DataTable style={{ padding: 10, borderColor: 'green', borderWidth: 2, borderRadius: 10 }}>
          <DataTable.Header>
            <DataTable.Title style={{ fontWeight: "bold", color: "white" }}>Ingredients</DataTable.Title>
            <DataTable.Title numeric style={{ fontWeight: "bold", color: "white" }}>Dry Matter Basis</DataTable.Title>
          </DataTable.Header>

          {data.success == true && 
          data.results && data.results.length!==0 && 
          data.formula && data.formula.length!==0 ?
          data.formula.map((key) => {
            const dmval = (key.value * 100).toFixed(2)
            return (
              <DataTable.Row key={key.name}>
                <DataTable.Cell style={{ fontWeight: "bold", color: "white" }}>{t(key.name)}</DataTable.Cell>
                <DataTable.Cell numeric style={{ fontWeight: "bold", color: "white" }}>{dmval} %</DataTable.Cell>
              </DataTable.Row>
            )
          }) : <Text>No combination found with given constraints</Text>}     

        </DataTable>

      </View>
    )
  }

  const AsFedFormula = () => {
    return (
      <View>
        <View style={{
          backgroundColor: "rgba(153, 150, 10, 1)",
          borderRadius: 10, padding: 10, margin: 5, alignSelf: "center", width: "100%",
        }}>
          <Text style={{
            fontSize: 18, fontWeight: 'bold', color: "rgb(250, 250, 250)", alignSelf: "center",
          }}>
            {t("As Fed Basis")}
          </Text>
        </View>

        <DataTable style={{ padding: 10, borderColor: 'green', borderWidth: 2, borderRadius: 10 }}>
          <DataTable.Header>
            <DataTable.Title style={{ fontWeight: "bold", color: "white" }}>Ingredients</DataTable.Title>
            <DataTable.Title numeric style={{ fontWeight: "bold", color: "white" }}>As Fed Basis</DataTable.Title>
          </DataTable.Header>

          {data.success == true && 
          data.results && data.results.length!==0 && 
          data.formula && data.formula.length!==0 ?
          data.formula.map((key) => {
            const val = key.value
            const dmval = (key.value * 100).toFixed(2)
            const dmi = nutrientRequirements.minDM
            const asfed = ((dmi * key.value)/(key.DM /100)).toFixed(2)
            return (
              <DataTable.Row key={key.name}>
                <DataTable.Cell style={{ fontWeight: "bold", color: "white" }}>{t(key.name)}</DataTable.Cell>
                <DataTable.Cell numeric style={{ fontWeight: "bold", color: "white" }}>{asfed} Kg</DataTable.Cell>
              </DataTable.Row>
            )
          }) : <Text>No combination found with given constraints</Text>}     

        </DataTable>
      </View>
    )
  }

  const NutrientProfile = () => {
    const [onDm, setOnDm] = useState(0);
    const [asfed, setAsFed] = useState(0)
    const [costCum, setCostCum] = useState(0)
    const [cp, setCp] = useState(0);
    const [me, setMe] = useState(0);
    const [ndf, setNdf] = useState(0)

    useEffect(() => {
      const arr = data.formula.map((key) => {
        const dmi = nutrientRequirements.minDM;
        const asfed = ((dmi * key.value) / (key.DM / 100)).toFixed(2);
  
        const newCp = ((asfed * key.DM / 100) * (key.CP / 100)).toFixed(2);
        const newMe = ((asfed * key.DM / 100) * key.ME).toFixed(2);
        const newNdf = ((asfed * key.DM / 100) * (key.NDF / 100)).toFixed(2);
    
        const providesDm = (asfed * key.DM / 100).toFixed(2);
        const costCont = (asfed * key.cost).toFixed(2);

        return {
          newCp,
          newMe,
          newNdf,  
          providesDm,
          costCont
        };
      });
    
      setCp(arr.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.newCp), 0));
      setMe(arr.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.newMe), 0));
      setNdf(arr.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.newNdf), 0));
      setOnDm(arr.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.providesDm), 0));
      setCostCum(arr.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.costCont), 0));
  
    }, [data])

    return (
      <View>
        <View style={{
          elevation: 5, borderWidth: 1, borderColor: "black",
          padding: 10, marginVertical: 10
        }}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Profile of formulated diet</Text>
          <Text style={{ fontSize: 14, }}>CP: {(cp*100/onDm).toFixed(2)} %</Text>
          <Text style={{ fontSize: 14, }}>ME: {(me/onDm).toFixed(2)} Mcal/kg DM</Text>
          <Text style={{ fontSize: 14, }}>NDF: {(ndf*100/onDm).toFixed(2)} %</Text>
          <Text style={{ fontSize: 14, }}>DM: {(onDm).toFixed(2)} Kg / animal</Text>
          <Text style={{ fontSize: 14, }}>Price: {(costCum).toFixed(2)} PKR</Text>
        </View>

        <View style={{
          backgroundColor: "rgba(153, 150, 10, 1)",
          borderRadius: 10, padding: 10, margin: 5, alignSelf: "center", width: "100%",
        }}>
          <Text style={{
            fontSize: 18, fontWeight: 'bold', color: "rgb(250, 250, 250)", alignSelf: "center",
          }}>
            Nutrient Details 
          </Text>
        </View>

        <ScrollView horizontal style={{ padding: 10, borderColor: 'green', borderWidth: 2, borderRadius: 10 }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ width: 200 }}>Ingredients</DataTable.Title>
              <DataTable.Title style={{ width: 150 }}>Dry Matter Basis</DataTable.Title>
              <DataTable.Title style={{ width: 150 }}>As Fed Basis</DataTable.Title>
              <DataTable.Title style={{ width: 100 }}>CP</DataTable.Title>
              <DataTable.Title style={{ width: 150 }}>ME</DataTable.Title>
              <DataTable.Title style={{ width: 100 }}>NDF</DataTable.Title>
              <DataTable.Title style={{ width: 100 }}>DM Provided</DataTable.Title>
              <DataTable.Title style={{ width: 200 }}>Cost Contribution</DataTable.Title>
            </DataTable.Header>

            {data.success == true && 
              data.results && 
              data.results.length!==0 && 
              data.formula && 
              data.formula.length!==0 ?
              data.formula.map((key) => {
                const val = key.value
                const dmval = (key.value * 100).toFixed(2)
                const dmi = nutrientRequirements.minDM
                const asfed = ((dmi * key.value) / (key.DM / 100)).toFixed(2)

                const newCp = ((asfed * key.DM / 100) * (key.CP / 100)).toFixed(2);
                const newMe = ((asfed * key.DM / 100) * key.ME).toFixed(2);
                const newNdf = ((asfed * key.DM / 100) * (key.NDF / 100)).toFixed(2);

                const providesDm = (asfed * key.DM / 100).toFixed(2);
                const costCont = (asfed * key.cost).toFixed(2);
    
                return (
                  <DataTable.Row key={key.name}>
                    <DataTable.Cell style={{ width: 200 }}>{t(key.name)}</DataTable.Cell>
                    <DataTable.Cell style={{ width: 150 }}>{dmval} %</DataTable.Cell>
                    <DataTable.Cell style={{ width: 150 }}>{asfed} Kg</DataTable.Cell>
                    <DataTable.Cell style={{ width: 100 }}>{newCp} Kg</DataTable.Cell>
                    <DataTable.Cell style={{ width: 150 }}>{newMe} Mcal</DataTable.Cell>
                    <DataTable.Cell style={{ width: 100 }}>{newNdf} Kg</DataTable.Cell>
                    <DataTable.Cell style={{ width: 100 }}>{providesDm} Kg</DataTable.Cell>
                    <DataTable.Cell style={{ width: 200 }}>{costCont} PKR</DataTable.Cell>
                  </DataTable.Row>
                )
              }) : <Text>No combination found with given constraints</Text>}     

              <DataTable.Row>
                <DataTable.Title style={{ width: 200 }}>Sum</DataTable.Title>
                <DataTable.Title style={{ width: 150 }}>--</DataTable.Title>
                <DataTable.Title style={{ width: 150 }}>--</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>CP: {cp.toFixed(2)}</DataTable.Title>
                <DataTable.Title style={{ width: 150 }}>ME: {me.toFixed(2)}</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>NDF: {ndf.toFixed(2)}</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>DM Total: {onDm.toFixed(2)}</DataTable.Title>
                <DataTable.Title style={{ width: 200 }}>Feed Cost/animal: {costCum.toFixed(2)}</DataTable.Title>
              </DataTable.Row>

          </DataTable>

        </ScrollView>
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1 }}>

      <View style={{  }}>
        {isLoading && <Loading/>}

        {!isLoading &&
          <View style={{ }}>

            {feasible === true && <DisplayResults/>}

            {feasible === false && <Text>No Combination Found. {JSON.stringify(data?.msg)}</Text>}
            {error === true && <Text>Some Error Occured.</Text>}
            {errMsg !== '' && <Text>Error: {errMsg}</Text>}

            <Text style={{alignSelf: "center"}}>Further rectify this formula by changing inclusion levels</Text>
            <ButtonPaper buttonColor="rgba(10, 100, 10, 0.8)" mode="contained" onPress={() => navigation.goBack()}>
              Re-formulate? 
            </ButtonPaper>

            <ButtonPaper disabled buttonColor="rgba(10, 100, 10, 0.8)" mode="contained" style={{marginTop: 10}}>
              Save this formula (Coming Soon)
            </ButtonPaper>
          </View>
        }
      </View>
      
      <BlockAd adData={adData2}/>

      <View style={{ marginVertical: 10 }}>
        <SponsorsDisplay />
      </View>
            
    </ScrollView>
  );
}

export default DetailsScreen;
