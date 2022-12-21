import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox";


const Item = ({ navigation, name, image }) => {
    path = '../assets/animals/cow.png'
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Stuff Selector', {
                    animal: name,
                });
            }}
        >
            <View style={styles.animal}>
                <Text style={{
                    fontSize: 24, fontWeight: 'bold'
                }}>
                    {name}
                </Text>
                <Image
                    source={require('../assets/animals/cow.png')}
                />
            </View>
        </TouchableOpacity>
    )
}

const FeedItem = ({ title, feedstuff, setFeedstuff }) => {
    return (
        <View style={styles.item}>
            <BouncyCheckbox
                size={25}
                fillColor="rgb(100, 10, 10)"
                unfillColor="#FFFFFF"
                text={title}
                iconStyle={{ borderColor: "rgb(100, 10, 10)" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{
                    textDecorationLine: "none",
                }}
                onPress={(isChecked) => {
                    if (isChecked) {
                        setFeedstuff([...feedstuff, title])
                    }
                    if (!isChecked) {
                        setFeedstuff(feedstuff.filter(a => a !== title))
                    }
                }}
            />

        </View>
    )
};

const styles = StyleSheet.create({
    animal: {
        backgroundColor: "rgba(25, 0, 200, .5)",
        borderRadius: 20,
        padding: 20,
        margin: 10,
        borderColor: 'black',
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    item: {
        backgroundColor: "#fff",
        padding: 20,
        marginVertical: 8,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 14
    }

})

export default Item;
export { FeedItem };
