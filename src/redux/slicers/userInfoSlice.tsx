import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserInfoState {
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    location: string,
    streak: number,
    points: number,
}

interface UserCredentialsState {
    email: string,
    password: string
}

interface UserNameState {
    firstName: string,
    lastName: string,
}

interface LocationState {
    location: string,
}

interface UserIdState {
    userId: string,
}

const initialState: UserInfoState = {
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    location: '',
    streak: 0,
    points: 0,
}

export const userInfoSlicer = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<UserCredentialsState>) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        setName: (state, action: PayloadAction<UserNameState>) => {
            state.firstName = action.payload.firstName,
            state.lastName = action.payload.lastName
        },
        setLocationState: (state, action: PayloadAction<LocationState>) => {
            state.location = action.payload.location
        },
        setUserId: (state, action: PayloadAction<UserIdState>) => {
            state.userId = action.payload.userId
        },
        setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.password = action.payload.password;
            state.location = action.payload.location;
            state.points = action.payload.points;
            state.streak = action.payload.streak;
        },
        clearPassword: (state) => {
            state.password = '';
        },
        
    },
})

// Action creators are generated for each case reducer function
export const { setUserInfo, setCredentials, setLocationState, setName, setUserId } = userInfoSlicer.actions

export default userInfoSlicer.reducer