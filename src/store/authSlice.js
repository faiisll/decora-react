import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        token: localStorage.getItem('token') || null,
        dataUser: null
    },
    reducers: {
        setAuth(state, action){
            state.isAuth = action.payload
        },
        setDataUser(state, action){
            state.dataUser = action.payload
        },
        setCredentials: (state, action) => {

            state.isAuth = true;
            const { data, token } = action.payload;
            state.dataUser = data;
            state.token = token;
            localStorage.setItem('token', token);
        },
        logout: (state) => {
            state.isAuth = false
            state.dataUser = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    }
})

export const {setAuth, setCredentials, logout, setDataUser} = authSlice.actions

export default authSlice.reducer