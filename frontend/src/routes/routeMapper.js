/* eslint-disable arrow-body-style */
// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../components/shared/Loader';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Lazy-loaded Components
const Signin = lazy(() => import('../components/auth/Signin'));
const Signup = lazy(() => import('../components/auth/Signup'));
const Product = lazy(() => import('../components/Product/index'));
const ProductDetails = lazy(() => import('../components/Product/ProductDetails'));
const NotFound = lazy(() => import('../components/shared/NotFound'));

const checkLoginStatus = () => {
    const token = localStorage.getItem("token")
    return !!token
}

const routeMapper = () => {
    const isLoggedIn = checkLoginStatus();

    return [
        // {
        //     path: '/signin',
        //     element: (
        //         <PublicRoute isLoggedIn={isLoggedIn}>
        //             <Suspense fallback={<Loader />}>
        //                 <Signin />
        //             </Suspense>
        //         </PublicRoute>
        //     ),
        //     exact: true,
        // },
        // {
        //     path: '/signup',
        //     element: (
        //         <PublicRoute isLoggedIn={isLoggedIn}>
        //             <Suspense fallback={<Loader />}>
        //                 <Signup />
        //             </Suspense>
        //         </PublicRoute>
        //     ),
        //     exact: true,
        // },
        // {
        //     path: '/',
        //     element: (
        //         <PrivateRoute isLoggedIn={isLoggedIn}>
        //             <Suspense fallback={<Loader />}>
        //                 <Outlet />
        //             </Suspense>
        //         </PrivateRoute>
        //     ),
        //     children: [
        //         {
        //             index: true,
        //             exact: true,
        //             element: (
        //                 <Suspense fallback={<Loader />}>
        //                     <Product />
        //                 </Suspense>
        //             ),
        //         },
        //         {
        //             path: '/product/:id',
        //             exact: true,
        //             element: (
        //                 <Suspense fallback={<Loader />}>
        //                     <ProductDetails />
        //                 </Suspense>
        //             ),
        //         },

        //     ],
        // },
        // {
        //     path: '/profile',
        //     element: (
        //         <PrivateRoute isLoggedIn={isLoggedIn}>
        //             <Outlet />
        //         </PrivateRoute>
        //     ),
        //     exact: true,
        // },
        // {
        //     path: '*',
        //     element: (
        //         <PublicRoute isLoggedIn={isLoggedIn}>
        //             <Suspense fallback={<Loader />}>
        //                 <NotFound />
        //             </Suspense>
        //         </PublicRoute>
        //     ),
        // },
        {
            path: '/',
            element: (
                <Suspense fallback={<Loader />}>
                    <Product />
                </Suspense>
            ),
            exact: true,
        },
        {
            path: '/product/:id',
            element: (
                <Suspense fallback={<Loader />}>
                    <ProductDetails />
                </Suspense>
            ),
            exact: true,
        },
        // Add other routes as needed...
        // Remember to include the NotFound route at the end.
        {
            path: '*',
            element: (
                <Suspense fallback={<Loader />}>
                    <NotFound />
                </Suspense>
            ),
        },
    ];
};

export default routeMapper;
