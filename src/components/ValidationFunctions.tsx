export const validateEmail = (value: string) => {
    // console.log(value);
    
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
}

export const validatePassword = (value: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    let error;
    if (!value) {
        error= 'Required';
    } else if (!regex.test(value)) {
        error = 'password does not satisfy requirements';
    }
    return error;
}