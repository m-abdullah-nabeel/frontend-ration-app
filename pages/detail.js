import React from "react";
import { View, Text, Button} from "react-native"

function DetailsScreen({ navigation, route }) {
    const { stock } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details of Formulated Feed</Text>
        <Text></Text>
        {/* <Text>{JSON.stringify(stock)}</Text> */}
        <Text>Selected feed stuffs are</Text>
        <View>{stock.map((x)=>{
          return <Text>{x}</Text>
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