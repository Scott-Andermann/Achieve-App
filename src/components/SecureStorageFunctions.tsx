import * as SecureStore from 'expo-secure-store';

export async function save({ key, value }: { key: string, value: string }) {
    // console.log(key, value);
    try {
        await SecureStore.setItemAsync(key, value);
        return 'success';

    } catch {
        return null;
    }
}

export async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result
    } else {
        return '';
    }
}

export async function getReduxValue(key: string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
    } else {
        return null;
    }
}