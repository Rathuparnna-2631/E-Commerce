import { useState, useEffect } from 'react';
import axios from 'axios';

// Create an instance of Axios for HTTP requests
const httpClient = axios.create();

// Helper function to construct the URL with endpoint, params, and query parameters
const getUrl = ({ endpoint, params, queryParams }) => {
    // Construct the URL using the base API URL from environment variables
    const url = new URL(endpoint, process.env.REACT_APP_BASE_API_URL);

    // Replace dynamic params in the URL path
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.pathname = url.pathname.replace(`:${key}`, value);
        });
    }

    // Add query parameters to the URL
    if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }

    return url.toString();
};

/**
 * Custom hook for making HTTP requests.
 * Manages data loading, error handling, and authentication.
 */
const useHttp = () => {
    // State variables for data, loading state, error, and authentication token
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Function to refresh the authentication token
    const refreshToken = async () => {
        const refreshTokenValue = localStorage.getItem('refreshToken');
        const response = await httpClient.post('/api/token/refresh', { refreshToken: refreshTokenValue });
        return response.data;
    };

    useEffect(() => {
        // Intercept requests to add loading state and authentication headers
        httpClient.interceptors.request.use(
            (config) => {
                const configTemp = { ...config }
                setIsLoading(true);
                configTemp.headers.Authorization = `Bearer ${token}`;
                return configTemp;
            },
            (errorObj) => {
                setIsLoading(false);
                return Promise.reject(errorObj);
            },
        );

        // Intercept responses to handle authentication errors and update token
        httpClient.interceptors.response.use(
            (response) => {
                setIsLoading(false);
                return response;
            },
            async (errorObj) => {
                setIsLoading(false);

                // Handle authentication error (status code 401)
                if (errorObj.response && errorObj.response.status === 401) {
                    try {
                        // Refresh the authentication token
                        const { refreshTokenData } = await refreshToken();
                        setToken(refreshTokenData.token);
                        localStorage.setItem('token', data.token);
                        return httpClient.request(error.config);
                    } catch (errorinst) {
                        setError(errorinst);
                    }
                } else {
                    setError(errorObj);
                }

                return Promise.reject(error);
            },
        );
    }, [token]);

    // HTTP GET request
    const get = async ({ endpoint, params, queryParams }) => {
        const url = getUrl({ endpoint, params, queryParams });
        const response = await httpClient.get(url);
        setData(response.data);
    };

    // HTTP POST request
    const post = async ({ endpoint, payload }) => {
        const url = getUrl({ endpoint });
        const response = await httpClient.post(url, payload);
        setData(response.data);
    };

    // HTTP PUT request
    const put = async ({ endpoint, payload }) => {
        const url = getUrl({ endpoint });
        const response = await httpClient.put(url, payload);
        setData(response.data);
    };

    // HTTP PATCH request
    const patch = async ({ endpoint, payload }) => {
        const url = getUrl({ endpoint });
        const response = await httpClient.patch(url, payload);
        setData(response.data);
    };

    // HTTP DELETE request
    const del = async ({ endpoint }) => {
        const url = getUrl({ endpoint });
        await httpClient.delete(url);
        setData(null);
    };

    // Return the data, loading state, error, and HTTP request functions
    return {
        data,
        isLoading,
        error,
        get,
        post,
        put,
        patch,
        delete: del,
    };
};

export default useHttp;
