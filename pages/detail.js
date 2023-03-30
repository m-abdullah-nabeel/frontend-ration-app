import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, TouchableOpacity, Linking, Image, ScrollView, Pressable } from "react-native"
import nutrientdata from '../assets/data/feeds_nutrient.json';
import animalsReqdata from '../assets/data/nutrients_required.json';
import { Dimensions } from 'react-native';

import RequirementsSheep from '../assets/data/animal_requirements/sheep.json';
import RequirementsGoat from '../assets/data/animal_requirements/goat.json';
import RequirementsCattle from '../assets/data/animal_requirements/cattle.json';
import RequirementsBuffalo from '../assets/data/animal_requirements/buffalo.json';

// testing language
import { useTranslation } from 'react-i18next';

const ResultCheck = (props) => {
  const { t } = useTranslation();

  const res = props.result
  const compo = props.compo
  const navigation = props.navigation
  const bwt = props.bwt
  // const dmi_req = props.calDMI
  const dmi_req = (bwt * 2 / 100).toFixed(2)
  let dm_a = []
  let cp_a = []
  let me_a = []
  let ndf_a = []

  let status_ = {
    0: 'Optimization terminated successfully',
    1: 'Iteration limit reached',
    2: 'The selected combination doesnt provide enough nutrients', //Problem appears to be infeasible
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
            backgroundColor: "rgba(153, 10, 10, 0.8)",
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

            {console.log("==========>\n==========>\n==========>\n==========>\n==========>\n==========>\n")}
            {console.log("Starting Debugging for incorrect as fed results")}
            {
              console.log("Results (DM Basis): " + JSON.stringify(res['results']))
            }
            {
              Object.keys(res['results']).map((k, y) => {
                curr_ = nutrientdata.find(x => x.name == k)
                percent_val = Math.round(res['results'][k] * 100)


                dm_a.push(curr_['DM%'] * percent_val * curr_['DM%'] / 100)
                cp_a.push(curr_['CP'] * percent_val * curr_['DM%'] / 100)
                me_a.push(curr_['ME'] * percent_val * curr_['DM%'] / 100)
                ndf_a.push(curr_['NDF'] * percent_val * curr_['DM%'] / 100)


                // dm_a.push(curr_['DM%'] * percent_val)
                // cp_a.push(curr_['CP'] * percent_val)
                // me_a.push(curr_['ME'] * percent_val)
                // ndf_a.push(curr_['NDF'] * percent_val)

                console.log(String(y) + ". " + JSON.stringify(curr_) + String(percent_val))

                console.log(
                  curr_['DM%'] * percent_val,
                  curr_['CP'] * percent_val,
                  curr_['ME'] * percent_val,
                  curr_['NDF'] * percent_val
                )

                return (
                  <View key={k} >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'rgb(120, 30, 0)', borderBottomWidth: 1 }}>
                      <View style={{ height: 35 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', width: 200 }}>
                          {/* {k} */}
                          {t(k)}
                        </Text>
                      </View>
                      {/* <View style={{ height: 35 }}>
                        <Text>{JSON.stringify(((compo.find(x => x.name == k)['DM%']) / 100 * percent_val) * 50)}</Text>
                      </View> */}
                      <View style={{ height: 35 }}>
                        <Text style={{ fontSize: 24, fontWeight: '650' }}>{percent_val} %</Text>
                      </View>
                    </View>
                    <Text style={{ backgroundColor: 'red' }}>
                      DM%: {curr_['DM%']}
                      CP: {curr_['CP']}
                      ME: {curr_['ME']}
                      NDF: {curr_['NDF']}
                    </Text>
                    <Text style={{ backgroundColor: 'green' }}>
                      Provides
                      Dry Matter {curr_['DM%'] * percent_val}
                      {/* {dm_a.push(curr_['DM%'] * percent_val)} */}
                      CP {curr_['CP'] * percent_val}
                      {/* {cp_a.push(curr_['CP'] * percent_val)} */}
                      ME {curr_['ME'] * percent_val}
                      {/* {me_a.push(curr_['ME'] * percent_val)} */}
                      NDF {curr_['NDF'] * percent_val}
                      {/* {ndf_a.push(curr_['NDF'] * percent_val)} */}
                    </Text>
                  </View>
                )
              })
            }
          </View>

          {/* this formula contains / nutrient composition of feed */}
          <View style={{
            backgroundColor: "rgb(30, 130, 30)", borderRadius: 10, padding: 10, marginTop: 20
          }}>
            <Text style={{ fontSize: 24, color: "#fff", fontWeight: 'bold', alignSelf: "center" }}>{t("feed composition line")}</Text>
            <Text style={{ color: "#fff" }}>
              Dry Matter:&nbsp;
              {
                ((dm_a.reduce(function (x, y) {
                  return x + y;
                }, 0)) / 100).toFixed(2)
              }
            </Text>
            <Text style={{ color: "#fff", fontSize: 22, fontWeight: '600', alignSelf: "center", backgroundColor: 'blue' }}>
              {t("CP")}:
              {
                ((cp_a.reduce(function (x, y) {
                  return x + y;
                }, 0)) / 100).toFixed(2)
              } %
            </Text>
            <Text style={{ color: "#fff", fontSize: 22, fontWeight: '600', alignSelf: "center" }}>
              {t("ME")}:
              {
                ((me_a.reduce(function (x, y) {
                  return x + y;
                }, 0)) / 100).toFixed(2)
              }
            </Text>
            <Text style={{ color: "#fff", fontSize: 22, fontWeight: '600', alignSelf: "center" }}>
              {t("NDF")}:
              {
                ((ndf_a.reduce(function (x, y) {
                  return x + y;
                }, 0)) / 100).toFixed(2)
              }
            </Text>
          </View>

          {/* As fed basis for one animal */}

          <View style={{
            backgroundColor: "pink",
            padding: 10, borderColor: 'green', borderWidth: 3, borderRadius: 10, marginTop: 15
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, borderBottomColor: 'black', borderBottomWidth: 4 }}>
              {t("As Fed Basis")}
            </Text>
            {/* <Text>(For your {bwt} kg animal)</Text>
            <Text>Your Animal requires {dmi_req} Kg DMI</Text> */}
            {
              Object.keys(res['results']).map(k => {
                curr_ = nutrientdata.find(x => x.name == k)
                percent_val = Math.round(res['results'][k] * 100)
                // dm_a.push(curr_['DM%'] * percent_val)
                // cp_a.push(curr_['CP'] * percent_val)
                // me_a.push(curr_['ME'] * percent_val)

                return (
                  <View key={k} >
                    <View style={{
                      flex: 1, flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomColor: 'rgb(120, 30, 0)', borderBottomWidth: 1
                    }}>
                      <View style={{ height: 25 }}>
                        <Text style={{
                          fontSize: 18, fontWeight: 'bold', width: 100
                        }}>
                          {t(k)}
                        </Text>
                      </View>

                      {/* <View style={{ height: 25 }}>
                        <Text style={{
                          fontSize: 18, fontWeight: 'bold', //borderRightWidth: 2, borderRightColor: 'black', width: 70 
                        }}>
                          {
                            ((percent_val * dmi_req / 100) / (curr_['DM%'] / 100)).toFixed(2)
                          } Kg
                        </Text>
                      </View> */}

                      <View style={{ height: 25 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                          {
                            ((percent_val * 100) / (curr_['DM%'] * dmi_req)).toFixed(2)
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
        <Image
          style={{ width: '100%', height: 300, flex: 1, justifyContent: 'center', alignItems: "center" }}
          source={require('../assets/images/warn.gif')}
        />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>{status_[res['status']]}</Text>
      </View>
    )
  }
  // unexpected errors like no connectivity or damaged app
  else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
        <Image
          style={{ width: '100%', height: 300, flex: 1, justifyContent: 'center', alignItems: "center" }}
          source={require('../assets/images/important.gif')}
        />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>An unexpected error happened!</Text>
        <Text >{res['error'] && res['error']}</Text>
      </View>

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

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  console.log("Device Dimensions: ")
  console.log(windowWidth, windowHeight)

  const { t } = useTranslation();

  const getCalculations = async () => {
    console.log("===================================Running Calculations===========================================")
    // check if feed and nut req arrarys have data
    // dont proceed if they are empty
    // let reqData = {
    //   "feeds": compo,
    //   "nut_req": nutReq
    //   // "nut_req": [15, 2094.82]
    // }
    // Run Only if Selected feedstuff's data is available
    try {

      if (compo.length > 0 && nutReq.length > 0) {
        setLoading(true)
        let reqData = {
          "feeds": compo,
          "nut_req": nutReq
          // "nut_req": [15, 2094.82]
        }
        console.log(reqData)

        const response = await fetch('https://poo9ym.deta.dev/formulate', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqData),
        });
        const json = await response.json();
        setData(json);
        console.log(json);
        setLoading(false);
      } else {
        console.log("################==>Invalid Data<==##################")
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    console.log("===================================Concluding Calculations===========================================")

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
    console.log("=============================== Animal Data ==================================")
    console.log(animalData)
    console.log(animalData['species'])

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
    let dmi = found['dmi']
    let cp_T = found['cp_req']
    let me_T = found['me_req']
    // console.log(dmi)
    // console.log(cp_T)
    // console.log(me_T)
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
    getCalculations()
  }, [compo, nutReq]);

  useEffect(() => {
    getNutriReq(req_data)
  }, [])

  useEffect(() => {
    getCompositions(stock, nutrientdata);
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ margin: 1 }}>
        {
          isLoading ?
            <Image
              style={{ width: '100%', height: 300, flex: 1, justifyContent: 'center', alignItems: "center", alignSelf: "center" }}
              source={require('../assets/images/loading.gif')}
            />
            :
            <ResultCheck result={data} compo={compo} navigate={navigation} bwt={bwt} calDMI={calDMI} />
        }
      </View>

      {/* animal requirements */}
      <View style={{
        backgroundColor: "rgba(10, 120, 10, 0.9)", borderRadius: 10, padding: 10, marginVertical: 20, marginBottom: 30
      }}>
        <Text style={{ fontSize: 24, color: "#fff", fontWeight: 'bold', alignSelf: "center" }}>
          {t("animal requires line")}
        </Text>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: '600', alignSelf: "center" }}>
          {t("CP")}: {nutReqShow[0]} Grams
        </Text>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: '600', alignSelf: "center" }}>
          {t("ME")}: {nutReqShow[1]} kcal
        </Text>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: '600', alignSelf: "center" }}>
          {t("NDF")}: {(nutReqShow[2] / 100) * calDMI} Kilos
        </Text>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: '600', alignSelf: "center" }}>
          {t("Body Weight")}: {bwt} KG
        </Text>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: '600', alignSelf: "center" }}>
          {t("Dry Matter Intake")}: {calDMI} KG
        </Text>

        {/* <Text style={{ color: "#fff", fontSize: 20, fontWeight: '600', alignSelf: "center" }}>
          {t("Dry Matter Intake")}: {JSON.stringify(nutReq)}
        </Text> */}
        {/* <Text style={{ color: "#fff", fontSize: 20, fontWeight: '600', alignSelf: "center" }}>
          {t("Dry Matter Intake")}: {(bwt * 2 / 100)}
        </Text>
        <Text>
          {t("Dry Matter Intake")}: {calDMI}
        </Text> */}
      </View>

      {/* sponsors display */}
      <View style={{
        flex: 1, width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around',
        borderColor: "black", borderWidth: 1, backgroundColor: 'rgb(10, 100, 10)', height: 50
      }}>

        <View style={{ backgroundColor: 'white', borderRadius: 5, height: 35, width: 100, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
          <Text style={{
            alignSelf: 'center', padding: 3, fontSize: 12, textAlign: "center", fontWeight: 'bold', borderBottomWidth: 2,
          }}>
            Our Partners
          </Text>
        </View>

        <TouchableOpacity
          onPress={async () => await Linking.openURL(url_arass)}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 70, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
            <Image
              style={{ width: 50, height: 27 }}
              source={require('../assets/arass.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => await Linking.openURL(url_uvas)}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 50, height: 35, width: 70, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
            <Image
              style={{ width: 50, height: 23 }}
              source={require('../assets/uvas-big.png')}
            />
          </View>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

export default DetailsScreen;
