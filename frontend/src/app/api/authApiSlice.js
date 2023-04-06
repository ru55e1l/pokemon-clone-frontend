import { apiSlice } from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/trainer/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        refresh: builder.mutation({
            query: (credentials) => ({
                url: '/trainer/refresh',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: (credentials) => ({
                url: '/trainer/logout',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } = authApiSlice;
