import React, { useState, Dispatch, SetStateAction } from 'react';
import { Modal, ScrollView, Text, ActivityIndicator } from 'react-native'
import GradientButton from '../components/GradientButton';
import IconTypeSelector from '../components/IconTypeSelector';
import OutlineButton from '../components/OutlineButton';
import DescriptionField from '../components/DescriptionField';
import LoginInput from '../components/LoginInput';
import DatePicker from '../components/DatePicker';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import AwesomeAlert from 'react-native-awesome-alerts';



const NewAchievementModal = ({ exposeModal, setExposeModal }: { exposeModal: boolean, setExposeModal: Dispatch<SetStateAction<boolean>> }) => {

    const [description, setDescription] = useState<string>('');
    const [name, setName] = useState<string>('')
    const [achieveType, setAchieveType] = useState<string>('Achievement');
    const [date, setDate] = useState<Date>(new Date(Date.now()));
    const [loading, setLoading] = useState<boolean>(false);
    const [alertCongrats, setAlertCongrats] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertError, setAlertError] = useState<boolean>(false);
    const [alertErrorMessage, setAlertErrorMessage] = useState<string>('');


    const userId = useAppSelector(state => state.userInfo.userId);

    const handlePress = async () => {
        // add new achievement to database start with a single group but add functionality to be a part of multiple groups
        setLoading(true);
        let newName = '';
        if (name === '') {
            newName = `New ${achieveType}`;
        } else {
            newName = name;
        }
        console.log('Achieved! ', newName);
        const body = {
            userId: userId,
            name: newName,
            date: date.toLocaleDateString(),
            description: description,
            group: 'firstGroup'
        }

        console.log(body);
        
        const response = await fetch('http://localhost:5000/add_activity', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)})
        const result = await response.json();
        console.log(result);
        if (result.status === 'failed') {
            setAlertError(true);
            setAlertErrorMessage(result.message);
            setLoading(false);
            return
        }
        // alert(result.message)
        setAlertCongrats(true);
        setAlertMessage(result.message);
    }

    const closeModal = () => {
        setAlertCongrats(false);
        setDescription('');
        setName('');
        setAchieveType('Achievement');
        setDate(new Date(Date.now()));
        setExposeModal(false);
        setLoading(false);
    }

    return (
        <Modal
            visible={exposeModal}
            transparent={true}
            animationType='slide'>
            <ScrollView className='bg-slate-700 p-12 bg-opacity-50' style={{ height: '100%' }}>
                <LoginInput placeholder={`New ${achieveType}`} value={name} setValue={setName} />
                <DatePicker date={date} setDate={setDate}/>
                <IconTypeSelector achieveType={achieveType} setAchieveType={setAchieveType} />
                <DescriptionField value={description} setValue={setDescription} />
                <GradientButton text={'Add Achievement!'} onPress={handlePress} >
                    {loading && <ActivityIndicator size='large' color={'#FFE3DC'}/>}
                </GradientButton>
                <OutlineButton text={'Close'} onPress={() => setExposeModal(false)} />
                <AwesomeAlert
                    show={alertCongrats}
                    title='Congratulations!'
                    message={alertMessage}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText='OK'
                    onConfirmPressed={closeModal}
                    />
                <AwesomeAlert
                    show={alertError}
                    title='Error'
                    message={alertErrorMessage}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText='OK'
                    onConfirmPressed={() => setAlertError(false)}
                    />
                {/* <LoginInput value={firstName} setValue={setFirstName} /> */}
            </ScrollView>
        </Modal>
    );
}

export default NewAchievementModal;