import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, FlatList, SectionList, StatusBar, Button } from "react-native";

const DATA = [
  {
    title: "Roughages",
    data: [
      "Barseem",
      "Maize",
      "Oat (Jai)",
      "Mustard (Sarson)",
      "Maize Silage",
      "Sugarcane",
      "Sugarcane tops",
      "Mott grass",
      "Johnson grass (Baru)"
    ]
  },
  {
    title: "Dry Roughages & Crop residues",
    data: [
      "Wheat Straw (toori)",
      "Rice Straw (Parali)",
      "Millet stovers",
      "Maize stovers",
      "Sorghum stovers",
      "Corn cobs",
      "Rice Husk (Phakk)"
    ]
  },
  {
    title: "Energy Sources",
    data: [
      "Maize grain",
      "Wheat grain",
      "Millet grain",
      "Mamni",
      "Maize bran",
      "Wheat Bran (Chokar)",
      "Rice polish",
      "Sugarbeet pulp",
      "Apple pomace",
      "Citrus waste",
      "Channa Karra",
      "Massar Karra",
      "Mung Karra",
      "Dry dates",
      "Potato"
    ]
  }, {
    title: "Protein sources",
    data: [
      "Cottonseed cake (Khal)",
      "Soybean meal",
      "Canola meal",
      "Rapeseed meal",
      "Maize gluten meal 30%",
      "Maize gluten meal 60%",
      "Palm kernel cake",
      "Sunflower meal",
      "Guar meal"
    ]
  },
];

const CategorySelector = ({ category, data, feedstuff, setFeedstuff, error, setError, errors, setErrors }) => {
  const [selected, setSelected] = useState([])

  return (
    <View>
      <Text style={styles.header}>{category}</Text>
      <View>
        <View>
          {
            error ?
              (selected.length == 0 ?
                <Text style={{ color: 'red', fontSize: 26 }}>Error: Select at least one item from this category</Text> :
                <Text style={{ color: 'green', fontSize: 26 }}>No Error</Text>
              ) : null
          }
        </View>
        <Text>{JSON.stringify(selected)}</Text>
        {
          data.map(
            (x) => {
              return (
                <TouchableOpacity key={x}
                  style={[styles.item, selected.includes(x) ? { backgroundColor: 'green' } : null]}
                  onPress={() => {
                    selected.includes(x) ?
                      (setSelected(selected.filter(j => j !== x)),
                        setFeedstuff(feedstuff.filter(j => j !== x)),
                        setErrors({
                          ...error, [category]: selected.length
                        })
                      )
                      :
                      (
                        setSelected([...selected, x]),
                        setFeedstuff([...feedstuff, x]),
                        setErrors({
                          ...error, [category]: selected.length
                        })
                      )
                  }}
                >
                  <Text
                    style={{ fontSize: 24, fontWeight: '500' }}
                  >{x}</Text>
                </TouchableOpacity>
              )
            }
          )
        }
      </View>

    </View>
  )
}


const StuffSelector = ({ route, navigation }) => {
  const [feedstuff, setFeedstuff] = useState([]);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({
    roughages: 0,
    dry_roughages: 0,
    energy: 0,
    protein: 0
  })
  const { animal } = route.params;



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'rgb(10, 100, 10)', borderRadius: 50, padding: 10, marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 32, paddingLeft: 15, color: 'white' }}>Select FeedStuffs</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 15, color: 'white' }}>Your Animal: {animal}</Text>
        <Text>
          {JSON.stringify(feedstuff)}
        </Text>
        <Text>
          {JSON.stringify(errors)}
        </Text>
      </View>
      <ScrollView>
        {
          DATA.map(
            (category) => {
              return (
                <CategorySelector
                  category={category.title} data={category.data} key={category.title}
                  feedstuff={feedstuff} setFeedstuff={setFeedstuff}
                  error={error} setError={setError}
                  errors={errors} setErrors={setErrors}
                />
              )
            }
          )
        }

      </ScrollView>

      {/* show this button only when you have no error */}
      <Button
        onPress={() => {
          error ?
            (alert("errors found")) :
            navigation.navigate('Details', { stock: feedstuff });
        }}
        title="Next"
        color="rgb(10, 100, 10)"
        style={{ backgroundColor: 'rgb(10, 100, 10)', borderRadius: 50, padding: 20 }}
        accessibilityLabel="Next to detailed"
      />

    </SafeAreaView>
  )
}

export default StuffSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 24,
    fontWeight: '500',
    borderRadius: 50,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: 'rgb(200, 200, 200)'
  },
  title: {
    fontSize: 24
  }
});
