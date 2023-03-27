import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getReduxValue } from '../../components/SecureStorageFunctions'


export interface LoginState {
  value: string
}

const initialState: LoginState = {
  value: '',
}

export const loginSlicer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
        state.value = action.payload
    },
    logout: (state) => {
        state.value = ''
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlicer.actions

export default loginSlicer.reducer