import React, { useState, Dispatch, SetStateAction } from 'react';
import { Modal, View, Text } from 'react-native'
import GradientButton from '../components/GradientButton';
import LoginInput from '../components/LoginInput';
import { save } from '../components/SecureStorageFunctions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { login } from '../redux/slicers/loginSlice';
import { setLocationState, setName, setUserId } from '../redux/slicers/userInfoSlice';


const ProfileModal = ({exposeModal, setExposeModal}: {exposeModal: boolean, setExposeModal: Dispatch<SetStateAction<boolean>>}) => {

    const dispatch = useAppDispatch();
    let body = useAppSelector((state) => state.userInfo)

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);

    const handleSignUp = async () => {
        // console.log(firstName, lastName, location);
        if (firstName && lastName) {
            if (location) {
                dispatch(setLocationState({location: location}))
            }
            dispatch(setName({firstName: firstName, lastName: lastName}))
            // send registration info to server and get key back
            
            body = {...body, firstName: firstName, lastName: lastName, location: location}
            
            const response = await fetch('http://localhost:5000/signup', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)})
            const result = await response.json();
            // console.log(result);
            if (result.status === 'failed') {
                setExposeModal(false);
                alert(result.error);
                // setError(result.error);
            }
            else {
                save({key: 'userId', value: result.userId})
                dispatch(setUserId({userId: result.userId}))
                dispatch(login(result.userId))
                setExposeModal(false);
            }
        } else {
            setShowError(true)
        }
    }

    return (
        <Modal
        visible={exposeModal}
        transparent={true}>
            <View className='bg-slate-700 p-12 bg-opacity-50' style={{height: '100%'}}>
                <Text className='text-white text-3xl'>Tell us who you are!</Text>
                <LoginInput value={firstName} setValue={setFirstName} placeholder='First Name'/>
                {showError && firstName === '' && <Text className='text-white ml-11'>Please enter your first name</Text>}
                <LoginInput value={lastName} setValue={setLastName} placeholder='Last Name'/>
                {showError && lastName === '' && <Text className='text-white ml-11'>Please enter your last name</Text>}
                <LoginInput value={location} setValue={setLocation} placeholder='Location (optional)' type='location' />
                <GradientButton text={'Sign Up'} onPress={handleSignUp} />
                {/* <LoginInput value={firstName} setValue={setFirstName} /> */}
            </View>
        </Modal>
    );
}

export default ProfileModal;