import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import '../../assets/css/style.css'
import { _post_data } from '../../../ApiServices'
import { AdminLoginSchema } from '../../schema/Comman_Schema'
import { useFormik } from "formik";
import { Toast } from '../../../ToasterService';
import { set_admin_logged, admin_logged_data } from '../../../Configuration';


function Login() {
    const navigate = useNavigate();
    const loginData = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: AdminLoginSchema,
        onSubmit: async (values) => {
            await _post_data('/admin/adminLogin', values)
                .then((res) => {
                    console.log('res', res.data);
                    res.data = JSON.parse(res.data)
                    if (res.data.status) {
                        set_admin_logged(res.data.result);
                        loginData.resetForm();
                        navigate("/");
                    } else {
                        Toast(2, res.data.message);
                    }
                }).catch((e) => {
                    console.log('e', e);
                    Toast(2, e.response.data.error);
                });
        },
    });
    const [loggedData, setLoggedData] = useState({});

    useEffect(() => {
        var tempLogged = admin_logged_data();
        setLoggedData(tempLogged);
        if (tempLogged != null && tempLogged.accessToken != '') {
            navigate("/");
        }
    }, [navigate]);

    return (
        <>
            <div className="container">

                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                <div className="d-flex justify-content-center py-4">
                                    <div className="logo d-flex align-items-center w-auto">
                                        <img src="assets/img/logo.png" alt="" />
                                        <span className="d-none d-lg-block">Admin</span>
                                    </div>
                                </div>

                                <div className="card mb-3">

                                    <div className="card-body">

                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                            <p className="text-center small">Enter your username & password to login</p>
                                        </div>

                                        <form onSubmit={loginData.handleSubmit} className="row g-3 needs-validation">

                                            <div className="col-12">
                                                <label htmlFor="yourUsername" className="form-label">Username</label>
                                                <div className="input-group has-validation">
                                                    <input type="text" name="username" className="form-control" id="yourUsername"
                                                        value={loginData.values.username}
                                                        onChange={loginData.handleChange}
                                                        onBlur={loginData.handleBlur} />
                                                    {loginData.touched.username && loginData.errors.username && (
                                                        <span className="login-danger validation-text">* &nbsp;
                                                            {loginData.errors.username}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="yourPassword" className="form-label">Password</label>
                                                <input type="password" name="password" className="form-control" id="yourPassword"
                                                    value={loginData.values.password}
                                                    onChange={loginData.handleChange}
                                                    onBlur={loginData.handleBlur} />
                                                {loginData.touched.password && loginData.errors.password && (
                                                    <span className="login-danger validation-text">* &nbsp;
                                                        {loginData.errors.password}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit">Login</button>
                                            </div>
                                            <div className="col-12">
                                                <Link to='/register' className="dropdown-item">
                                                    Don't have account? <i className="bi bi-box-arrow-right"></i>
                                                    <span style={{ color: '#1290ff' }}>Create an account</span>
                                                </Link>
                                            </div>
                                        </form>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </section>

            </div>

        </>
    );
}

export default Login;