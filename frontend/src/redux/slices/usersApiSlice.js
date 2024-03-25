import { URL } from "../../constants/index";
import { apiSlice } from "./apiSlice";
console.log(URL.users);
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${URL.users}/login`,
                method:'POST',
                body: data,
            }),
        }), 
        register: builder.mutation({
            query: (data) => ({
                url: `${URL.users}`,
                method:'POST',
                body: data,
            }),
        }),
        logout : builder.mutation({
            query: () => ({
                url: `${URL.users}/logout`,
                method:'POST',
            }),
        }) 
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation} = usersApiSlice;