import React, {useEffect, useState} from 'react';
import { View, ScrollView, Text, Button } from 'react-native'
import { FlatList } from 'react-native/Libraries/Lists/FlatList';
import LeaderboardItem from './LeaderboardItem';

interface Leaders {
    firstName: string,
    lastName: string,
    userId: string,
    points: number,
    location: string,
    streak: number,
}

const Item = () => {
    return <View>Hello</View>
}

const Leaderboard = () => {

    const [leaders, setLeaders] = useState<Leaders[]>([]);

    const fetchLeaderboard = async () => {
        const response = await fetch('http://localhost:5000/leaderboard')
        const result = await response.json()
        console.log(result);
        setLeaders(result.data)
    }

    useEffect(() => {
        fetchLeaderboard()
    }, []);

    return ( 
        <View style={{width: '100%'}}>
            {leaders.length > 0 && leaders.map((leader, index) => <LeaderboardItem rank={index} key={leader.userId} firstName={leader.firstName} lastName={leader.lastName} streak={leader.streak} points={leader.points} photo='url'/>)}
            <Button title='Refresh' onPress={fetchLeaderboard}>Refresh Leaderboard</Button>
        </View>
     );
}
 
export default Leaderboard;