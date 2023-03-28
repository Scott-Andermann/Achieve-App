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
import { setUserInfo } from '../redux/slicers/userInfoSlice';
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
        const autoLogin = async (userId: string) => {
            const body = { email: '', password: '', userId: userId }
            const response = await fetch('http://localhost:5000/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
            const result = await response.json();
            return result
        }

        const getUserToken = async () => {
            const userId = await getValueFor('userId');
            const result = await autoLogin(userId);
            if (result['status'] === 'success') {
                dispatch(login(userId));
                dispatch(setUserInfo({
                    userId: result['userId'],
                    email: result['email'],
                    firstName: result['firstName'],
                    lastName: result['lastName'],
                    password: result['password'],
                    location: result['location']
                }))
            }
            
        }

        getUserToken();
        setTimeout(() => {
            dispatch(setNotLoading());
        }, 2000)
    }, []);

    // console.log(userToken);


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