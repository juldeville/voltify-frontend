import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { id: null, price: null },
};

export const outletSlice = createSlice({
    name: 'outlet',
    initialState,
    reducers: {
        registerOutlet: (state, action) => {
            state.value.id = action.payload.id;
            state.value.price = action.payload.price;

            console.log('action payload ID', action.payload.id)
            console.log('action payload Price', action.payload.price)

        },
    },
});

export const { registerOutlet } = outletSlice.actions;
export default outletSlice.reducer;
