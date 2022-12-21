import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { id: null },
};

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        registerTransaction: (state, action) => {
            state.value.id = action.payload.id;
            state.value.duration = action.payload.duration;

        },
    },
});

export const { registerTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
