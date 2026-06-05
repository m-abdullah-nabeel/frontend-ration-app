import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

import { Button as ButtonPaper } from 'react-native-paper';
import { Avatar, Card, Text as TextPaper } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import { useTranslation } from 'react-i18next';

import useLifeStageData from './stages_data_hook';

const before_weaning_pic = require('../../assets/images/before-weaning.jpeg');
const after_weaning_pic = require('../../assets/images/after-weaning.jpg');
const faroff_dry_pic = require('../../assets/images/faroff_dry.jpg');
const closeup_dry_pic = require('../../assets/images/closeup.jpg');

const stages_of_cattle_data = {
    before_weaning: { 
      label: 'Before Weaning', value: 'before_weaning', picture: before_weaning_pic,
      description: "before_weaning_desc"
     },
    after_weaning: { 
      label: 'After Weaning', value: 'after_weaning', picture: after_weaning_pic,
      description: "after_weaning_desc"
     },
    faroff_dry: { 
      label: 'Faroff Dry Period', value: 'faroff_dry', picture: faroff_dry_pic,
      description: "faroff_dry_desc"
     },
    closeup_dry: { 
      label: 'Closeup Dry Period', value: 'closeup_dry', picture: closeup_dry_pic,
      description: "closeup_dry_desc"
     }
}

const FixedFormulaInputs = ({ route, navigation }) => {
  const { breed_data, weight_data, formula_type } = useLifeStageData();
  // get a list of inputs
    const { stage, animal } = route.params;
    console.log(stage, animal, stage_data)
    const stage_data = stages_of_cattle_data[[stage.stage]]
    console.log(stage_data)
    const picture = stage_data.picture

    const [breed, setBreed] = useState(null);
    const [weight, setWeight] = useState(null);
    const [feed, setFeed] = useState(null);
  
    const [complete, setComplete] = useState(false)

    const [filtered_wt_data, setFiltered_wt_Data] = useState([{ label: "Please Select a Breed First", value: null }])
    // const [filtered_wt_data, setFiltered_wt_Data] = useState([{ label: "Please Select a Breed First", value: null }])
  
    const { t, i18n } = useTranslation();

    useEffect(() => {
      if (stage.stage=='before_weaning') {
        // Only check weight and breed
        if (weight === null || breed === null || weight === undefined || breed === undefined) {
          setComplete(false);
        } else {
          setComplete(true);
        }
      } else {
        // Check all three states
        if (weight === null || breed === null || feed === null || weight === undefined || breed === undefined || feed === undefined) {
          setComplete(false);
        } else {
          setComplete(true);
        }
      }
    }, [stage, breed, weight, feed]);
  
    useEffect(()=>{
      if (breed !== null && stage !==null) {
        console.log("Valid Data")
        let data_item = weight_data[[stage.stage]]
        console.log(data_item[[breed]])
        setFiltered_wt_Data(data_item[[breed]])  
      } else {
        console.log("Invalid Data")
        return;
      }
    }, [breed])
  
    const handleSubmit = () => {
      console.log(animal, stage, breed, weight, feed)
      navigation.navigate('Life Stages Formulas', { 
        stage:{stage},
        animal:{animal},
        breed: {breed},
        weight: {weight},
        feed: {feed}
     })
    }

    function translateBreedData(breed_data, t) {
      return breed_data.map(item => ({
        label: t(item.label),
        value: item.value,
      }));
    }
    
    function translateFormulaType(formula_type, t) {
      return formula_type.map(item => ({
        label: t(item.label),
        value: item.value,
      }));
    }
    const translatedBreedData = translateBreedData(breed_data, t);
    const translatedFormulaType = translateFormulaType(formula_type, t);
        
    return (
        <ScrollView>
          <Card mode='outlined' style={{marginHorizontal: 15}}>
            <Card.Cover source={picture} />
            <Card.Content>
              {/* <Card.Title title={stage_data.label} titleVariant='headlineMedium' titleStyle={{fontWeight: "bold", alignSelf: "center"}}/> */}
              <TextPaper style={{fontWeight: "bold", textAlign: "center", padding: 5}} variant="titleLarge">{t(`${stage_data.label}`)}</TextPaper>
            <TextPaper style={{textAlign: "center"}}>
            {t(`${stage_data.description}`)}
              {}
            </TextPaper>

            </Card.Content>
          </Card>
          <View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={translatedBreedData}
              maxHeight={400}
              labelField="label"
              valueField="value"
              placeholder={t("Select Breed")}
              value={breed}
              onChange={item => {
                setBreed(item.value);
                setWeight(null)
              }}
              renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
              )}
            />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={filtered_wt_data}
              search
              maxHeight={400}
              labelField="label"
              valueField="value"
              placeholder={t("Select Weight")}
              searchPlaceholder="Search..."
              value={weight}
              onChange={item => {
                setWeight(item.value);
              }}
              renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
              )}
            />
            {
              stage && stage.stage!=='before_weaning' ?
              <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={translatedFormulaType}
              search
              maxHeight={400}
              labelField={t("label")}
              valueField="value"
              placeholder={t("Select Major Feedstuff")}
              searchPlaceholder={t("search")}
              value={feed}
              onChange={item => {
                setFeed(item.value);
              }}
              renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
              )}
            />
                : null
            }

            <ButtonPaper style={{margin: 15}}
              icon="send" mode="contained" 
              disabled={!complete}
              onPress={handleSubmit}
              buttonColor="rgba(10, 60, 10, 1)"
            >
              {complete?<>{t("Next")}</>:<>{t("Please fill all inputs above")}</>}
            </ButtonPaper>

          </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});


export default FixedFormulaInputs