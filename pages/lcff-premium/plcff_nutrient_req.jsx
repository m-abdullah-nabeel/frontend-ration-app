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
import { setNutrientRequirements, selectFeedFormulationData, resetAnimalInput } from "../../redux/animalInputSlice";
import useAnimalReqFactor from "../lcff_data/nutrient_factors_data_hook";

import { useForm, Controller } from 'react-hook-form';
import { Button as ButtonNative, TextInput as TextInputNative } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { IconButton, Text as PaperText } from 'react-native-paper';

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
  const selectedSpecies = useSelector(selectSpecies);
  const selectedFeedData = useSelector(selectFeedFormulationData)
  const { nutrientInput, factors, getNutriReq } = useAnimalReqFactor(selectedSpecies)
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, formState: { errors, isValid, isDirty } } = useForm();
  const [requirements, setRequirements] = useState([])

  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    const { BW, animal, ...filteredRequirements }  = getNutriReq(selectedSpecies, data)
    // alert(getNutriReq(selectedSpecies, data))
    setRequirements(filteredRequirements)
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <View style={{ backgroundColor: 'rgb(10, 100, 10)', borderRadius: 5, padding: 10, marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 28, paddingLeft: 15, color: 'white', alignSelf: "center" }}>{t("pre-requirement-statement")}</Text>
          <Text style={{ fontWeight: 'light', fontSize: 14, paddingLeft: 15, color: 'white', alignSelf: "center" }}>
            {t("your animal")}: {t(selectedSpecies)}
          </Text>
        </View>

        <View style={{justifyContent: "center", width: "100%"}}>
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

          <Button buttonColor='rgb(10, 100, 10)' mode="contained" onPress={handleSubmit(onSubmit)}>Load Nutrient Requirements</Button>
        </View>

        {Object.keys(requirements).length==0 || factors.length==0 ? null:
        <NutrientInput factors={factors} requirements={requirements}/>}

      </View>
    </ScrollView>
  )
}

export default PremNutrientsRequired;

const NutrientInput = ({factors, requirements}) => {
  const { control, handleSubmit, setValue, trigger, formState: { errors, isValid, isDirty } } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleTextInputChange = (fieldName, value) => {
    console.log(`Field ${fieldName} changed to: ${value}`);
    setValue(fieldName, value);
  };
  
  const handleTextInputBlur = (fieldName) => {
    console.log(`Field ${fieldName} blurred`);
    trigger(fieldName);
  };
  
  useEffect(() => {
    const fetchDefaultValues = async (data) => {
      factors.map((val) => {
        setValue(val.api_reference, (requirements[val.data_field]))
      })
    };
  
    if (factors && factors.length!==0 ) {
      fetchDefaultValues();
    }
  }, [requirements]);

  const handleSubmitUpdated = (data) => {
    // alert(JSON.stringify(data))
    dispatch(resetAnimalInput())
    dispatch(setNutrientRequirements(data))
    navigation.navigate('Prem Ingredient Inputs')
  };

  const addFactor = (data) => {
    alert("You can add more nutrients.\nComing soon!")
  }

  return (
    <View>
      {/* <Text>{JSON.stringify(factors)}</Text> */}
      {factors && factors.length!==0 && factors.map((key) => {
        return (
          <View key={key.name}>
            <View style={{
                flexDirection: 'row', alignItems: 'center',  marginBottom: 10,
              }}
            >
              <Text style={{ width: '40%', fontSize: 18, fontWeight: '400', }}>{key.name}</Text>
              <Controller control={control} name={key.api_reference} rules={{required: true}} 
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput style={{ width: '60%', fontSize: 14, height: 35 }}
                  dense mode="outlined" inputmode="decimal" keyboardType="numeric" maxLength={10} textAlign="right"
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
        )
      })}

      <IconButton
        icon="plus"
        mode="outlined"
        iconColor={"black"}
        size={30} disabled={!isValid}
        onPress={handleSubmit(addFactor)}
      />

      <Button
        mode="contained" buttonColor='rgb(10, 100, 10)'
        onPress={handleSubmit(handleSubmitUpdated)}
        // disabled={!isValid}
        title="Submit"
      >
        Submit
      </Button>

    </View>

  )
}
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
