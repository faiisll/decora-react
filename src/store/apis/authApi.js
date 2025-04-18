import { createApi} from '@reduxjs/toolkit/query/react';
import { setCredentials, setDataUser } from '../authSlice';
import baseQuery from './setupApi';
  export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (credentials) => ({
          url: '/login',
          method: 'POST',
          body: credentials,
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;

            dispatch(setCredentials(data));
          } catch(err) {
            
            // handle error
          }
        },
      }),
      register: builder.mutation({
        query: (body) => ({
          url: '/register',
          method: 'POST',
          body,
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(setCredentials(data));
          } catch {
            // handle error
          }
        },
      }),
      verification: builder.mutation({
        query: (body) => ({
          url: '/teams/invite/register',
          method: 'POST',
          body,
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(setCredentials(data));
          } catch {
            // handle error
          }
        },
      }),
      getUser: builder.mutation({
        query: () => ({url:'/profile', method: "GET"}),
        async onQueryStarted(arg, {dispatch, queryFulfilled}){
            try{
                const {data} = await queryFulfilled
                dispatch(setDataUser(data.data))

            }catch {

            }
        }
      }),
    }),
  });
  
  export const { useLoginMutation, useGetUserMutation, useRegisterMutation, useVerificationMutation } = authApi;
  