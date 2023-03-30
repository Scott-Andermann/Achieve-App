import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Dimensions} from 'react-native'
import { save } from '../components/SecureStorageFunctions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/slicers/loginSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FoundationIcons from 'react-native-vector-icons/Foundation';
import GradientButton from '../components/GradientButton';
import NewAchievementModal from '../Modal/NewAchievementModal';
import DatePicker from '../components/DatePicker';
import Leaderboard from '../components/Leaderboard';
import StreakIndicator from '../components/StreakIndicator';

const screenHeight = Dimensions.get('window').height

const HomeScreen = () => {
    const userInfo = useAppSelector(state => state.userInfo);

    const [exposeModal, setExposeModal] = useState<boolean>(false);

    const handleOnPress = () => {

    }

    return ( 
        <View style={styles.container}>
            <ScrollView>
                <ImageBackground source={require('../assets/watch_bg.jpg')} style={[styles.backgroundImage, styles.shadowProp]} resizeMode='cover' blurRadius={5}>
                    <View style={styles.header}>
                        {/* <MaterialIcons name='person-outline' size={50} color={'white'} /> */}
                        <FoundationIcons name='mountains' size={45} color={'white'} />
                        <Text style={styles.headerText}>ACHIEVE</Text>
                    </View>
                    <View style={styles.welcomeWrapper}>
                        <Text style={styles.welcomeText}>Welcome,</Text>
                        <Text style={[styles.welcomeText, { fontSize: 40, fontWeight: 'bold' }]}>{userInfo.firstName}</Text>
                    </View>
                    <View style={[styles.headshot, styles.shadowProp]}>
                        <MaterialIcons name='image-search' size={80} color='#8F8F8F' />
                    </View>
                </ImageBackground>
                <View style={styles.spacer} />
                <View style={styles.contentWrapper} >
                    <View style={styles.contentWide}>
                        {/* Streak indicator */}
                        <StreakIndicator streak={8}/>
                    </View>
                        <View style={styles.contentCardContainer}>
                        <GradientButton text={'Add achievement'} onPress={() => setExposeModal(true)}
                        />
                            {/* <FlatList data={data} renderItem={(item) => <HomeCard />} /> */}
                            {/* <HomeCard />
                            <HomeCard />
                            <HomeCard /> */}
                        </View>
                </View>
                <View style={styles.lowerSpacer} />
            </ScrollView>
            <NewAchievementModal exposeModal={exposeModal} setExposeModal={setExposeModal} />
            {/* <Footer screen='home' navigation={navigation} /> */}
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backgroundImage: {
        width: '100%',
        height: 0.3 * screenHeight,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 24
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        letterSpacing: -1.5,
    },
    welcomeWrapper: {
        padding: 24
    },
    welcomeText: {
        fontSize: 30,
        color: 'white',
        opacity: 1,
    },
    headshot: {
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: '#ECECEC',
        position: 'absolute',
        right: 30,
        bottom: -60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spacer: {
        height: 60,
    },
    contentWrapper: {
        margin: 20,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    contentWide: {
        width: '100%',
        backgroundColor: '#ECECEC',
        height: 120,
        borderRadius: 20,
        padding: 24,
    },
    contentCardContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
        // justifyContent: 'flex-start',
        // maxWidth: 200,
    },
    lowerSpacer: {
        height: 80,
    },
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
 
export default HomeScreen;