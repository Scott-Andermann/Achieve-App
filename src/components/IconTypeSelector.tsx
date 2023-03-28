import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoginInput from './LoginInput';

const AchievementTypes = Object.freeze({
    walk: 'Walk',
    run: 'Run',
    bike: 'Bike Ride',
    swim: 'Swim',
    book: 'Reading',
    food: 'Meal',
    dog: 'Dog Walk',
    other: 'Other',
})

const IconTypeSelector = ({achieveType, setAchieveType}: {achieveType: string, setAchieveType: Dispatch<SetStateAction<string>>}) => {

    return (
        <View className=''>
            <View className='flex flex-row justify-around pb-3 pt-3'>
                <TouchableOpacity className='p-3 w-16 flex justify-center items-center bg-slate-400 rounded-lg'
                    style={[styles.shadowProp, { backgroundColor: achieveType === AchievementTypes.walk ? 'white' : 'gray' }]}
                    onPress={() => setAchieveType(AchievementTypes.walk)}>
                    <FontAwesome5 name='walking' size={36} />
                </TouchableOpacity>
                <TouchableOpacity className='p-3 w-16 flex justify-center items-center bg-slate-400 rounded-lg'
                    style={[styles.shadowProp, { backgroundColor: achieveType === AchievementTypes.run ? 'white' : 'gray' }]}
                    onPress={() => setAchieveType(AchievementTypes.run)}>
                    <FontAwesome5 name='running' size={36} />
                </TouchableOpacity>
                <TouchableOpacity className='p-3 w-16 flex justify-center items-center bg-slate-400 rounded-lg'
                    style={[styles.shadowProp, { backgroundColor: achieveType === AchievementTypes.bike ? 'white' : 'gray' }]}
                    onPress={() => setAchieveType(AchievementTypes.bike)}>
                    <FontAwesome5 name='bicycle' size={36} />
                </TouchableOpacity>
                <TouchableOpacity className='p-3 w-16 flex justify-center items-center bg-slate-400 rounded-lg'
                    style={[styles.shadowProp, { backgroundColor: achieveType === AchievementTypes.swim ? 'white' : 'gray' }]}
                    onPress={() => setAchieveType(AchievementTypes.swim)}>
                    <FontAwesome5 name='swimmer' size={36} />
                </TouchableOpacity>
            </View>
            <View className='flex flex-row justify-around pb-3'>
                <TouchableOpacity className='p-3 w-16 flex justify-center items-center bg-slate-400 rounded-lg'
                    style={[styles.shadowProp, { backgroundColor: achieveType === AchievementTypes.book ? 'white' : 'gray' }]}
                    onPress={() => setAchieveType(AchievementTypes.book)}>
                    <FontAwesome5 name='book' size={36} />
                </TouchableOpacity>
                <TouchableOpacity className='p-3 w-16 flex justify-center items-center bg-slate-400 rounded-lg'
                    style={[styles.shadowProp, { backgroundColor: achieveType === AchievementTypes.food ? 'white' : 'gray' }]}
                    onPress={() => setAchieveType(AchievementTypes.food)}>
                    <FontAwesome5 name='hamburger' size={36} />
                </TouchableOpacity>
                <TouchableOpacity className='p-3 w-16 flex justify-center items-center bg-slate-400 rounded-lg'
                    style={[styles.shadowProp, { backgroundColor: achieveType === AchievementTypes.dog ? 'white' : 'gray' }]}
                    onPress={() => setAchieveType(AchievementTypes.dog)}>
                    <FontAwesome5 name='dog' size={36} />
                </TouchableOpacity>
                <TouchableOpacity className='p-3 w-16 flex justify-center items-center bg-slate-400 rounded-lg'
                    style={[styles.shadowProp, { backgroundColor: achieveType === AchievementTypes.other ? 'white' : 'gray' }]}
                    onPress={() => setAchieveType(AchievementTypes.other)}>
                    <FontAwesome5 name='question' size={36} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.65,
        shadowRadius: 6.27,

        elevation: 10,
    }
})

export default IconTypeSelector;