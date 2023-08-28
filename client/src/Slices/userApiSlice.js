import { apiSlice } from './apiSlice';

const usersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      //*Start here
      login: builder.mutation({
         query: (data) => ({
            url: `/auth/login`,
            method: 'POST',
            body: data,
         }),
      }),

      //* HERE
      logout: builder.mutation({
         query: () => ({
            url: `/auth/login`,
            method: 'POST',
         }),
      }),

      //*Here
      getUserDetails: builder.query({
         query: (id) => ({
            url: `/auth/users/${id}`,
            method: 'GET',
         }),
         keepUnusedDataFor: 5,
      }),
   }),
});

export const { useLoginMutation, useLogoutMutation, useGetUserDetailsQuery } =
   usersApiSlice;
