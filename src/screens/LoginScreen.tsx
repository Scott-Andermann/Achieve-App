import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ImageBackground, StyleSheet } from 'react-native'
import { save } from '../components/SecureStorageFunctions';
import { useAppDispatch } from '../redux/hooks';
import { login, logout } from '../redux/slicers/loginSlice';
import LoginInput from '../components/LoginInput';
import GradientButton from '../components/GradientButton';
import OutlineButton from '../components/OutlineButton';
import { sha256 } from 'js-sha256';
import { setUserInfo } from '../redux/slicers/userInfoSlice';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const LoginScreen = ({ navigation }: { navigation: any }) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [invalid, setInvalid] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const loginToApp = async () => {
        const body = {email: email, password: sha256(password), userId: ''}
        const response = await fetch('http://localhost:5000/login', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)})
        const result = await response.json();
        // console.log(result);
        if (result.status === 'failed') {
            alert(result.message)
            return
        }
        let storeResult = await save({key: 'userId', value: result.userId})
        if (storeResult === null) {
            alert('error')
        } else {
            dispatch(login(result.userId))
            dispatch(setUserInfo({
                userId: result['userId'],
                email: result['email'],
                firstName: result['firstName'],
                lastName: result['lastName'],
                password: result['password'],
                location: result['location']
            }))
        }
    }

    return (
        <ImageBackground source={require('../assets/watch_bg.jpg')} style={styles.image} resizeMode='cover' blurRadius={5}>
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.titleText}>ACHIEVE</Text>
                    <View style={styles.spacer} />
                    <LoginInput type='user' value={email} setValue={setEmail} />
                    <LoginInput type='password' value={password} setValue={setPassword} />
                    {invalid && <Text style={styles.recoverLink}>Invalid Credentials</Text>}
                    <View style={styles.recoverLinkWrapper}>
                        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                            <Text style={styles.recoverLink}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <GradientButton text='Log In' onPress={loginToApp} />
                    <OutlineButton text='Register' onPress={() => navigation.navigate('Register')} />
                </View>
            </View>
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

export default LoginScreen;