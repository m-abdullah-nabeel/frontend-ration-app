import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native"
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
          <Text>{JSON.stringify(res['results'])}</Text>
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
  // Final Version
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [compo, setCompo] = useState([]);
  const newlist = []

  const getMovies = async () => {
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

  useEffect(() => {
    getMovies();
  }, [compo]);

  // console.log(newlist)
  const getNutrientValues = (namesList, NutrientObject) => {
    let newlist = [];
    namesList.map(
      (a) => {
        NutrientObject.find(x => x.name == a) !== undefined ?
          newlist.push(NutrientObject.find(x => x.name == a)) :
          null
      }
    )
    setCompo(newlist)
    // console.log(newlist)
  }

  useEffect(() => {
    getNutrientValues(stock, nutrientdata);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/*  */}
      {/*  */}
      <Text>{isLoading ? "Loading..." : "Loaded"}</Text>
      <Text>{compo.length} Selected feedstuffs</Text>
      <Text>Details of Formulated Feed</Text>
      <ResultCheck result={data} />
      {/* <Text>{JSON.stringify(data)}</Text> */}
      {/* <View>
        {
          // data && data['available'] && console.log(data['status'])
          data['available'] ?
            (data['status'] == 0 ? console.log("The Status is Zero") : console.log("Non-zero status"))
            // console.log("available") 
            :
            console.log("N/A")
        }
      </View> */}
      {/* <Text>{
        data && data['results'] && JSON.stringify(data['results']) ?
          JSON.stringify(data['least-cost-feed']) :
          "Poor combination, select again"
      }</Text> */}
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
