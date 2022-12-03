import React from "react";
import { View, Text, Button} from "react-native"

function DetailsScreen({ route, navigation }) {
    const { animal } = route.params;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details of Animal / birds</Text>
        <Text>This will contain a form of age, weigh and production</Text>
        <Text>Animal: {JSON.stringify(animal)}</Text>
        <Button
            title="Go to Home"
            onPress={() => navigation.goBack()}
        />
      </View>
    );
}

export default DetailsScreen;