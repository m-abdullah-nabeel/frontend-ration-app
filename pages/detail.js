import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native"

function DetailsScreen({ navigation, route }) {
  const { stock } = route.params;
  // Final Version
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      // https://reactnative.dev/movies.json
      const response = await fetch('https://poo9ym.deta.dev/formulate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "feeds": [
            {
              "name": "csc", "CP": 12, "ME": 2900, "min": 0.10, "max": 0.50, "cost": 150
            },
            {
              "name": "sbm", "CP": 41, "ME": 2000, "min": 0.10, "max": 0.50, "cost": 105
            }
          ]
        }),
      });
      const json = await response.json();
      setData(json.quantities);
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
  }, []);




  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details of Formulated Feed</Text>
      <Text></Text>
      <Text>Get Details of Feed Stuffs</Text>
      <Text></Text>
      <Text>Get Details of Nutrient Requirements</Text>
      <Text></Text>
      <Text>{JSON.stringify(data)}</Text>
      <Text>Selected feed stuffs are</Text>
      <View>{stock.map((x) => {
        return <Text key={x}>{x}</Text>
      })}</View>
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