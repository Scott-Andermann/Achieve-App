import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { RootTabNavigator } from './RootTabNavigator';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import AppLoadingScreen from '../screens/AppLoadingScreen';
import { setNotLoading } from '../redux/slicers/isLoadingSlice';
import { getValueFor } from '../components/SecureStorageFunctions';
import { login } from '../redux/slicers/loginSlice';
import SignUpScreen from '../screens/SignUpScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';


export type StackParamList = {
    Login: undefined;
    Home: undefined;
    Create: undefined;
    Find: undefined;
    Profile: undefined;
    Tab: undefined;
    Register: undefined;
    ResetPassword: undefined;
}

const Stack = createNativeStackNavigator<StackParamList>();

export const LoginStackNavigator = () => {
    const isLoading = useAppSelector(state => state.isLoading.value);
    const userToken = useAppSelector(state => state.login.value);

    const dispatch = useAppDispatch();


    useEffect(() => {
        const getLoginKey = async () => {
            const loginKey = await getValueFor('key');
            dispatch(login(loginKey));
        }
        getLoginKey();
        setTimeout(() => {
            dispatch(setNotLoading());
        }, 2000)
    }, []);

    console.log(userToken);


    if (isLoading) {
        return <AppLoadingScreen />
    }

    return (

        <NavigationContainer>
            <Stack.Navigator>
                {userToken === '' ?
                    <>
                        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                        <Stack.Screen name="Register" options={{ headerShown: false }} component={SignUpScreen} />
                        <Stack.Screen name="ResetPassword" options={{ headerShown: false }} component={ResetPasswordScreen} />
                    </> :
                    <Stack.Screen name="Tab" options={{ headerShown: false }} component={RootTabNavigator} />
                }
                {/* <Stack.Screen name='Home' component={HomeScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}