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
            url: `/auth/logout`,
            method: 'POST',
         }),
      }),

      //*Here
      getUserDetails: builder.query({
         query: (id) => ({
            url: `/auth/users/${id}`,
            method: 'GET',
         }),
         providesTags: ['User'],
         keepUnusedDataFor: 5,
      }),

      //* Here
      createUser: builder.mutation({
         query: (data) => ({
            url: `/auth/`,
            method: 'POST',
            body: data,
         }),
         invalidatesTags: ['User'],
      }),
      //* Update User
      updateUser: builder.mutation({
         query: (data) => ({
            url: '/auth/profile',
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['User'],
      }),
   }),
});

export const {
   useLoginMutation,
   useLogoutMutation,
   useCreateUserMutation,
   useUpdateUserMutation,
   useGetUserDetailsQuery,
} = usersApiSlice;
