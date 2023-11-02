import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

import { Button as ButtonPaper } from 'react-native-paper';
import { Avatar, Card, Text as TextPaper } from 'react-native-paper';

const breed_data = [
  { label: 'Local Breed', value: 'local' },
  { label: 'Imported Breed', value: 'imported' }
];

const weight_data = {
  before_weaning: {
    local: [
      { label: '20', value: 20 },
      { label: '25', value: 25 },
      { label: '30', value: 30 }
    ],
    imported: [
      { label: '40', value: 40 },
      { label: '50', value: 50 },
      { label: '60', value: 60 },
      { label: '70', value: 70 },
      { label: '80', value: 80 }
    ]
  },
  after_weaning: {
    local: [
      { label: '40', value: 40 },
      { label: '60', value: 60 },
      { label: '80', value: 80 },
      { label: '100', value: 100 },
      { label: '130', value: 130 },
      { label: '160', value: 160 },
      { label: '190', value: 190 }
    ],
    imported: [
      { label: '100', value: 100 },
      { label: '150', value: 150 },
      { label: '200', value: 200 },
      { label: '250', value: 250 },
      { label: '300', value: 300 },
      { label: '350', value: 350 },
      { label: '400', value: 400 },
      { label: '450', value: 450 },
      { label: '500', value: 500 },
      { label: '550', value: 550 },
      { label: '600', value: 600 }
    ]
  },
  faroff_dry: {
    local: [
      { label: '400', value: 400 },
      { label: '450', value: 450 },
      { label: '500', value: 500 }
    ],
    imported: [
      { label: '600', value: 600 },
      { label: '650', value: 650 },
      { label: '700', value: 700 },
      { label: '750', value: 750 }
    ]
  },
  closeup_dry: {
    local: [
      { label: '400', value: 400 },
      { label: '450', value: 450 },
      { label: '500', value: 500 }
    ],
    imported: [
      { label: '600', value: 600 },
      { label: '650', value: 650 },
      { label: '700', value: 700 },
      { label: '750', value: 750 }
    ]
  },
  milking: {
    local: [
      { label: '350', value: 350 },
      { label: '400', value: 400 },
      { label: '450', value: 450 },
    ],
    imported: [
      { label: '600', value: 600 },
      { label: '650', value: 650 },
      { label: '700', value: 700 },
      { label: '750', value: 750 }
    ]
  }
};

const formula_type = [
  { label: 'Maize fodder based', value: 'maize' },
  { label: 'Sorghum fodder based', value: 'sorghum' },
  { label: 'Barseem fodder based', value: 'barseem' },
  { label: 'Alfalfa fodder based', value: 'alfalfa' },
  { label: 'Corn silage based', value: 'corn' },
];

// repeat from previous page
const before_weaning_pic = require('../assets/images/before-weaning.jpeg');
const after_weaning_pic = require('../assets/images/after-weaning.jpg');
const faroff_dry_pic = require('../assets/images/faroff_dry.jpg');
const closeup_dry_pic = require('../assets/images/closeup.jpg');

const stages_of_cattle_data = {
    before_weaning: { 
      label: 'Before Weaning', value: 'before_weaning', picture: before_weaning_pic,
      description: "Before weaning, young cattle rely on their mother's milk for nourishment and gradually learn to graze and explore their surroundings. This early stage is crucial for their growth and development."
     },
    after_weaning: { 
      label: 'After Weaning', value: 'after_weaning', picture: after_weaning_pic,
      description: "After weaning, nutrition management becomes vital for young cattle as they transition from relying on their mother's milk to consuming solid food. Proper nutrition ensures their continued growth, health, and development, setting the foundation for their future well-being"
     },
    faroff_dry: { 
      label: 'Faroff Dry Period', value: 'faroff_dry', picture: faroff_dry_pic,
      description: 'During the early dry period, often referred to as "faroff," dairy cows are not lactating. Proper nutrition management is crucial at this stage to maintain their body condition and prepare them for the upcoming lactation cycle. Adequate nutrition ensures that cows stay healthy and can produce milk efficiently in the next lactation phase.'
     },
    closeup_dry: { 
      label: 'Closeup Dry Period', value: 'closeup_dry', picture: closeup_dry_pic,
      description: "In the late dry period, known as closeup, dairy cows are on the verge of calving. Nutrition management during this phase is critical to support the cow's health, prepare for the calving process, and ensure a smooth transition into the next lactation cycle. Adequate care and nutrition are essential for both the cow and the calf's well-being."
     }
}

const FixedFormulaInputs = ({ route, navigation }) => {
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

    const [filtered_wt_data, setFiltered_wt_Data] = useState([{ label: 'Please Select a Breed First', value: null }])
  
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

    return (
        <View>
          <Card mode='outlined' style={{marginHorizontal: 15, 
          // backgroundColor: "rgba(10, 100, 10, 0.6)"
        }}>
            <Card.Cover source={picture} />
            <Card.Content>
            {/* <Text>
                Hello Inputs {JSON.stringify(stage)} {JSON.stringify(stage_data)} 
            </Text> */}
            <Card.Title title={stage_data.label} titleVariant='headlineMedium' titleStyle={{fontWeight: "bold", alignSelf: "center"}}/>
            <TextPaper>
              {stage_data.description}
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
                data={breed_data}
                maxHeight={400}
                labelField="label"
                valueField="value"
                placeholder="Select Breed"
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
              {
                stage && stage.stage!=='before_weaning' ?
                <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={formula_type}
                search
                maxHeight={400}
                labelField="label"
                valueField="value"
                placeholder="Select Major Feedstuff"
                searchPlaceholder="Search..."
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
              buttonColor='rgba(10, 60, 10, 1)'
              >
                Next
              </ButtonPaper>

            </View>
        </View>
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