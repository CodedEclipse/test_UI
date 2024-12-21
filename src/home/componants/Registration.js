import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { _post_data } from '../../ApiServices'
import { RegistrationSchema } from '../utilites/Schema'
import { useFormik } from "formik";
import { Toast } from '../../ToasterService';
import { set_admin_logged, admin_logged_data } from '../../Configuration';

function Registration() {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

    const registerData = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            mobile_no: "",
            email_id: "",
            password: ""
        },
        validationSchema: RegistrationSchema,
        onSubmit: async (values) => {
            values.username = values.email_id;
            await _post_data('/cust/CustomerRegistration', values)
                .then((res) => {
                    res.data = JSON.parse(res.data);
                    if (res.data.status) {
                        registerData.resetForm();
                        navigate("/");
                        Toast(1, res.data.message);
                    } else {
                        Toast(2, res.data.message);
                    }
                }).catch((e) => {
                    Toast(2, e.response.data.error);
                });
        },
    });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
            <section className="wrapper">
                <div className="container">
                    <form onSubmit={registerData.handleSubmit} autoComplete="off">
                        <div className="row m-3">
                            <div className="col">
                                <label htmlFor="inputState" className="m-2">First Name</label>
                                <input type="text" className="form-control" name="firstname"
                                    value={registerData.values.firstname}
                                    onChange={registerData.handleChange}
                                    onBlur={registerData.handleBlur}
                                    autoComplete="off"
                                />
                                {registerData.touched.firstname && registerData.errors.firstname && (
                                    <span className="login-danger validation-text">* &nbsp;
                                        {registerData.errors.firstname}
                                    </span>
                                )}
                            </div>
                            <div className="col">
                                <label htmlFor="inputState" className="m-2">Last Name</label>
                                <input type="text" className="form-control" name="lastname"
                                    value={registerData.values.lastname}
                                    onChange={registerData.handleChange}
                                    onBlur={registerData.handleBlur}
                                    autoComplete="off"
                                />
                                {registerData.touched.lastname && registerData.errors.lastname && (
                                    <span className="login-danger validation-text">* &nbsp;
                                        {registerData.errors.lastname}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="row m-3">
                            <div className="col">
                                <label htmlFor="inputState" className="m-2">Mobile NO</label>
                                <input type="text" className="form-control" maxLength={10} name="mobile_no"
                                    value={registerData.values.mobile_no}
                                    onChange={registerData.handleChange}
                                    onBlur={registerData.handleBlur}
                                    autoComplete="off"
                                />
                                {registerData.touched.mobile_no && registerData.errors.mobile_no && (
                                    <span className="login-danger validation-text">* &nbsp;
                                        {registerData.errors.mobile_no}
                                    </span>
                                )}
                            </div>
                            <div className="col">
                                <label htmlFor="inputState" className="m-2">E-Mail ID</label>
                                <input type="email" className="form-control" name="email_id"
                                    value={registerData.values.email_id}
                                    onChange={registerData.handleChange}
                                    onBlur={registerData.handleBlur}
                                    autoComplete="off"
                                />
                                {registerData.touched.email_id && registerData.errors.email_id && (
                                    <span className="login-danger validation-text">* &nbsp;
                                        {registerData.errors.email_id}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="row m-3">
                            <div className="col">
                                <label htmlFor="inputState" className="m-2">User Name</label>
                                <input type="text" className="form-control" name="email_id"
                                    value={registerData.values.email_id}
                                    onChange={registerData.handleChange}
                                    onBlur={registerData.handleBlur}
                                    disabled
                                    autoComplete="off"
                                />
                                {registerData.touched.email_id && registerData.errors.email_id && (
                                    <span className="login-danger validation-text">* &nbsp;
                                        {registerData.errors.email_id}
                                    </span>
                                )}
                            </div>
                            <div className="col">
                                <label htmlFor="inputState" className="m-2">Password</label>
                                <div className="password-wrapper position-relative">
                                    <input 
                                        type={passwordVisible ? "text" : "password"} 
                                        className="form-control" 
                                        name="password"
                                        value={registerData.values.password}
                                        onChange={registerData.handleChange}
                                        onBlur={registerData.handleBlur}
                                        autoComplete="new-password"
                                    />
                                    <i 
                                        onClick={togglePasswordVisibility} 
                                        className={`fa ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'}`}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                        }}
                                    ></i>
                                </div>
                                {registerData.touched.password && registerData.errors.password && (
                                    <span className="login-danger validation-text">* &nbsp;
                                        {registerData.errors.password}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="row m-4">
                            <button type="submit" className="btn btn-outline" style={{ width: '172px' }} >Register</button>
                            <Link to='/' className="btn btn-outline ml-5" style={{ width: '172px', marginLeft: '40px' }}>
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}


export default Registration;