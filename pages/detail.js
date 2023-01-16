import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView } from "react-native"
import nutrientdata from '../assets/data/feeds_nutrient.json';

const ResultCheck = (props) => {
  const res = props.result
  let dm_a = []
  let cp_a = []
  let me_a = []

  let status_ = {
    0: 'Optimization terminated successfully',
    1: 'Iteration limit reached',
    2: 'Problem appears to be infeasible',
    3: 'Problem appears to be unbounded',
    4: 'Numerical difficulties encountered',
  }

  if (res['available']) {
    if (res['status'] == 0) {
      return (
        <View>
          <Text style={{ fontSize: 18, fontWeight: '500', }}>Available and correct results</Text>
          <View>
            {
              Object.keys(res['results']).map(k => {
                curr_ = nutrientdata.find(x => x.name == k)
                percent_val = Math.round(res['results'][k] * 100)

                return (
                  <View key={k} style={{ borderBottomWidth: 2, borderLeftWidth: 5, borderLeftColor: 'green', }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'rgb(120, 30, 0)', borderBottomWidth: 4 }}>
                      <View style={{ height: 35 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{k}</Text>
                      </View>
                      <View style={{ height: 35 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{percent_val}</Text>
                      </View>
                    </View>
                    <Text>
                      DM%: {curr_['DM%']}
                      CP: {curr_['CP']}
                      ME: {curr_['ME']}
                    </Text>
                    <Text>
                      Provides
                      Dry Matter {curr_['DM%'] * percent_val} {dm_a.push(curr_['DM%'] * percent_val)}
                      CP {curr_['CP'] * percent_val} {cp_a.push(curr_['CP'] * percent_val)}
                      ME {curr_['ME'] * percent_val} {me_a.push(curr_['ME'] * percent_val)}
                    </Text>
                  </View>
                )
              })
            }
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>Feed's Nutrient Value per Kg</Text>
            <Text>
              Dry Matter per kg:&nbsp;
              {
                (dm_a.reduce(function (x, y) {
                  return x + y;
                }, 0)) / 100
              }
            </Text>
            <Text>
              CP Sum:
              {
                (cp_a.reduce(function (x, y) {
                  return x + y;
                }, 0)) / 100
              }
            </Text>
            <Text>
              ME Sum:
              {
                (me_a.reduce(function (x, y) {
                  return x + y;
                }, 0)) / 100
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
  const { stock } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [compo, setCompo] = useState([]);

  const getCalculations = async () => {
    // console.log(compo)
    let reqData = {
      "feeds": compo
    }
    // Run Only if Selected feedstuff's data is available
    try {
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    getCalculations();
  }, [compo]);

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

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 22 }}>Details of Formulated Feed</Text>
        <Text style={{ borderStyle: 'dashed', borderBottomWidth: 1, borderBottomColor: 'black' }}>{compo.length} Selected feedstuffs</Text>
        <ResultCheck result={data} />
      </View>
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate('Animal Selector');
        }}
      />
    </ScrollView>
  );
}

export default DetailsScreen;
