// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/shared/Header';

const PrivateLayout = ({ children }) => (
    <div className="grid-container">
        <Header />
        <div className='p-5'>
            {children}
        </div>
    </div>
);

const PrivateRoute = ({ children, isLoggedIn }) => (isLoggedIn ? (
    <PrivateLayout>
        {children}
    </PrivateLayout>
) : (
    <Navigate to="/signin" />
))

export default PrivateRoute;
