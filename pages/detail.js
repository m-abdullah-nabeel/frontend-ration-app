import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView, Pressable } from "react-native"
import nutrientdata from '../assets/data/feeds_nutrient.json';
import animalsReqdata from '../assets/data/nutrients_required.json';

const ResultCheck = (props) => {
  const res = props.result
  const compo = props.compo
  const navigation = props.navigation
  let dm_a = []
  let cp_a = []
  let me_a = []

  let status_ = {
    0: 'Optimization terminated successfully',
    1: 'Iteration limit reached',
    2: 'The selected combination doesnt provide enough nutrients', //Problem appears to be infeasible
    3: 'Problem appears to be unbounded',
    4: 'Numerical difficulties encountered',
  }

  if (res['available']) {
    if (res['status'] == 0) {

      return (
        <View>
          <View style={{
            backgroundColor: "rgb(110, 30, 1)",
            width: "100%",
            borderRadius: 10,
            marginBottom: 20
          }}>
            <Text style={{
              fontSize: 18, fontWeight: 'bold', color: "#fff",
              marginTop: 5, marginLeft: 20, marginRight: 20, marginBottom: 2,
            }}>
              Least Cost Feed Formulation
            </Text>
            <Text style={{
              color: "#fff", fontSize: 12,
              marginBottom: 5, marginLeft: 20, marginRight: 10,
            }}>
              {compo.length} feedstuffs selected
            </Text>

          </View>


          <View style={{
            // backgroundColor: "pink",
            padding: 10, borderColor: 'green', borderWidth: 3, borderRadius: 10
          }}>
            {
              Object.keys(res['results']).map(k => {
                curr_ = nutrientdata.find(x => x.name == k)
                percent_val = Math.round(res['results'][k] * 100)
                dm_a.push(curr_['DM%'] * percent_val)
                cp_a.push(curr_['CP'] * percent_val)
                me_a.push(curr_['ME'] * percent_val)

                return (
                  <View key={k} >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'rgb(120, 30, 0)', borderBottomWidth: 1 }}>
                      <View style={{ height: 35 }}>
                        <Text style={{ fontSize: 24, fontWeight: '650' }}>{k}</Text>
                      </View>
                      {/* <View style={{ height: 35 }}>
                        <Text>{JSON.stringify(((compo.find(x => x.name == k)['DM%']) / 100 * percent_val) * 50)}</Text>
                      </View> */}
                      <View style={{ height: 35 }}>
                        <Text style={{ fontSize: 24, fontWeight: '650' }}>{percent_val} %</Text>
                      </View>
                    </View>
                    {/* <Text>
                      DM%: {curr_['DM%']}
                      CP: {curr_['CP']}
                      ME: {curr_['ME']}
                    </Text> */}
                    {/* <Text>
                      Provides
                      Dry Matter {curr_['DM%'] * percent_val} {dm_a.push(curr_['DM%'] * percent_val)}
                      CP {curr_['CP'] * percent_val} {cp_a.push(curr_['CP'] * percent_val)}
                      ME {curr_['ME'] * percent_val} {me_a.push(curr_['ME'] * percent_val)}
                    </Text> */}
                    {/* {dm_a.push(curr_['DM%'] * percent_val)}
                    {cp_a.push(curr_['CP'] * percent_val)}
                    {me_a.push(curr_['ME'] * percent_val)} */}
                  </View>
                )
              })
            }
          </View>
          {/* <Text></Text> */}
          <View style={{
            backgroundColor: "rgb(30, 130, 30)", borderRadius: 10, padding: 10, marginTop: 20
          }}>
            <Text style={{ fontSize: 22, fontWeight: '750', color: "#fff", fontWeight: 'bold' }}>This Feed Contains</Text>
            {/* <Text style={{ color: "#fff" }}>
              Dry Matter:&nbsp;
              {
                ((dm_a.reduce(function (x, y) {
                  return x + y;
                }, 0)) / 100).toFixed(2)
              }
            </Text> */}
            <Text style={{ color: "#fff" }}>
              CP&nbsp;:
              {
                ((cp_a.reduce(function (x, y) {
                  return x + y;
                }, 0)) / 100).toFixed(2)
              }
            </Text>
            <Text style={{ color: "#fff" }}>
              ME:
              {
                ((me_a.reduce(function (x, y) {
                  return x + y;
                }, 0)) / 100).toFixed(2)
              }
            </Text>
          </View>

        </View>
      )
    }
    return (
      <View>
        {/* <Text>Available but incorrect results</Text> */}
        <Text style={{ fontSize: 18, fontWeight: '500' }}>{status_[res['status']]}</Text>
      </View>
    )
  }
  else {
    return (
      <View>
        {/* <Text>N/A component</Text> */}
        <Text style={{ fontSize: 18, fontWeight: '500' }}>{res['error'] && res['error']}</Text>
      </View>

    )
  }
}

function DetailsScreen({ navigation, route }) {
  const { stock, req_data } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [nutReq, setNutReq] = useState([])
  const [compo, setCompo] = useState([]);

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

  const getNutriReq = (animalData, ReqObj) => {
    let bw = animalData['Body Weight']
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
    let me = (Number(me_T) / Number(dmi)).toFixed(2)
    console.log(cp)
    // newlist.push(cp)
    let cp = (Number(cp_T) / (Number(dmi) * 1000) * 100).toFixed(2)
    console.log(me)
    // console.log(found[])
    // console.log("Nutrients Data")
    // console.log(found)
    // console.log("found")
    setNutReq([Number(cp), Number(me)])
  }

  useEffect(() => {
    console.log("------------------------------------------Change Detected-----------------------------------------------------")
    getCalculations()
  }, [compo, nutReq]);

  useEffect(() => {
    getNutriReq(req_data, animalsReqdata)
  }, [])

  useEffect(() => {
    getCompositions(stock, nutrientdata);
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        {
          isLoading ?
            <Image
              style={{ width: '90%', height: 350, flex: 1, justifyContent: 'center', alignItems: "center" }}
              source={require('../assets/images/loading.gif')}
            />
            :
            null
        }
      </View>
      <ResultCheck result={data} compo={compo} navigate={navigation} />
    </ScrollView>
  );
}

export default DetailsScreen;
