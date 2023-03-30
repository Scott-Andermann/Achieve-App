import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AppLoadingScreen from '../screens/AppLoadingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import TestScreen from '../screens/TestScreen';

export type RootTabParamList = {
    Login: undefined;
    Home: undefined;
    Create: undefined;
    Find: undefined;
    Profile: undefined
    Test: undefined;
    Leaderboard: undefined;
}

const Tab = createBottomTabNavigator<RootTabParamList>();


export const RootTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
            <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
            <Tab.Screen name="Find" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            {/* <Tab.Screen name="Test" component={TestScreen} /> */}
            {/* <Tab.Screen name="Login" component={HomeScreen} /> */}
        </Tab.Navigator>
    )

}