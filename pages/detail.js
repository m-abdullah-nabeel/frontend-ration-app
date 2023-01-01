import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native"
import nutrientdata from '../assets/data/feeds_nutrient.json';

const ResultCheck = (props) => {
  const res = props.result
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
          <Text>Available and correct results</Text>
          {/* <Text>{JSON.stringify(res['results'])}</Text> */}
          <View>
            {
              Object.keys(res['results']).map(k => {
                return (
                  <View key={k}>
                    <Text>{k}</Text>
                    <Text>{res['results'][k]}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>
      )
    }
    return (
      <View>
        <Text>Available but incorrect results</Text>
        <Text>{status_[res['status']]}</Text>
      </View>
    )
  }
  else {
    return (
      <View>
        <Text>N/A component</Text>
        <Text>{res['error'] && res['error']}</Text>
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
    <View style={{ flex: 1 }}>
      <Text>{isLoading ? "Loading..." : "Loaded"}</Text>

      <View>
        <Text>Details of Formulated Feed</Text>
        <Text>{compo.length} Selected feedstuffs</Text>
        <ResultCheck result={data} />
      </View>
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate('Animal Selector');
        }}
      />
    </View>
  );
}

export default DetailsScreen;