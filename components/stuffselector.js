import React from "react";
import { View, Text, Button } from "react-native";

const StuffSelector = ({navigation}) => {
    return (
        <View>
            <Text>
                Select FeedStuffs
            </Text>

            <Button
            onPress={() => {
                alert(JSON.stringify(navigation))
                // navigation.navigate('Home', );        
            }}
            title="Go"
            color="#841584"
            accessibilityLabel="Go to sibling"
            />

            <Button
                title="Go to Home"
                onPress={() => navigation.goBack()}
            />

        </View>
    )
}

export default StuffSelector;
