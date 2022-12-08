import React from "react";
import { View, Text, Button} from "react-native"
import PagerView from 'react-native-pager-view';

function DetailsScreen({ navigation }) {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details of Formulated Feed</Text>
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