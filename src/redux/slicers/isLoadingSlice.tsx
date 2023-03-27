import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface isLoadingState {
  value: boolean
}

const initialState: isLoadingState = {
  value: true,
}

export const isLoadingSlicer = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    setIsLoading: (state) => {
        state.value = true
    },
    setNotLoading: (state) => {
        state.value = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { setIsLoading, setNotLoading } = isLoadingSlicer.actions

export default isLoadingSlicer.reducer