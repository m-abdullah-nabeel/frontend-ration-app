import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native"
import nutrientdata from '../assets/data/feeds_nutrient.json';

function DetailsScreen({ navigation, route }) {
  const { stock } = route.params;
  // Final Version
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [compo, setCompo] = useState([]);
  const newlist = []


  // {
  //   "feeds": [
  //       {
  //         "name": "csc", "CP": 12, "ME": 2900, "min": 0.10, "max": 0.50, "cost": 150
  //       },
  //       {
  //         "name": "sbm", "CP": 41, "ME": 2000, "min": 0.10, "max": 0.50, "cost": 105
  //       }
  //     ]
  // }

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

  console.log(newlist)
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
      <Text>{isLoading ? "Loading..." : "Loaded"}</Text>
      <Text>{compo.length} Selected feedstuffs</Text>
      <Text>Details of Formulated Feed</Text>
      {/* <Text>{JSON.stringify(data)}</Text> */}
      <Text>{
        data && data['least-cost-feed'] && JSON.stringify(data['least-cost-feed']) ?
          JSON.stringify(data['least-cost-feed']) :
          "Poor combination, select again"
      }</Text>
      <Text>{console.log(compo)}</Text>
      {/* <Text>Selected feed stuffs are</Text> */}
      {/* <View>{stock.map((x) => {
        return <Text key={x}>{x}</Text>
      })}</View> */}
      {/* <View>{compo.map(i => {
        return <Text key={i.Name}>
          {JSON.stringify(i)}
        </Text>
      })}</View> */}
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
