import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: '',
	description: '',
	price: '',
};

const serviceSlice = createSlice({
	name: 'services',
	initialState,
	reducers: {
		saveName: (state, action) => {
			state.name = action.payload;
		},
		saveDescription: (state, action) => {
			state.description = action.payload;
		},
		savePrice: (state, action) => {
			state.price = action.payload;
		},
	},
});

export const { saveName, saveDescription, savePrice } = serviceSlice.actions;

export const selectServices = (state) => state.services;

export default serviceSlice.reducer;
