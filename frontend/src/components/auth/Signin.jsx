import React, { useState } from 'react';

const LoginForm = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
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
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
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
