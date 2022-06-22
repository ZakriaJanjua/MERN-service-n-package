import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from '../features/serviceSlice';
import packageReducer from '../features/packageSlice';

export const store = configureStore({
	reducer: {
		services: serviceReducer,
		packages: packageReducer
	},
});
