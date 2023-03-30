import * as React from 'react';
import {View, Text, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


interface IProps {
    firstName: string,
    lastName: string,
    streak: number,
    points: number,
    photo: string,
    rank: number,
}

const LeaderboardItem = ({firstName, lastName, streak, points, photo, rank}: IProps) => {

    const colorPicker = () => {
        if (streak < 2) {
            return '#454e9e'
        } else if (streak < 3) {
            return '#f00699'
        } else if (streak < 6) {
            return '#f7d002'
        } else if (streak < 9) {
            return '#ffffff'
        } else if (streak < 12) {
            return '#ffffff'
        }
        return '#ffffff'
    }

    console.log(streak);
    
    return ( 
        <View className='flex flex-row justify-between border-b border-gray-400'>
            <View className='flex flex-row items-center justify-center'>
                <Text className='text-lg pr-2 pl-4'>{rank + 1}</Text>
                <View className='h-12 w-12 bg-slate-400 rounded-lg m-1'></View>
                <View>
                    <Text className='text-md'>{firstName} {lastName}</Text>
                </View>
            </View>
            <View className='h-8 flex items-center justify-start'>
            </View>
            <View className='flex flex-row justify-center items-center'>
                <FontAwesome5 name='fire' size={24} color={streak >= 12 ? 'blue' : streak >= 9 ? 'yellow' : streak >= 6 ? 'orange' : streak >= 3 ? 'red' : 'gray'}/>
                <Text className='w-8 text-center'>{points}</Text>
            </View>
        </View>
     );
}
 
export default LeaderboardItem;