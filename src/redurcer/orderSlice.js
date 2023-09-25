import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        values: []
    },
    reducers: {
        addOrder(state, action) {
            state.values.push(action.payload);
        },
        deletOrder(state, action) {
            state.values = []
        },
        validateLivraison(state, action) {
            for (let index = 0; index < state.values.length; index++) {
                if (state.values[index].id === action.payload) {
                    const element = state.values[index]
                    element.delivered = true
                    for (let i = 0; i < element.products.length; i++) {
                        element.products[i].paid = true
                        
                    }
                    state.values.splice(index, 1, element);
                }

            }
        }
    }
})

export const { addOrder, deletOrder, validateLivraison } = orderSlice.actions;

export default orderSlice.reducer