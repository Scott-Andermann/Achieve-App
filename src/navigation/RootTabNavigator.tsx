import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AppLoadingScreen from '../screens/AppLoadingScreen';

export type RootTabParamList = {
    Login: undefined;
    Home: undefined;
    Create: undefined;
    Find: undefined;
    Profile: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>();


export const RootTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
            <Tab.Screen name="Create" component={HomeScreen} />
            <Tab.Screen name="Find" component={HomeScreen} />
            <Tab.Screen name="Profile" component={HomeScreen} />
            {/* <Tab.Screen name="Login" component={HomeScreen} /> */}
        </Tab.Navigator>
    )

}