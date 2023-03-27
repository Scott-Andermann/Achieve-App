import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserInfoState {
    userID: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    location: string,
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

const initialState: UserInfoState = {
    userID: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    location: '',
}

interface ResetState {
    offset: number,
    startingFlow: number
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
        setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
            state.userID = action.payload.userID;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        clearPassword: (state) => {
            state.password = '';
        },
        clearUserInfo: (state, action: PayloadAction<ResetState>) => {
            state.userID = '';
            state.email = '';
            state.firstName = '';
            state.lastName = '';
            state.location = '';
            state.password = '';
        },
        
    },
})

// Action creators are generated for each case reducer function
export const { setUserInfo, clearUserInfo, setCredentials, setLocationState, setName } = userInfoSlicer.actions

export default userInfoSlicer.reducer