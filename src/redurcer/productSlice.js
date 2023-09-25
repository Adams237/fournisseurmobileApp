import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name:'products',
    initialState:{
        value:[]
    },

    reducers:{
        addProduct: (state, action)=>{
            state.value.pop(),
            state.value.push(action.payload)
        }
    }
})

export const {addProduct} = productSlice.actions;
export default productSlice.reducer