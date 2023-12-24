import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, TouchableOpacity, Linking, Image, ScrollView, Pressable } from "react-native"
import nutrientdata from '../../assets/data/feeds_nutrient.json';
import animalsReqdata from '../../assets/data/nutrients_required.json';
import { ActivityIndicator, Dimensions } from 'react-native';

import SponsorsDisplay from "../components/sponsors_display";

import { ButtonPaper } from 'react-native-paper';

import RequirementsSheep from '../../assets/data/animal_requirements/sheep.json';
import RequirementsGoat from '../../assets/data/animal_requirements/goat.json';
import RequirementsCattle from '../../assets/data/animal_requirements/cattle.json';
import RequirementsBuffalo from '../../assets/data/animal_requirements/buffalo.json';

// testing language
import { useTranslation } from 'react-i18next';

const windowHeight = Dimensions.get('window').height;


const ResultCheck = (props) => {
  const { t } = useTranslation();

  const res = props.result
  const compo = props.compo
  const navigation = props.navigation
  const bwt = props.bwt
  const dmi_req = props.calDMI
  // const dmi_req = (bwt * 2 / 100).toFixed(2)
  let dm_a = []
  let cp_a = []
  let me_a = []
  let ndf_a = []

  let status_ = {
    0: 'Optimization terminated successfully',
    1: 'Iteration limit reached',
    2: 'The selected combination does not provide enough nutrients', //Problem appears to be infeasible
    3: 'Problem appears to be unbounded',
    4: 'Numerical difficulties encountered',
  }

  if (res['available']) {
    // correct results
    if (res['status'] == 0) {
      return (
        <View>
          {/* red block */}
          <View style={{
            backgroundColor: "rgba(153, 150, 10, 1)",
            borderRadius: 10, padding: 10, margin: 5, alignSelf: "center", width: "100%",
          }}>
            <Text style={{
              fontSize: 18, fontWeight: 'bold', color: "rgb(250, 250, 250)", alignSelf: "center",
            }}>
              Least Cost Feed Formulation
            </Text>
            <Text style={{ color: "rgb(250, 250, 250)", fontSize: 12, alignSelf: "center" }}>
              {compo.length} {t("feedstuffs")}
            </Text>
          </View>

          {/* green block */}
          <View style={{ backgroundColor: "rgba(10, 120, 10, 0.9)", borderRadius: 10, padding: 10, margin: 5, alignSelf: "center", width: "100%" }}>
            <Text style={{ fontSize: 24, color: "#fff", fontWeight: 'bold', alignSelf: "center", padding: 10 }}>
              {t("feed composition line")}
            </Text>
          </View>

          {/* dry matter formula block */}
          <View style={{ backgroundColor: "orange", opacity: 0.7, padding: 10, borderColor: 'green', borderWidth: 3, borderRadius: 10 }}>
            {/* intro line */}
            <Text style={{ fontWeight: 'bold', fontSize: 22, borderBottomColor: 'black', borderBottomWidth: 4 }}>
              {t("Dry Matter Formula")}
            </Text>

            {
              Object.keys(res['results']).map((k, y) => {
                curr_ = nutrientdata.find(x => x.name == k)
                percent_val = Math.round(res['results'][k] * 100)

                {/* Adding Dry Matter */ }
                let dm_feedStuff = Number(((dmi_req * percent_val / 100)).toFixed(2))
                dm_a.push(dm_feedStuff)
                {/* Adding CP */ }
                let cp_feedStuff = Number(((dmi_req * percent_val / 100) * (curr_['CP'] / 100)).toFixed(2))
                cp_a.push(cp_feedStuff)
                {/* Adding ME */ }
                let me_feedStuff = Number(((dmi_req * percent_val / 100) * (curr_['ME'])).toFixed(2))
                me_a.push(me_feedStuff)
                {/* Adding NDF */ }
                let ndf_feedStuff = Number(((dmi_req * percent_val / 100) * (curr_['NDF'] / 100)).toFixed(2))
                ndf_a.push(ndf_feedStuff)

                return (
                  <View key={k} >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'rgb(120, 30, 0)', borderBottomWidth: 1 }}>
                      <View style={{ height: 35 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', width: 200 }}>
                          {t(k)}
                        </Text>
                      </View>

                      <View style={{ height: 35 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{percent_val} %</Text>
                      </View>
                    </View>
                  </View>
                )
              })
            }
          </View>

          {/* As fed basis for one animal */}

          <View style={{
            backgroundColor: "pink",
            padding: 10, borderColor: 'green', borderWidth: 3, borderRadius: 10, marginTop: 15
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, borderBottomColor: 'black', borderBottomWidth: 4 }}>
              {t("As Fed Basis")}
            </Text>
            {
              Object.keys(res['results']).map(k => {
                curr_ = nutrientdata.find(x => x.name == k)
                percent_val = Math.round(res['results'][k] * 100)

                return (
                  <View key={k} >
                    <View style={{
                      flex: 1, flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomColor: 'rgb(120, 30, 0)', borderBottomWidth: 1
                    }}>
                      <View style={{ height: 25 }}>
                        <Text style={{
                          fontSize: 18, fontWeight: 'bold', width: 180
                        }}>
                          {t(k)}
                        </Text>
                      </View>

                      <View style={{ height: 25 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                          {
                            (((percent_val / 100) * dmi_req) / (curr_['DM%'] / 100)).toFixed(2)
                          } Kg
                        </Text>
                      </View>

                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
      )
    }
    // if the correct least cost result is not available
    return (
      <>
      <View style={{height: windowHeight * 0.75, flex: 1, alignItems: 'center', justifyContent: "center", }}>
        <Image
          style={{ width: 100, height: 100, }}
          source={require('../../assets/images/warn.gif')}
        />

        <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 20, color: 'rgba(200, 50, 50, 1)' }}>{(t("retry combination")).toUpperCase()}</Text>
      </View>
      </>
    )
  }
  // unexpected errors like no connectivity or damaged app
  else {
    return (
      <>
      <View style={{height: windowHeight * 0.75, flex: 1, alignItems: 'center', justifyContent: "center", }}>
        <Image
          style={{ width: 100, height: 100, }}
          source={require('../../assets/images/important.gif')}
        />
        <Text style={{ fontSize: 12, fontWeight: '500' }}>An unexpected error happened!</Text>
        <Text >{res['error'] && JSON.stringify(res['error'])}</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 20, color: 'rgba(200, 50, 50, 1)' }}>{(t("retry combination")).toUpperCase()}</Text>
      </View>
      </>

    )
  }
}

function DetailsScreen({ navigation, route }) {
  const { stock, req_data } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [nutReq, setNutReq] = useState([])
  const [nutReqShow, setNutReqShow] = useState([])
  const [compo, setCompo] = useState([]);
  const [bwt, setbwt] = useState(0)
  const [calDMI, setCalDMI] = useState(0)

  const [showReq, setShowReq] = useState([])

  const url_backend_render = 'https://uva-gro-backend-api.onrender.com/formulate/'
  // const url_backend_cloud_run = 'https://uva-gro-backend-nmoxvxzfrq-el.a.run.app/formulate/'
  // const url_backend_localhost = 'http://127.0.0.1:8000/formulate/'

  const { t } = useTranslation();

  const getCalculations = async (reqUrl) => {
    console.log("Running Calculations")
    try {
      if (compo.length > 0 && nutReq.length > 0) {
        setLoading(true)
        let reqData = {
          "feeds": compo,
          "nut_req": nutReq
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
          // body: reqData,
          body: JSON.stringify(reqData),
      });

        const json = await response.json();
        setData(json);
        console.log("Here is the JSON response: ");
        console.log(json);
        console.log("JSON response ends!");
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

  const getNutriReq = (animalData) => {
    // console.log("=============================== Animal Data ==================================")
    // console.log(animalData)
    // console.log(animalData['species'])

    let ReqObj;
    if (animalData['species'] == "Cattle") {
      ReqObj = RequirementsCattle
    }
    if (animalData['species'] == "Buffalo") {
      ReqObj = RequirementsBuffalo
    }
    if (animalData['species'] == "Sheep") {
      ReqObj = RequirementsSheep
    }
    if (animalData['species'] == "Goat") {
      ReqObj = RequirementsGoat
    }
    let bw = animalData['Body Weight']
    setbwt(bw)
    let mp = animalData['Milk Production']
    // check species and then make a condition for each species 
    let sp = animalData['species']

    let found = ReqObj.filter(item => item.bodyweight == bw && item.milk == mp)[0]
    console.log(found)
    setShowReq(found)
    let dmi = found['dmi']
    let cp_T = found['cp_req']
    let me_T = found['me_req']

    setCalDMI(dmi)
    // change following conversions
    let me = (Number(me_T) / Number(dmi)).toFixed(2)
    console.log('cp')
    console.log(cp)
    // newlist.push(cp)
    let cp = (Number(cp_T) / (Number(dmi) * 1000) * 100).toFixed(2)
    console.log('me')
    console.log(me)
    // console.log(found[])
    // console.log("Nutrients Data")
    // console.log(found)
    // console.log("found")
    setNutReq([Number(cp), Number(me), 28])
    // to these conversions
    // let me = (Number(me_T) / Number(dmi)).toFixed(2)
    // console.log('cp')
    // console.log(cp)
    // newlist.push(cp)
    // let cp = (Number(cp_T) / (Number(dmi) * 1000) * 100).toFixed(2)
    // console.log('me')
    // console.log(me)
    // Changing this on March 30
    setNutReqShow([Number(cp_T), Number(me_T), 28])

  }

  useEffect(() => {
    console.log("------------------------------------------Change Detected-----------------------------------------------------")
    console.log(nutReqShow)
    getCalculations(url_backend_render)

  }, [compo, nutReq]);

  useEffect(() => {
    getNutriReq(req_data)
  }, [])

  useEffect(() => {
    getCompositions(stock, nutrientdata);
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
          <View style={{backgroundColor: "#d3d3d3"}}>
            <Text style={{alignSelf: "center"}}>Inputs</Text>
            <View style={{backgroundColor: "orange"}}>
              <Text>
                Nutrient Requirements (Reading Data from the file)
                {JSON.stringify(showReq)} {"\n"}
              </Text>
              <Text>
                Nutrient Requirements (CP, ME, NDF)
                {JSON.stringify(nutReq)}
              </Text>
              <Text>
                Nutrient Requirements (CP, ME, NDF)
                {JSON.stringify(nutReqShow)}
              </Text>
              <Text>
                {"\n"}
              </Text>      
            </View>
            <View style={{backgroundColor: "pink"}}>
              <Text>Feeds</Text>
              {compo.map((i)=>{
                return<Text>{JSON.stringify(i.name)}: {JSON.stringify(i)} {"\n"} </Text>
              })}
            </View>
            <View style={{backgroundColor: "#d3d3d3"}}>
              <Text style={{alignSelf: "center"}}>Results</Text>
            </View>
            <View style={{backgroundColor: "yellow"}}>
              <Text>Results Available? {JSON.stringify(data.available)}</Text>
              <Text>Results Status? {JSON.stringify(data.status)}</Text>
              <Text>Results? (Dry Matter Based Formula)</Text>
              <Text>{JSON.stringify(data.results)}</Text>
            </View>
            
        </View>
  
      <View style={{ margin: 1 }}>
        {
          isLoading ?
          <View style={{height: windowHeight * 0.8, flex: 1, alignItems: 'center', justifyContent: "center", }}>
            {/* <View> */}
              <ActivityIndicator animating size={100} color="green" />
            {/* </View> */}
          </View>
                  :
            <>
              <ResultCheck result={data} compo={compo} navigate={navigation} bwt={bwt} calDMI={calDMI} />
              <View style={{marginTop: 10}}>
                <SponsorsDisplay />
              </View>
            </>
        }
      </View>


      {/* This section is developer mode only */}
      {/* animal requirements */}
      <View style={{
        backgroundColor: "rgba(10, 120, 10, 0.9)", borderRadius: 10, padding: 10, marginVertical: 20, marginBottom: 30
      }}>
        <Text style={{ fontSize: 24, color: "#fff", fontWeight: 'bold', alignSelf: "center" }}>
          {t("animal requires line")}
        </Text>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: '400', alignSelf: "center" }}>
          {t("CP")}: {nutReqShow[0]} Grams
        </Text>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: '400', alignSelf: "center" }}>
          {t("ME")}: {nutReqShow[1]} kcal
        </Text>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: '400', alignSelf: "center" }}>
          {t("NDF")}: {(nutReqShow[2] / 100) * calDMI} Kilos
        </Text>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: '400', alignSelf: "center" }}>
          {t("Body Weight")}: {bwt} KG
        </Text>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: '400', alignSelf: "center" }}>
          {t("Dry Matter Intake")}: {calDMI} KG
        </Text>
      </View>

    </ScrollView>
  );
}

export default DetailsScreen;
