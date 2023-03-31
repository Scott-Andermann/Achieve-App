import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import chroma from 'chroma-js';

const StreakIndicator = ({ streak }: { streak: number }) => {

    const [width, setWidth] = useState<number>(0);
    const [color, setColor] = useState<string>('#000000');

    // const streakWidth = useRef(new Animated.Value(0)).current;

    const calculateStreakWidth = () => {
        const percentage = Math.round(100 * streak / 12)
        setColor(chroma.mix('#BB3F3F', '#FFFF00', percentage / 100).hex())
        setWidth(percentage)

    }

    useEffect(() => {
        calculateStreakWidth()
        // Animated.timing(streakWidth, {
        //     toValue: width,

        // }).start()
    }, [streak]);

    // console.log(color);


    return (
        <View>
            <View className='w-full h-3/4 flex flex-row justify-between relative items-center rounded-full overflow-hidden' style={styles.shadowProp}>
                <View className='h-full absolute rounded-sm transition-all' style={[styles.shadowProp, { width: `${width}%`, backgroundColor: color }]}></View>
                <View className='h-full absolute w-full top-0 bottom-0 left-0 right-0 bg-slate-300 -z-10'>
                    </View>
                <View className='h-full absolute w-full top-0 bottom-0 left-0 right-0 bg-transparent'>
                    <View className='w-1/4 h-full absolute left-0 border-r border-black'></View>
                    <View className='w-1/2 h-full absolute left-0 border-r border-black'></View>
                    <View className='w-3/4 h-full absolute left-0 border-r border-black'></View>
                </View>
            </View>
            <View className='flex flex-row justify-between'>
                <Text>0</Text>
                <Text>3</Text>
                <Text>6</Text>
                <Text>9</Text>
                <Text>12</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 7.5,

        elevation: 12,
    }
})
export default StreakIndicator;