import React, { useState } from 'react';

const RegistrationForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
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
