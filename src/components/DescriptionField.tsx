import * as React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const DescriptionField = ({value, setValue, placeholder="Add a short description"}: {value: string, setValue: any, placeholder?: string}) => {
    return (
        <View style={styles.inputWrapper}>
            <TextInput onChangeText={setValue} 
                value={value} 
                placeholder={placeholder} 
                placeholderTextColor={'#FFFFFF'} 
                style={styles.inputField} 
                multiline
                numberOfLines={7}
                maxLength={255}
                textAlignVertical= 'top'
            />
        </View>
     );
}

const styles = StyleSheet.create({
    inputWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(175, 175, 175, 0.5)',
        width: '100%',
        height: 150,
        borderRadius: 25,
        marginTop: 6,
        marginBottom: 6,
        paddingTop: 12,
        paddingLeft: 16,
        paddingBottom: 12,
        paddtingRight: 16,
    },
    inputField: {
        position: 'relative',
        fontSize: 16,
        color: 'white',
    }
})
 
export default DescriptionField;