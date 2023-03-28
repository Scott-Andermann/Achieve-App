import React, { useState, Dispatch, SetStateAction } from 'react';
import { Modal, ScrollView, Text } from 'react-native'
import GradientButton from '../components/GradientButton';
import IconTypeSelector from '../components/IconTypeSelector';
import OutlineButton from '../components/OutlineButton';
import DescriptionField from '../components/DescriptionField';
import LoginInput from '../components/LoginInput';
import DatePicker from '../components/DatePicker';
import { useAppDispatch, useAppSelector } from '../redux/hooks';



const NewAchievementModal = ({ exposeModal, setExposeModal }: { exposeModal: boolean, setExposeModal: Dispatch<SetStateAction<boolean>> }) => {

    const [description, setDescription] = useState<string>('');
    const [name, setName] = useState<string>('')
    const [achieveType, setAchieveType] = useState<string>('Achievement');
    const [date, setDate] = useState<Date>(new Date(Date.now()));

    const userId = useAppSelector(state => state.userInfo.userId);

    const handlePress = async () => {
        // add new achievement to database start with a single group but add functionality to be a part of multiple groups
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
            alert(result.message)
            return
        }
        setDescription('');
        setName('');
        setAchieveType('Achievement');
        setDate(new Date(Date.now()));
        

    }

    return (
        <Modal
            visible={exposeModal}
            transparent={true}>
            <ScrollView className='bg-slate-700 p-12 bg-opacity-50' style={{ height: '100%' }}>
                <LoginInput placeholder={`New ${achieveType}`} value={name} setValue={setName} />
                <DatePicker date={date} setDate={setDate}/>
                <IconTypeSelector achieveType={achieveType} setAchieveType={setAchieveType} />
                <DescriptionField value={description} setValue={setDescription} />
                <GradientButton text={'Add Achievement!'} onPress={handlePress} />
                <OutlineButton text={'Close'} onPress={() => setExposeModal(false)} />
                {/* <LoginInput value={firstName} setValue={setFirstName} /> */}
            </ScrollView>
        </Modal>
    );
}

export default NewAchievementModal;