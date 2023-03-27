import React, {useEffect} from 'react';
import { RootTabNavigator } from './RootTabNavigator';
import { LoginStackNavigator } from './LoginStackNavigator';
import { useAppSelector } from '../redux/hooks';
import { getValueFor } from '../components/SecureStorageFunctions';

const RootNavigation = () => {

    const loginKey = useAppSelector((state) => state.login.value);
  
    console.log(loginKey);

    return (
        <>
            {loginKey !== '' ?
                <RootTabNavigator></RootTabNavigator> :
                <LoginStackNavigator></LoginStackNavigator>
            }
        </>
    );
}

export default RootNavigation;