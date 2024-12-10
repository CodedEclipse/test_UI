import * as yup from 'yup'

export const AdminLoginSchema = yup.object().shape({
    username: yup.string()
        .required('User Name is required')
        .email('User Name must be a valid email address'), // Corrected method name and error message

    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long') // Changed minimum length to 6
});
