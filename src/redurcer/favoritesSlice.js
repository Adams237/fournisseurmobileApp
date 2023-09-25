import { createSlice } from '@reduxjs/toolkit'

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        value: []
    },
    reducers: {
        addProductToFavorite: (state, action) => {
            state.value.push(action.payload)
        },
        deleteProductToFavorite: (state, action) => {
            state.value = state.value.filter((product) => product.id !== action.payload.id)
        },
        destroyListFavorite : (state, action) =>{
            state.value = []
        }
    }
})

export const {addProductToFavorite, deleteProductToFavorite, destroyListFavorite} = favoriteSlice.actions
export default favoriteSlice.reducer