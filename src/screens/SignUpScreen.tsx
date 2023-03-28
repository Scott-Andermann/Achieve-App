import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import LoginInput from '../components/LoginInput';
import GradientButton from '../components/GradientButton';
import OutlineButton from '../components/OutlineButton';
import ProfileModal from '../Modal/ProfileModal';
import { useAppDispatch } from '../redux/hooks';
import { setCredentials } from '../redux/slicers/userInfoSlice';
import {sha256} from 'js-sha256';
import { validateEmail, validatePassword } from '../components/ValidationFunctions';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const SignUpScreen = ({ navigation }: { navigation: any }) => {

    const dispatch = useAppDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [profileModal, setProfileModal] = useState<boolean>(false);


    const validateAndSignup = () => {
        console.log('validate: ', email, password);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        if (emailError) {
            alert('Please enter a valid email address')
            return;
        } else if (passwordError) {
            alert('Please enter a password of at least 8 characters including at least one capital letter, one number, and one symbol.')
            return;
        }
        
        // add email and pw to redux userinfo
        dispatch(setCredentials({email: email, password: sha256(password)}))
        setProfileModal(true);
    }

    return (
        <ImageBackground source={require('../assets/watch_bg.jpg')} style={styles.image} resizeMode='cover' blurRadius={5}>
            {!profileModal && 
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.titleText}>ACHIEVE</Text>
                    <View style={styles.spacer} />
                    <LoginInput type='user' value={email} setValue={setEmail} />
                    <LoginInput type='password' value={password} setValue={setPassword} />
                    {/* {invalid && <Text style={styles.recoverLink}>Invalid Credentials</Text>} */}
                    <GradientButton text='Sign Up' onPress={validateAndSignup} />
                </View>
            </View>
            }
            <ProfileModal exposeModal={profileModal} setExposeModal={setProfileModal} navigation={navigation}/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: screenHeight,
        width: screenWidth,
        flex: 1,
        padding: screenWidth * 0.15
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        // width: 200,
        // height: 200,
        resizeMode: 'center',
        filter: 'blur(4px)',
    },
    titleText: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
    },
    logoImage: {
        width: screenWidth / 2,
        height: 80,
        // height: 'auto',
        resizeMode: 'center'
    },
    spacer: {
        height: 60
    },
    recoverLinkWrapper: {
        width: '100%',
        marginBottom: 30,
    },
    recoverLink: {
        textAlign: 'right',
        color: 'white',
        fontSize: 16
    },
    loginButton: {
        width: screenWidth * 0.7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        margin: 6
    },

    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },

})

export default SignUpScreen;