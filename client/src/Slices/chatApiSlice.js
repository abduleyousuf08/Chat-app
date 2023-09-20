import { apiSlice } from './apiSlice';

const chatApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      //*Start here
      findMyChat: builder.query({
         query: (id) => ({
            url: `/chat/find-my-chats/${id}`,
            method: 'GET',
         }),
         invalidatesTags: ['Chat'],
         keepUnusedDataFor: 5,
      }),
   }),
});

export const { useFindMyChatQuery } = chatApiSlice;
