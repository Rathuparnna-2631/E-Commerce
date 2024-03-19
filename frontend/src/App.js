import React from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { appRoutes } from './routes';

function App() {
    const router = createBrowserRouter(appRoutes());

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
};

export default App
