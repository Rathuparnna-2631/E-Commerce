import React, { useState, useEffect } from 'react';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import Loader from '../shared/Loader';
import { useLoginMutation } from '../../redux/slices/usersApiSlice';
import { setCredentials } from '../../redux/slices/authSlice';
import { Toast } from 'react-bootstrap';
import { Await, useLocation, useNavigate } from 'react-router-dom';
import Alerts from '../shared/Alerts';

const LoginForm = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/';

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);
        try {
            const { email, password } = userData; 
            const res = await login({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredentials({...res, }));
            
            navigate(redirect)

        } catch (err) {
            <Alerts variant='danger'>{err?.data?.message || err.error} </Alerts>
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg mx-auto w-50">
                <h1 className="text-center mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" name="email" value={userData.email} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input type="password" name="password" value={userData.password} onChange={handleChange} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>Login</button>
                    {isLoading && <Loader/>}
                </form>
                <hr />
                <p className="text-center">
                    Don't have an account yet? <a href="/signup" className="btn btn-link">Register here</a>.
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
