import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counterSlice"
import authReducer from "./authSlice"
import teamReducer from "./teamSlice"
import { authApi } from './apis/authApi'
import { teamApi } from './apis/teamApi'
import { projectApi } from './apis/projectApi'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        team: teamReducer,
        [authApi.reducerPath]: authApi.reducer,
        [teamApi.reducerPath]: teamApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, teamApi.middleware, projectApi.middleware)
})