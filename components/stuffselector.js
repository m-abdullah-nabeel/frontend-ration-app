import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, FlatList, SectionList, StatusBar, Button } from "react-native";
// testing language
import { useTranslation } from 'react-i18next';
import { t } from "i18next";

const DATA = [
  {
    title: "Fodders",
    min_selection: 2,
    cat_msg: "Select at least 2",
    data: [
      "Barseem",
      "Maize",
      "Oat (Jai)",
      "Mustard (Sarson)",
      "Maize Silage",
      "Sugarcane",
      "Sugarcane tops",
      "Mott grass",
      "Johnson grass (Baru)",
      "Wheat Straw (toori)",
      "Rice Straw (Parali)",
      "Millet stovers",
      "Maize stovers",
      "Sorghum stovers",
      "Corn cobs",
      "Rice Husk (Phakk)",
      "Barseem Hay",
      "Lucerne Hay",
      "Cowpea Hay",
      "Millet Straw",
      "Cowpea Mature",
      "Fenugreek Early Vegetative",
      "Sorghum Silage",
      "Rhodes Grass",
      "Alfalfa (Lucerne)",
      "Napier grass",
      "Rye grass",
      "Millet",
      "Barley",
      "Sorghum",
      "Jantar",
      "Cow pea (Rawanhan)"
    ]
  },
  {
    title: "Energy Supplements",
    min_selection: 1,
    cat_msg: "Select at least 1",
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
      "Potato",
      "Sorghum Grains",
      "Barley Grains",
      "Oats Grains",
      "Rice Grains",
      "Millet Grains",
      "Cane Molasses",
      "Sugarcane Bagasse"

    ]
  },
  {
    title: "Protein Supplements",
    min_selection: 1,
    cat_msg: "Select at least 1",
    data: [
      "Cottonseed cake (Khal)",
      "Soybean meal",
      "Canola meal",
      "Rapeseed meal",
      "Maize gluten meal 30%",
      "Maize gluten meal 60%",
      "Palm kernel cake",
      "Sunflower meal",
      "Guar meal",
      "Linseed meal"
    ]
  },
];


const CategorySelector = ({ category, data, feedstuff, setFeedstuff, error, setError, catLen, setCatLen, min_selection, cat_msg }) => {
  const [selected, setSelected] = useState([])
  const { t } = useTranslation();

  useEffect(() => {
    // console.log("update lengths ")
    // console.log(catLen)
    setCatLen({
      ...catLen, [category]: selected.length
    })

  }, [selected])

  useEffect(() => {
    // error logic
    console.log(catLen)
    console.log("catLen: " + catLen)
    console.log(catLen)
    console.log(Object.values(catLen))
    console.log(Object.values(catLen).includes(0))
    console.log("Error: " + (Object.values(catLen).includes(0) || Object.values(catLen).includes(1)))
    // const check2stuffsSelected = () => (Object.values(catLen).includes(0) || Object.values(catLen).includes(1))
    const check2stuffsSelected = () => (Object.values(catLen).includes(0))
    check2stuffsSelected()
      ? setError(true)
      : setError(false)

    // Object.values(catLen).includes(0)
    //   ? setError(true)
    //   : setError(false)
  }, [catLen])

  return (
    <View>
      <Text style={styles.header}>{t(category)}</Text>
      <View>
        <View>
          {
            error ?
              (selected.length == 0 ?
                <Text style={{
                  color: 'rgb(200, 10, 10)', fontWeight: '600',
                  fontSize: 16, margin: 10
                }}>
                  {t("category error")}
                </Text> :
                null
              ) : null
          }
        </View>
        {/* <Text>{JSON.stringify(selected)}</Text> */}
        {
          data.map(
            (x) => {
              return (
                <TouchableOpacity key={x}
                  style={[styles.item, selected.includes(x) ? { backgroundColor: 'green' } : null]}
                  onPress={() => {
                    selected.includes(x)
                      ? (
                        setSelected(selected.filter(j => j !== x)),
                        setFeedstuff(feedstuff.filter(j => j !== x))
                      )
                      : (
                        setSelected([...selected, x]),
                        setFeedstuff([...feedstuff, x])
                      )
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: 'bold' }}
                  >
                    {t(x)}
                  </Text>
                </TouchableOpacity>
              )
            }
          )
        }
      </View>

    </View>
  )
}

const StuffSelector = ({ route, navigation, min_selection, cat_msg }) => {
  const [feedstuff, setFeedstuff] = useState([]);
  const [error, setError] = useState(false);
  const [catLen, setCatLen] = useState({
    "Protein Supplements": 0,
    "Fodders": 0,
    "Energy Supplements": 0,
  })

  const { animal, req_data } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'rgb(10, 100, 10)', borderRadius: 50, padding: 10, marginBottom: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 28, paddingLeft: 15, color: 'white', alignSelf: "center" }}>{t("select fodders")}</Text>
        <Text style={{ fontWeight: 'light', fontSize: 14, paddingLeft: 15, color: 'white', alignSelf: "center" }}>
          {t("your animal")}: {t(animal)}
        </Text>
      </View>

      <ScrollView>
        {
          DATA.map(
            (category) => {
              return (
                <CategorySelector
                  category={category.title} data={category.data} key={category.title}
                  min_selection={category.min_selection} cat_msg={category.cat_msg}
                  feedstuff={feedstuff} setFeedstuff={setFeedstuff}
                  error={error} setError={setError}
                  catLen={catLen} setCatLen={setCatLen}
                />
              )
            }
          )
        }
      </ScrollView>

      {/* show this button only when you have no error */}
      {
        error
          ? null
          : (
            <Button
              onPress={() => {
                error ?
                  (alert("errors found")) :
                  navigation.navigate('Details', { stock: feedstuff, req_data: req_data });
              }}
              title={t("next")}
              color="rgb(10, 100, 10)"
              style={{ backgroundColor: 'rgb(10, 100, 10)', borderRadius: 50, padding: 20 }}
              accessibilityLabel="Next to detailed"
            />
          )
      }

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
    padding: 15,
    marginVertical: 8
  },
  header: {
    fontSize: 24,
    fontWeight: '800',
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: 'rgb(200, 200, 200)'
  },
  title: {
    fontSize: 24
  }
});
