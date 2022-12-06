import React from "react";
import { View, Text, Button} from "react-native"
import PagerView from 'react-native-pager-view';

function DetailsScreen({ route, navigation }) {
    // const { animal } = route.params;
    // The above statement will cause an error, if this page is opened from settings screen
    // because from settings screeen, currently, it has no route input
    const animal = 'handle route.params from settings';

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details of Animal / birds</Text>
        <Text>This will contain a form of age, weigh and production</Text>
        <Text>Animal: {JSON.stringify(animal)}</Text>
        {/* <Button
            title="Go to Home"
            onPress={() => navigation.goBack()}
        /> */}
      </View>
    );
}

export default DetailsScreen;