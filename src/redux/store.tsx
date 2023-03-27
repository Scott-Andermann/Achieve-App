import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slicers/loginSlice';
import isLoadingReducer from './slicers/isLoadingSlice';
import userInfoReducer from './slicers/userInfoSlice';


const rootReducer = combineReducers({
        login: loginReducer,
        isLoading: isLoadingReducer,
        userInfo: userInfoReducer,
    },
);

const store = configureStore({reducer: rootReducer} );

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;