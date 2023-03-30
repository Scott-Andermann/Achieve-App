import React, {useState, useEffect} from 'react';
import { View } from 'react-native';

const StreakIndicator = ({streak}: {streak: number}) => {

    const [width, setWidth] = useState<string>('10%');
    const [color, setColor] = useState<string>('#000000');

    const calculateStreakWidth = () => {
        const percentage = Math.round(100 * streak / 12)
        setWidth(`${percentage}%`)
    }

    useEffect(() => {
        calculateStreakWidth()
    }, []);

    return ( 
        <View className='w-full h-full flex flex-row justify-between relative items-center rounded-full overflow-hidden'>
            <View className='bg-green-500 h-full' style={{width: width}}></View>
            {/* <View className='bg-green-500 h-12 w-12 rounded-full'></View>
            <View className='bg-green-500 h-12 w-12 rounded-full'></View>
            <View className='bg-green-500 h-12 w-12 rounded-full'></View> */}
        </View>
     );
}
 
export default StreakIndicator;