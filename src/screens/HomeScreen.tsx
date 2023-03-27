import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native'
import { save } from '../components/SecureStorageFunctions';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/slicers/loginSlice';

const HomeScreen = () => {
    const dispatch = useAppDispatch();

    const handleOnPress = () => {
        save({key: 'key', value: ''});
        dispatch(logout());    
    }

    return ( 
        <View>
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={handleOnPress}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
     );
}
 
export default HomeScreen;