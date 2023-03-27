import {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import store from './src/redux/store';
import * as SecureStore from 'expo-secure-store';
import RootNavigation from './src/navigation/RootNavigation';
import { LoginStackNavigator } from './src/navigation/LoginStackNavigator';



export default function App() {
  // const [loginKey, setLoginKey] = useState<string>('');

  

  return (

    <Provider store={store}>
      <LoginStackNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
