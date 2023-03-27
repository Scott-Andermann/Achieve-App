import * as React from 'react';
import {View, Text} from 'react-native'

const AppLoadingScreen = () => {

    

    return ( 
        <View className='items-center bg-slate-600 flex flex-1 justify-center'>
            <Text className='text-white font-bold text-3xl'>Loading...</Text>
        </View>
     );
}
 
export default AppLoadingScreen;