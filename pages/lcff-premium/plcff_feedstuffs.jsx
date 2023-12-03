import React, { useState, useEffect } from "react";
import { 
  StyleSheet, Text, View, SafeAreaView, 
  ScrollView, TouchableOpacity, StatusBar, Button 
} from "react-native";
import { useTranslation } from 'react-i18next';
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { selectSpecies } from "../../redux/speciesSlice"
import { actions } from "../../redux";
import { selectFeedFormulationData } from "../../redux/animalInputSlice";
import useIngredientSelector from "../lcff_data/ingredients_data_hook";
import { Avatar, Button as PaperButton, Card, PaperText, TextInput } from 'react-native-paper';
import { addIngredients, updateIngredient, removeIngredient } from "../../redux/animalInputSlice";

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const IngredientAddor = ({i}) => {
  const dispatch = useDispatch()
  const selectedSpecies = useSelector(selectSpecies)
  const { updateCompositiononAdd } = useIngredientSelector(selectedSpecies)
  const [select, setSelect] = useState(false)
  const [added, setAdded] = useState(false)
  const [composition, setComposition] = useState([])
  const [textInputValues, setTextInputValues] = useState({}); // New state to store TextInput values

  const handleSelect = () => {
    setSelect(!select)
    setComposition(updateCompositiononAdd(i))
  }

  const handleAdd = () => {
    setSelect(false)
    setAdded(true)
    alert(JSON.stringify(composition))
    dispatch(addIngredients(composition))
    // alert(composition)
  }

  const handleUpdate = () => {
    setSelect(false)
    setAdded(true)
    setComposition({ ...composition, ...textInputValues });

    alert(JSON.stringify(composition))
    dispatch(updateIngredient(composition))
    // alert(composition)
  }
  
  const handleRemove = () => {
    setSelect(false)
    // alert(JSON.stringify(composition))
    dispatch(removeIngredient(composition))
    // alert(composition)
    setAdded(false)
  }

  const handleTextInputChange = (key, value) => {
    // Update the state with the TextInput values
    setTextInputValues((prevValues) => ({ ...prevValues, [key]: value }));
  };

  const handleTextInputBlur = () => {
    // Update the composition state with the TextInput values
    setComposition({ ...composition, ...textInputValues });
  };
  
  return (
    <View>
      <Card>
        <TouchableOpacity 
          style={[styles.item, added ? { backgroundColor: 'green' } : null, select ? { backgroundColor: 'grey' } : null]}
          onPress={handleSelect}
        >
          <Text>{t(i)}</Text>
        </TouchableOpacity>

        {select?
        <>
          <Card.Title 
            title={`Change composition of ${i}`} 
            // subtitle="Card Subtitle" 
            left={LeftContent} 
          />
          <Card.Content>
            {Object.keys(composition).map((key) => {
              return (
                <View key={key} style={{flexDirection: "row"}}>
                  <Text style={{width: "30%"}}>{key}</Text>
                  <TextInput
                    // onChangeText={handleUpdateNutrient} 
                    style={{width: "70%"}} dense mode="outlined"
                    placeholder={composition[key]}
                    onChangeText={(value) => handleTextInputChange(key, value)}
                    onBlur={handleTextInputBlur}
                  />
                </View>  
              )
            })}
          </Card.Content>
          <Card.Actions>
            {added ?
            (<>
              <PaperButton onPress={() => setSelect(false)}>
                Close
              </PaperButton>
              <PaperButton onPress={handleRemove}>
                Remove Ingredient
              </PaperButton>
              <PaperButton onPress={handleUpdate}>
                Update Ingredient
              </PaperButton>
            </>) : (
            <PaperButton onPress={handleAdd}>
              Add Ingredient with its values
            </PaperButton>          
            )}
          </Card.Actions>
        </>
        :null}
      </Card>
    </View>
  )
}

const CategorySelector = ({ categoryData, feedstuff, setFeedstuff, error, setError, catLen, setCatLen, min_selection, cat_msg }) => {
  const [selected, setSelected] = useState([])
  const { t } = useTranslation();

  // useEffect(() => {
  //   setCatLen({...catLen, [categoryData.title]: selected.length})
  // }, [selected])

  // useEffect(() => {
  //   // error logic
  //   console.log("catLen: " + catLen)
  //   console.log("Error: " + (Object.values(catLen).includes(0) || Object.values(catLen).includes(1)))
  //   const check2stuffsSelected = () => (Object.values(catLen).includes(0) || Object.values(catLen).includes(1))
  //   check2stuffsSelected()
  //     ? setError(true)
  //     : setError(false)
  // }, [catLen])

  return (
    <View>
      <Text style={styles.header}>{t(categoryData.title)}</Text>

      <View>
        <View>
          {error ?
            (selected.length == 0 ? <Text style={styles.errorDisplay}>{t("category error")}</Text>:null)
          :null}
        </View>
        <Text>{JSON.stringify(selected)}</Text>
        <View>
          {categoryData.data.map((i) => {
            return (
              <IngredientAddor key={i} i={i}/>
            )
          })}
        </View>

        {categoryData.data.map((x) => {
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
        })}
      </View>

    </View>
  )
}

const PremIngredientInputs = ({ route, navigation, min_selection, cat_msg }) => {

  const selectedFeedData = useSelector(selectFeedFormulationData)
  const selectedSpecies = useSelector(selectSpecies)
  const { ingredients } = useIngredientSelector(selectedSpecies)
  // alert(JSON.stringify(ingredients))

  const [feedstuff, setFeedstuff] = useState([]);
  const [error, setError] = useState(false);
  const [catLen, setCatLen] = useState({
    "Protein Supplements": 0,
    "Fodders": 0,
    "Energy Supplements": 0,
  })

  const dispatch = useDispatch()
  const feedFormuationData = useSelector(selectFeedFormulationData)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View style={{ backgroundColor: 'rgb(10, 100, 10)', borderRadius: 5, padding: 10, marginBottom: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 28, paddingLeft: 15, color: 'white', alignSelf: "center" }}>{t("select fodders")}</Text>
        <Text style={{ fontWeight: 'light', fontSize: 14, paddingLeft: 15, color: 'white', alignSelf: "center" }}>
          {t("your animal")}: {t(selectedSpecies)} Premium
        </Text>
      </View>

      <View>
        <Text>{JSON.stringify(feedFormuationData)}</Text>
      </View> */}

      <ScrollView>
        {ingredients.map((category) => (
          <CategorySelector categoryData={category}
            category={category.title} data={category.data} key={category.title}
            min_selection={category.min_selection} cat_msg={category.cat_msg}
            feedstuff={feedstuff} setFeedstuff={setFeedstuff}
            error={error} setError={setError}
            catLen={catLen} setCatLen={setCatLen}
          />
        ))}

        {/* Delete Later */}
        {Object.keys(selectedFeedData).length!==0 && Object.keys(selectedFeedData).map((i) => (
          <Text key={i}>
            {i} {": \n"} {JSON.stringify(selectedFeedData[i])} {" \n "}
          </Text>
        ))}  

        {/* <Text>{JSON.stringify(selectedFeedData)}</Text>   */}

      </ScrollView>

      {/* show this button only when you have no error */}
      {error? null:
      <Button
        onPress={() => {
          error ?
            (alert("errors found")) :
            navigation.navigate('Prem Results', { stock: feedstuff });
        }}
        title={t("next")}
        color="rgb(10, 100, 10)"
        style={{ backgroundColor: 'rgb(10, 100, 10)', borderRadius: 50, padding: 20 }}
        accessibilityLabel="Next to detailed"
      />}
    </SafeAreaView>
  )
}

export default PremIngredientInputs;

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
  },
  errorDisplay: {
    color: 'rgb(200, 10, 10)', 
    fontWeight: '600', 
    fontSize: 16, 
    margin: 10
  }
});
