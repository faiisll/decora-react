import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: true,
        dataUser: null
    },
    reducers: {
        setAuth(state, action){
            state.isAuth = action.payload
        }
    }
})

export const {setAuth} = authSlice.actions

export default authSlice.reducer