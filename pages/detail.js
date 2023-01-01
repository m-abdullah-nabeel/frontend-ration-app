import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native"
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
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Available and correct results</Text>
          {/* <Text>{JSON.stringify(res['results'])}</Text> */}
          <View>
            {
              Object.keys(res['results']).map(k => {
                curr_ = nutrientdata.find(x => x.name == k)
                percent_val = Math.round(res['results'][k] * 100)

                return (
                  <View key={k} style={{ borderBottomWidth: 2 }}>
                    <Text>{k}</Text>
                    <Text>Percentage Use: {percent_val}</Text>
                    <Text>
                      DM%: {curr_['DM%']} ##### Provides Dry Matter {curr_['DM%'] * percent_val}
                      {dm_a.push(curr_['DM%'] * percent_val)}
                    </Text>
                    <Text>
                      CP: {curr_['CP']} ##### Provides CP {curr_['CP'] * percent_val}
                      {cp_a.push(curr_['CP'] * percent_val)}
                    </Text>
                    <Text>
                      ME: {curr_['ME']}  ##### Provides ME {curr_['ME'] * percent_val}
                      {me_a.push(curr_['ME'] * percent_val)}
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
    let reqData = {
      "feeds": compo
    }
    // Run Only if Selected feedstuff's data is available
    try {
      // https://reactnative.dev/movies.json
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
      // setData(json);
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
      <Text>{isLoading ? "Loading..." : "Loaded"}</Text>

      <View>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Details of Formulated Feed</Text>
        <Text style={{ borderStyle: 'dashed', borderBottomWidth: 1, borderBottomColor: 'black' }}>{compo.length} Selected feedstuffs</Text>
        {/* <Text>=========================================</Text> */}
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
