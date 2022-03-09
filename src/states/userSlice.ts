import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice(
    {
        name: 'userSlice',
        initialState: {
            user: null,
            isLoading: true,
        },
        reducers: {
            setUser: (state, action) => {
                state.user = localStorage.token
            },
        },
    });
export const { setUser } = userSlice.actions
export default userSlice.reducer
