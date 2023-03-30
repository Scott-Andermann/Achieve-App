import * as React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { useAppDispatch } from '../redux/hooks';
import GradientButton from '../components/GradientButton';
import { save } from '../components/SecureStorageFunctions';
import { logout } from '../redux/slicers/loginSlice';

const screenWidth = Dimensions.get('window').width;

const ProfileScreen = ({navigation}: {navigation: any}) => {

    const dispatch = useAppDispatch()

    const handleLogout = async () => {
        save({key: 'userId', value: ''});
        dispatch(logout());    
    }


    return ( 
        <View style={styles.container}>
            <Text>Settings</Text>
            <GradientButton text='Log Out' onPress={handleLogout} />
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'center',
        padding: screenWidth * 0.15,
    },
})
 
export default ProfileScreen;