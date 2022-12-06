import React from "react";
import { View, Text } from "react-native"

function Settings() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings</Text>
        <Text>Saved Formulas</Text>
        <Text>Share Formulas</Text>
        <Text>Contact University</Text>
        <Text>Developer</Text>
        <Text>Info about Feed Stuffs</Text>
      </View>
    );
}

export default Settings;