import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useSelector, useDispatch } from 'react-redux'
import { add, remove } from '../states/stock'
const Item = ({ navigation, name }) => {
    return (
        <TouchableOpacity 
            onPress={() => {
            navigation.navigate('Stuff Selector', {
                animal: name,
            });        
            }}
        >
            <View style={styles.animal}>
                {/* <Text>{'image of animal'}</Text> */}
                <Text>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const FeedItem = ({ title, feedstuff, setFeedstuff }) => {
    const count = useSelector((state) => state.stock)
    const dispatch = useDispatch()
    
    return (
        <View style={styles.item}>
            {/* <BouncyCheckbox/> */}
            <BouncyCheckbox
            size={25}
            fillColor="red"
            unfillColor="#FFFFFF"
            text={title}
            // textComponent={<Text>{title}</Text>}
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{
                textDecorationLine: "none",
            }}          
            onPress={(isChecked) => {
                // console.log(isChecked)
                if (isChecked) {
                    // alert("adding " + title)
                    setFeedstuff([...feedstuff, title])
                    // redux alternatve
                    dispatch(add(title))
                    // console.log(feedstuff)
                }
                if (!isChecked) {
                    // alert("removing " + title)
                    setFeedstuff(feedstuff.filter(a => a!==title))
                    // console.log(feedstuff)
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
export {FeedItem};
