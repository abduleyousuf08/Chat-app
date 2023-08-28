import { apiSlice } from './apiSlice';

const messageSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      //*Start here
      findMessage: builder.query({
         query: (id) => ({
            url: `/message/findMessage/${id}`,
            method: 'GET',
         }),
         providesTags: ['Message'],
         keepUnusedDataFor: 5,
      }),
   }),
});

export const { useFindMessageQuery } = messageSlice;
