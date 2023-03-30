import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Text, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const DatePicker = ({date, setDate}: {date: Date, setDate: Dispatch<SetStateAction<Date>>}) => {
    const [show, setShow] = useState<boolean>(false);

    const onChange = (event: any, selectedDate: Date) => {
        const currentDate = selectedDate;
        setShow(false);
        if (selectedDate !== undefined) {
            setDate(currentDate);
        }
    };

    const showDatepicker = () => {
        setShow(true);
    };

    var d = new Date(Date.now());
    d.setDate(d.getDate() - 12);

    return (
        <TouchableOpacity style={styles.inputWrapper} onPress={showDatepicker}>
            {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
            {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
            <FontAwesome5Icon name={'calendar-day'} size={20} color={'rgba(190,190,190,1)'} style={{paddingLeft: 16, paddingRight: 12}}/>
            <Text style={styles.inputField}>{date.toLocaleDateString()}</Text>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    onChange={(e, date) => date && onChange(e, date)}
                    maximumDate={new Date(Date.now())}
                    minimumDate={d}
                    style={{ width: 320, backgroundColor: 'white' }}
                />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    inputWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(175, 175, 175, 0.5)',
        width: '100%',
        height: 50,
        borderRadius: 25,
        marginTop: 6,
        marginBottom: 6,
    },
    inputField: {
        position: 'relative',
        fontSize: 16,
        color: 'white',
    }
})
 

export default DatePicker;