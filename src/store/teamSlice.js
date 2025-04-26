import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  usersOnline: {},
}

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setUserOnline: (state, action) => {
      state.usersOnline = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserOnline } = teamSlice.actions

export default teamSlice.reducer