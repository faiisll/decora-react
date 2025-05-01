import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../authSlice';
import createToast from '../../components/toast/Toast';

const url = import.meta.env.VITE_API_URL
// const baseQuery = fetchBaseQuery({
//     baseUrl: url,
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth.token;
//       if (token) headers.set('Authorization', `Bearer ${token}`);
//       return headers;
//     },
// });

const baseQuery = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  // If token is expired (e.g., 401 Unauthorized), dispatch logout
  if (result.error && result.error.status === 401) {
    
    // Dispatch logout action
    api.dispatch(logout());
    // Optionally, clear the token from localStorage or sessionStorage
    localStorage.removeItem('token');
    // Redirect to login page

    if (window.navigate) {
      window.navigate('/login', {replace: true});
      createToast({
        message: "Your session is expired!",
        type: "warning"
      })
    }else {
      window.location.href = '/login';

    }

  }

  return result;
};
export default baseQuery