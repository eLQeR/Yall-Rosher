import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { logout, setTokens } from './user/slice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:8000/api',
  credentials: 'omit',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().userSlice.accessToken;
    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 401) {
    const refreshToken = api.getState().userSlice.refreshToken;

    const refreshResult = await baseQuery(
      {
        method: 'POST',
        url: '/user/token/refresh/',
        body: { refresh: refreshToken },
      },
      api,
      extraOptions,
    );

    if (refreshResult?.data) {
      api.dispatch(
        setTokens({
          accessToken: refreshResult.data.access,
        }),
      );

      return await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
