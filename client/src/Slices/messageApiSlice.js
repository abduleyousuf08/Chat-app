import { apiSlice } from './apiSlice';

const messageSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      //*Start here
      findMessage: builder.query({
         query: (id) => ({
            url: `/message/findMessage/${id}`,
            method: 'GET',
         }),
         invalidatesTags: ['Message'],
         keepUnusedDataFor: 5,
      }),
      //* Send Message
      sendMessage: builder.mutation({
         query: (data) => ({
            url: '/message/create',
            method: 'POST',
            body: data,
         }),
         invalidatesTags: ['Message'],
      }),
   }),
});

export const { useFindMessageQuery, useSendMessageMutation } = messageSlice;
