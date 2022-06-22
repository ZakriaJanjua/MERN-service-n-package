import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    description: '',
    services: [],
    name: ''
}

const packageSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {
        saveDescription: (state, action) => {
            state.description = action.payload
        },
        addService: (state, action) => {
            state.services.push(action.payload)
        },
        saveName: (state, action) => {
            state.name = action.payload
        }
    }
})


export const {saveDescription, addService, saveName} = packageSlice.actions

export const selectPackage = state => state.packages

export default packageSlice.reducer