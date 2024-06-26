import React, { useState, useEffect } from "react";
import { 
  StyleSheet, Text, View, SafeAreaView, 
  ScrollView, TouchableOpacity, StatusBar, Button 
} from "react-native";
import { useTranslation } from 'react-i18next';
import { t } from "i18next";
import { useForm, Controller } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux";
import { selectSpecies } from "../../redux/speciesSlice"
import { useNavigation } from '@react-navigation/native';
import { setNutrientRequirements, selectFeedFormulationData } from "../../redux/animalInputSlice";

import useIngredientSelector from "../lcff_data/ingredients_data_hook";
import { Avatar, Button as PaperButton, Card, PaperText, TextInput, Icon, HelperText } from 'react-native-paper';
import { addIngredients, updateIngredient, removeIngredient } from "../../redux/animalInputSlice";

// const LeftContent = props => <Avatar.Icon mode="outlined" {...props} icon="calculator" />
const LeftContent = props => <Icon
  source="calculator"
  color={"rgb(10, 100, 10)"}
  size={40}
/>

const IngredientAddor = ( { ingredient, setCatItems } ) => {
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit, setValue, trigger, 
    formState: { errors },
  } = useForm()
  const selectedSpecies = useSelector(selectSpecies)
  const { updateCompositiononAdd, factors } = useIngredientSelector(selectedSpecies)
  const [select, setSelect] = useState(false)
  const [added, setAdded] = useState(false)
  const [composition, setComposition] = useState([])
  const selectedFeedData = useSelector(selectFeedFormulationData)

  const handleSelect = () => {
    setSelect(!select)
    setComposition(updateCompositiononAdd(ingredient))
  }

  const handleAdd = (data) => {
    setSelect(false)
    setAdded(true)
    // alert(JSON.stringify(data))
    dispatch(addIngredients(data))
    setCatItems((prevSum) => prevSum + 1)
  }

  const handleUpdate = (data) => {
    setSelect(false)
    setAdded(true)
    // alert(JSON.stringify(composition))
    dispatch(updateIngredient(data))
  }
  
  const handleRemove = ( data ) => {
    setSelect(false)
    // alert(JSON.stringify(data))
    dispatch(removeIngredient(data))
    setAdded(false)
    setCatItems((prevSum) => prevSum - 1)
  }

  const handleTextInputChange = (fieldName, value) => {
    // You can perform any logic here, such as updating the state
    console.log(`Field ${fieldName} changed to: ${value}`);
    setValue(fieldName, value);
  };
  
  const handleTextInputBlur = (fieldName) => {
    // You can perform any logic here, such as validation checks
    console.log(`Field ${fieldName} blurred`);
    trigger(fieldName);
  };
  
  useEffect(() => {
    const fetchDefaultValues = async (data) => {
      factors.map((val) => {
        setValue(val.api_reference, composition[val.data_field])
      })
    };
  
    if (
      factors && factors.length!==0 && ingredient!== null 
    ) {
      setValue("name", ingredient)
      fetchDefaultValues();
    }
  }, [select]);

  useEffect(() => {
    const fetchDefaultValues = async (data) => {
      const matchingObject = data.find(item => item.name === ingredient);

      if (matchingObject) {
          console.log(`Found object for ${ingredient}:`, matchingObject);
          setAdded(true)
          factors.map((val) => {
            setValue(val.api_reference, matchingObject[val.data_field])
          })
      }
    };
  
    if (
      factors && factors.length!==0 && ingredient!== null 
      && Object.keys(selectedFeedData).length!==0 && selectedFeedData.ingredients.length!==0
    ) {
      setValue("name", ingredient);
      fetchDefaultValues(selectedFeedData.ingredients);
    }
  }, [select]);

  return (
    <View >
      <TouchableOpacity
        style={[
          styles.item,
          added ? { backgroundColor: 'green' } : null,
          select ? { backgroundColor: '#d3d3d3' } : null,
        ]}
        onPress={handleSelect}
      >
        <Text style={[added ? { color: 'white' } : null,]}>
          {t(ingredient)}
        </Text>
      </TouchableOpacity>

      {select ? (
        <Card style={{ marginTop: 10, backgroundColor: "#d3d3d3" }}>
          <>
            <Card.Title
              title={t("change composition") + t(ingredient)}
              left={LeftContent}
              titleStyle={{ fontSize: 18, fontWeight: '600' }}
            />
            <Card.Content>
            <Text style={{fontSize: 12}}>Please translate/scale inclusion levels from 0-100 to 0-1</Text>
            <Text style={{fontSize: 11, color: "red"}}>Example: If you want to set inclusion level to 40%, use 0.4</Text>
            <Text style={{fontSize: 11, color: "red", marginBottom: 5}}>For inclusion level 5%, use 0.05, and for 100% use 1.</Text>
              {/* <Controller control={control} name={"name"} rules={{required: true}} 
                render={({ field: { value } }) => (
                  <TextInput value={composition["name"]} editable={false} style={{backgroundColor: "rgba(10, 100, 10, 0.8)", paddingLeft: 100, color: "white"}} />  
                )}
              /> */}
              {/* <Controller control={control} name={"name"} rules={{required: true}} 
                render={({ field: { value } }) => (
                  value ? null :
                  <TextInput value={composition["name"]} editable={false} style={{paddingLeft: 100, color: "white"}} />
                )}
              /> */}
              {errors.name && (
                <Text style={{ color: 'red' }}>This is required.</Text>
              )}

              {factors && factors.length!==0 && factors.map((key) => (
                <View key={key.data_field}>
                  <View style={{
                    flexDirection: 'row', alignItems: 'center',  marginBottom: 10,
                  }}
                  >
                    <Text style={{ flex: 2, fontSize: 18, fontWeight: '400', paddingRight: 10}}>{key.name}</Text>
                    {/* <View style={{ flex: 2, flexDirection: "column" }}>
                      <Text style={{ fontSize: 18, fontWeight: '400', }}>{key.name}</Text>
                      <Text style={{color: "red", fontSize: 12}}>Default: {composition[key.data_field] || null}</Text>
                    </View> */}
                    <Controller control={control} name={key.api_reference} rules={{required: true}} 
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={{ flex: 3, fontSize: 14, height: 35 }}
                        dense keyboardType="numeric" mode="outlined"
                        onChangeText={(value) =>
                          handleTextInputChange(key.api_reference, value)
                        }
                        onBlur={() => handleTextInputBlur(key.api_reference)}
                        value={value}
                      />
                      )}
                    />
                  </View>
                  {errors[key.api_reference] && (
                    <Text style={{ color: 'red' }}>This is required.</Text>
                  )}

                </View>
              ))}

            </Card.Content>

            <Card.Actions>
              <PaperButton textColor="rgb(10, 100, 10)"
                onPress={() => setSelect(false)}
                style={{ marginRight: 10 }}
              >
                {t("close")}
              </PaperButton>

              {added ? (
                <>
                  <PaperButton 
                    mode="contained" buttonColor="rgb(200, 10, 10)"
                    onPress={handleSubmit(handleRemove)} style={{ marginRight: 10 }}>
                    {t("remove")}
                  </PaperButton>
                  <PaperButton 
                    mode="contained" buttonColor="rgb(10, 100, 10)"
                    onPress={handleSubmit(handleUpdate)}>
                    {t("update")}
                  </PaperButton>
                </>
              ) : (
                <PaperButton buttonColor="rgb(10, 100, 10)" onPress={handleSubmit(handleAdd)}>
                  {t("add")}
                </PaperButton>
              )}
            </Card.Actions>
          </>
        </Card>
      ) : null}

      {/* {Object.keys(selectedFeedData).length!==0 && selectedFeedData.ingredients.length!==0 && selectedFeedData.ingredients.map((i, index) => (
        <Text key={index}>
          {"\n"} {JSON.stringify(i)} {" \n "}
        </Text>
      ))} */}

    </View>
  )
}

const PremIngredientInputs = () => {
  const { t } = useTranslation();
  const selectedSpecies = useSelector(selectSpecies)
  const { ingredients } = useIngredientSelector(selectedSpecies)
  const selectedFeedData = useSelector(selectFeedFormulationData)
  const [catItems, setCatItems] = useState(0)

  const [feedsPage, setFeedsPage] = useState(1);
  const [catData, setCatData] = useState([])
  const [selectedItemsByPage, setSelectedItemsByPage] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    if (ingredients !== null && ingredients !== "undefined" && ingredients.length !== 0 && feedsPage !== 0) {
      setCatData(ingredients[feedsPage - 1]);
      // Reset selected items when switching pages
      setCatItems(selectedItemsByPage[feedsPage] || 0);
    }
  }, [feedsPage, ingredients]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {catData && catData.length!==0 ?
      <ScrollView>
      <View style={{ backgroundColor: 'rgb(10, 100, 10)', borderRadius: 5, padding: 10, marginBottom: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 28, paddingLeft: 15, color: 'white', alignSelf: "center" }}>{t("select fodders")}</Text>
        <Text style={{ fontWeight: 'light', fontSize: 14, paddingLeft: 15, color: 'white', alignSelf: "center" }}>
          {t("your animal")}: {t(selectedSpecies)}
        </Text>
      </View>

      <View>
        {catData.data.map((i) => (
          <View key={i}>
            <IngredientAddor ingredient={i} setCatItems={setCatItems}/>
          </View>
        ))}
      </View>

    </ScrollView>
    : <Text>Loading Other Data</Text>}

      {/* <Text>You have selected {catItems} from this category.</Text> */}

      <Button
        onPress={() => navigation.navigate('Prem Results')}
        title={t("next")} color="rgb(10, 100, 10)"
        style={{ backgroundColor: 'rgb(10, 100, 10)', borderRadius: 50, padding: 20 }}
        disabled={catItems<2}
      />

      {/* {Object.keys(selectedFeedData).length!==0 && Object.keys(selectedFeedData).map((i) => (
        <Text key={i}>
          {i} {": \n"} {JSON.stringify(selectedFeedData[i])} {" \n "}
        </Text>
      ))} */}

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
