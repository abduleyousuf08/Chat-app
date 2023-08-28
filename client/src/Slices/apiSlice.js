import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
   baseUrl: '',
});

const apiSlice = createApi({
   baseQuery,
   tagTypes: ['User', 'Chat', 'Message'],
   endpoints: (builder) => ({}),
});

export { apiSlice };
