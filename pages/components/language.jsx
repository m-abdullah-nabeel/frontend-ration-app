import React, { useState } from "react";
import { View, StyleSheet } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import '../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

const data = [
    { label: 'English', value: 'en' },
    { label: 'اردو', value: 'ur' },
];

const LanguageChanger = () => {
    const { t, i18n } = useTranslation();
    const [value, setValue] = useState('ur');
    const [isFocus, setIsFocus] = useState(false);
    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => setValue(value))
            .catch(err => console.log(err));
    };

    return (
        <View>
            <View style={[styles.container, { width: 100 }]}>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }, { backgroundColor: 'orange', height: 50 }]}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={data}
                    labelField="label"
                    valueField="value"
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setIsFocus(false);
                        changeLanguage(item.value)
                    }}
                    renderLeftIcon={() => (
                        <MaterialIcons
                            style={styles.icon}
                            color={isFocus ? 'brown' : 'rgb(10, 120, 10)'}
                            name="language"
                            size={20}
                        />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontSize: 12,
        textAlign: 'center'
    },
});

export default LanguageChanger;
