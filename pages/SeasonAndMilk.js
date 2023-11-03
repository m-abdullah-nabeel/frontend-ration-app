import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';

import { Avatar, Card, Text as TextPaper, Button as ButtonPaper } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const animal_data = [
  { label: 'Cattle', value: 'Cattle' },
  { label: 'Buffalo', value: 'Buffalo' }
];

const milk_data = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
]

const weight_data = {
  Cattle: [
      { label: '350', value: 350 },
      { label: '400', value: 400 },
      { label: '450', value: 450 }
    ],
  Buffalo: [
        { label: '500', value: 500 },
        { label: '600', value: 600 },
    ]
};

const season_data = [
  { label: 'Winter', value: 'Winter' },
  { label: 'Summer', value: 'Summer' }
]

const feed_data = {
  Summer: [
      { label: 'Sorghum based', value: 'Sorghum based' },
      { label: 'Maize based', value: 'Maize based' },
      { label: 'Maize Silage based', value: 'Maize Silage based' }
    ],
    Winter: [
        { label: 'Alfalfa and wheat straw based', value: 'Alfalfa and wheat straw based' },
        { label: 'Barseem and wheat straw based', value: 'Barseem and wheat straw based' },
        { label: 'Maize Silage based', value: 'Maize Silage based' }
      ]
}


const SeasonAndMilk = ({ route, navigation }) => {
    const { t } = useTranslation();
    const [animal, setAnimal] = useState(null);
    const [weight, setWeight] = useState(null);
    const [feed, setFeed] = useState(null);
    const [milk, setMilk] = useState(null);
    const [season, setSeason] = useState(null)

    const [complete, setComplete] = useState(false)
  
    const [filtered_wt_data, setFiltered_wt_Data] = useState([{ label: 'Please Select a Breed First', value: null }])
    const [filtered_season_data, setFiltered_season_Data] = useState([{ label: 'Please Select a Season First', value: null }])

    useEffect(()=>{
      if (
        animal === null ||
        weight === null ||
        feed === null ||
        milk === null ||
        season === null ||
        animal === undefined ||
        weight === undefined ||
        feed === undefined ||
        milk === undefined ||
        season === undefined
      ) {
        setComplete(false)
        console.log(animal, weight, feed, milk, season)
      } else { setComplete(true) }

    }, [animal, weight, feed, milk, season])

    useEffect(()=>{
      if (animal !== null) {
        console.log("Valid Data")
        let data_item = weight_data[[animal]]
        setFiltered_wt_Data(data_item)  
      } else {
        console.log("Invalid Data")
        return;
      }
    }, [animal])

    useEffect(()=>{
      if (season !== null) {
        console.log("Valid Data")
        let data_item = feed_data[[season]]
        setFiltered_season_Data(data_item)  
      } else {
        console.log("Invalid Data")
        return;
      }
    }, [season])

    // let bw = animalData['Body Weight']
    // let mp = animalData['Milk Production']
    // let sp = animalData['species']
    // let ss = animalData['Main Fodder']


    const handleSubmit = () => {
      console.log(animal, weight, feed, milk, season)
      console.log({
        'species':{animal},
        'Body Weight': {weight},
        'Main Fodder': {feed},
        'Milk Production': {milk},
        'Season': {season}
      })
      navigation.navigate('Fixed Formula Display', { 
        "details": {
          'species':{animal},
          'Body Weight': {weight},
          'Main Fodder': {feed},
          'Milk Production': {milk},
          'Season': {season}
        }
        
     })
    }

    return (
        <ScrollView>
          <View>
            <Card mode="outlined" style={{marginHorizontal: 15}}>
              <Card.Cover source={require("../assets/images/summerFeed.jpg")} />
              <Card.Content>
                <Card.Title title={t('Seasonal Feed Optimizer')} titleVariant='headlineSmall' titleStyle={{fontWeight: "bold", alignSelf: "center"}}/>
                <TextPaper>
                Pre-formulated recipies based on season, seasonal fodders animal body weight and milk production.
                </TextPaper>
              </Card.Content>
            </Card>

          </View>
            <View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={animal_data}
                maxHeight={400}
                labelField="label"
                valueField="value"
                placeholder="Select Animal / Species"
                value={animal}
                onChange={item => {
                  setAnimal(item.value);
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
                placeholder="Select Weight"
                searchPlaceholder="Search..."
                value={weight}
                onChange={item => {
                  setWeight(item.value);
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
                data={milk_data}
                search
                maxHeight={400}
                labelField="label"
                valueField="value"
                placeholder="Select Milk Production"
                searchPlaceholder="Search..."
                value={milk}
                onChange={item => {
                  setMilk(item.value);
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
                data={season_data}
                search
                maxHeight={400}
                labelField="label"
                valueField="value"
                placeholder="Select Season"
                searchPlaceholder="Search..."
                value={season}
                onChange={item => {
                  setSeason(item.value);
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
                data={filtered_season_data}
                search
                maxHeight={400}
                labelField="label"
                valueField="value"
                placeholder="Select Major Seasonal Feedstuff"
                searchPlaceholder="Search..."
                value={feed}
                onChange={item => {
                  setFeed(item.value);
                }}
                renderLeftIcon={() => (
                  <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                )}
              />

              <ButtonPaper 
              style={{margin: 15}} icon="send" 
              buttonColor="rgba(10, 60, 10, 1)"
              mode="contained" disabled={!complete}
              onPress={handleSubmit}
              >
                {complete?"Next": "Please fill all above fields."}
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


export default SeasonAndMilk