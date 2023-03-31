import * as React from 'react';
import { View } from 'react-native'
import { shadowStyles } from './shadowProps';

const HomeCard = ({children}: {children:React.ReactNode}) => {
    return ( 
        <View className='w-1/2 h-40 p-2 pt-1'>
            <View className='w-full h-full bg-slate-300 rounded-3xl p-3'>

            {children}
            </View>
        </View>
     );
}
 
export default HomeCard;