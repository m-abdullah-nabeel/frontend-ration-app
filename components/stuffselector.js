import React from "react";
import { View, Text, Button } from "react-native";

const StuffSelector = ({route, navigation}) => {
    const { animal } = route.params;
    return (
        <View>
            <Text>
                Select FeedStuffs
            </Text>

            <Button
            onPress={() => {
                // alert(JSON.stringify(navigation))
                navigation.navigate('Details');        
            }}
            title="Go"
            color="#841584"
            accessibilityLabel="Go to sibling"
            />

            <Text>Details of Animal / birds</Text>
            <Text>This will contain a form of age, weigh and production</Text>
            <Text>Animal: {JSON.stringify(animal)}</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.goBack()}
            />

        </View>
    )
}

export default StuffSelector;
