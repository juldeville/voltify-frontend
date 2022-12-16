import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { id: null },
};

export const outletSlice = createSlice({
    name: 'outlet',
    initialState,
    reducers: {
        registerOutlet: (state, action) => {
            state.value.id = action.payload.id;
        },
    },
});

export const { registerOutlet } = outletSlice.actions;
export default outletSlice.reducer;
