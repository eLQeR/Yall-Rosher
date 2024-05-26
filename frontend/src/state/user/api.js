import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../api';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (credentials) => ({
        url: '/user/token/',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (res) => ({
        refreshToken: res.refresh,
        accessToken: res.access,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => {
        return {
          url: '/user/register/',
          method: 'POST',
          body: credentials,
        };
      },
    }),
    getUser: builder.query({
      query: () => '/user/me/',
    }),
  }),
});

export const { useSigninMutation, useSignupMutation, useLazyGetUserQuery } =
  userApi;
