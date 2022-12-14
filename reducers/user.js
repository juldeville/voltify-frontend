import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { email: null, token: null },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signin: (state, action) => {
            state.value.token = action.payload.token;
            state.value.email = action.payload.email;
        },
        updateEmail: (state, action) => {
            state.value.email = action.payload.email;
        }
    },
});

export const { signin, updateEmail } = userSlice.actions;
export default userSlice.reducer;
