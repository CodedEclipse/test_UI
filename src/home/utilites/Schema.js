import * as yup from 'yup'

export const RegistrationSchema = yup.object().shape({
    firstname: yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters long')
        .max(50, 'First name cannot exceed 50 characters'),
    
    lastname: yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters long')
        .max(50, 'Last name cannot exceed 50 characters'),
    
    mobile_no: yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
    
    email_id: yup.string()
        .required('Email ID is required')
        .email('Email ID must be a valid email address'),

    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long')
});
