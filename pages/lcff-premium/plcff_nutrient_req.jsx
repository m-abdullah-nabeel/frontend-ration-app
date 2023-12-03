import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Alert, Modal, Pressable } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { setSpecies, selectSpecies } from "../../redux/speciesSlice"; 
import { setNutrientRequirements, selectFeedFormulationData } from "../../redux/animalInputSlice";
import useAnimalReqFactor from "../lcff_data/nutrient_factors_data_hook";

import { useForm, Controller } from 'react-hook-form';
import { Button as ButtonNative, TextInput as TextInputNative } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';

const DropdownCom = ({ factorData, setValue }) => {
  const { t } = useTranslation();
  const [localValue, setLocaclValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const placeholderText = t(factorData.name) + " (" + t(factorData.dataUnit) + ") "

  const renderLabel = () => {
    if (localValue || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'rgb(130, 30, 1)', fontWeight: '700' }]}>
          {/* {t(factorData.name)} */}
          {placeholderText}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={{ width: '100%', margin: 1 }}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'rgb(130, 30, 1)' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={factorData.data}
        search
        maxHeight={500}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholderText : '...'}
        searchPlaceholder={`Search in ${factorData.name}`}
        value={localValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setLocaclValue(item.value);
          setValue(factorData.name, item.value)
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'rgb(130, 30, 1)' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  )
}

const PremNutrientsRequired = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedSpecies = useSelector(selectSpecies);
  const selectedFeedData = useSelector(selectFeedFormulationData)
  const { nutrientInput, factors, getNutriReq } = useAnimalReqFactor(selectedSpecies)
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, formState: { errors, isValid, isDirty } } = useForm();

  const [formData, setFormData] = useState([])
  const [requirements, setRequirements] = useState([])

  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    setFormData(data)
    const { bodyweight, animal, ...filteredRequirements }  = getNutriReq(selectedSpecies, data)
    // alert(getNutriReq(selectedSpecies, data))
    setRequirements(filteredRequirements)
  };

  const handleInputChange = (text, key) => {
    setRequirements((prevData) => ({ ...prevData, [key]: text }));
  };

  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  const isFormValid = () => {
    return Object.values(requirements).every(
      (value) => value.trim() !== '' && isNumeric(value)
    );
  };

  const handleSubmitUpdated = () => {
    if (isFormValid()) {
      // Do something with the valid form data
      console.log('Form is valid:', requirements);
      // alert('Form is valid:' + JSON.stringify(requirements));
      dispatch(setNutrientRequirements(requirements))
    } else {
      // Handle validation error
      console.log('Form is not valid. Please fill in all fields with numeric values.');
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
        <Text>Choose Animal Requiremnents</Text>
        <Text style={[{ fontSize: 18, fontWeight: 'bold' }]}>
          {t("your animal")} {t(selectedSpecies)}
        </Text>
        <View style={{width: "100%"}}>
          {nutrientInput.map((factor) => (
            <View key={factor.id}>
              <Controller
                control={control}
                render={({ field }) => (
                  <View>
                    {/* <Text>{factor.name}</Text> */}
                    <DropdownCom
                      factorData={factor}
                      
                      setValue={setValue} 
                    />
                    {errors.factor && <Text style={{ color: 'red' }}>{errors.factor.message}</Text>}
                  </View>
                )}
                name={factor.name}
                rules={{ required: `${t(factor.name) + t("is required")} ` }}
              />
              <Text style={{ color: 'red' }}>{errors[factor.name]?.message}</Text>
            </View>
          ))}

          <Button mode="contained" onPress={handleSubmit(onSubmit)}>Load Nutrient Requirements</Button>
        </View>

        <View>
          {Object.keys(requirements).length === 0 ? (
            <Text>Please select factors above to load basic requirements</Text>
          ) : (
            Object.keys(requirements).map((i) => (
              <View key={i} style={{ marginBottom: 1 }}>
                <View style={{
                  flexDirection: "row", alignItems: "center", justifyContent: "flex-start"
                }}>
                  <Text style={{ width: "30%" }}>{i}</Text>
                  <View style={{ width: "70%" }}>
                    <TextInput
                      style={{ width: 300, }}
                      mode="outlined"
                      label={i}
                      value={requirements[i]}
                      onChangeText={(text) => handleInputChange(text, i)}
                      keyboardType="numeric"
                      dense
                    />
                    <HelperText type="error" visible={!isNumeric(requirements[i])}>
                      Value must be a number.
                    </HelperText>
                  </View>
                </View>

              </View>
            ))
          )}
          {Object.keys(requirements).length > 0 && (
            <Button
              mode="contained"
              onPress={handleSubmitUpdated}
              disabled={!isFormValid()}
              title="Submit"
            >
              Submit
            </Button>
          )}

          <Text>
            Following is current data
          </Text>
          {Object.keys(selectedFeedData).length!==0 && Object.keys(selectedFeedData).map((i) => (
            <Text key={i}>
              {i} {": \n"} {JSON.stringify(selectedFeedData[i])} {" \n "}
            </Text>
          ))}    
          <Button onPress={() => navigation.navigate('Prem Ingredient Inputs')}> 
            Next Page
          </Button>    
        </View>

      </View >
    </ScrollView>
  )
}

export default PremNutrientsRequired;

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})
