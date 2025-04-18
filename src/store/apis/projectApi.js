import { createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './setupApi';

  export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery,
    endpoints: (builder) => ({
        getProject: builder.query({
            query: () => ({url: '/projects', method: "GET"}),

        }),
        getProjectById: builder.query({
          query: (id) => ({url: `/project/${id}`, method: "GET"})
        })
    }),
  });
  
  export const { useGetProjectQuery, useGetProjectByIdQuery } = projectApi;
  