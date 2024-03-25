import React, { useState } from 'react';
import { useRegisterMutation } from '../../redux/slices/usersApiSlice';
import {  useDispatch, useSelector } from 'react-redux';
import Loader from '../shared/Loader';
import { useLoginMutation } from '../../redux/slices/usersApiSlice';
import { setCredentials } from '../../redux/slices/authSlice';
import { Toast } from 'react-bootstrap';
import { Await, useLocation, useNavigate } from 'react-router-dom';
import Alerts from '../shared/Alerts';


const RegistrationForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAdmin: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setUserData({
            ...userData,
            [name]: newValue
        });
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search)
    console.log(sp);
    const redirect = sp.get('redirect') || '/';
    console.log(redirect);

    // useEffect(()=>{
    //     if(userInfo){
    //         console.log("locllll");
    //         navigate(redirect);
    //     }
    // },[userInfo])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = userData; 
        if(password !== confirmPassword){
            console.log("Password do not match");
        }else{
            try {
                const { name, email, password, confirmPassword } = userData; 
                const res = await register({name, email, password }).unwrap();
                console.log(res);
                dispatch(setCredentials({...res, }));
                
                navigate(redirect)
    
            } catch (err) {
                // <Alerts variant='danger'>{err?.data?.message || err.error} </Alerts>
                console.log("invalid");
            }
        }
        console.log(userData);
       
    };


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg mx-auto w-50">
                <h1 className="text-center mb-4">Registration</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text" name="name" value={userData.name} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" name="email" value={userData.email} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input type="password" name="password" value={userData.password} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password:</label>
                        <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" name="isAdmin" checked={userData.isAdmin} onChange={handleChange} className="form-check-input" id="isAdmin" />
                        <label className="form-check-label" htmlFor="isAdmin">Admin</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                </form>
                <hr />
                <p className="text-center">
                    Already have an account? <a href="/signin" className="btn btn-link">Login here</a>.
                </p>
            </div>
        </div>
    );
};

export default RegistrationForm;
