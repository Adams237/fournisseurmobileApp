import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        id: '',
        products: [],
        price: 0,
        paid: false,
        delivered: false,
        quantity: 0
    },

    reducers: {
        addProduct: (state, action) => {
            const date = new Date()
            if (state.products.length > 0) {
                const product = state.products.find(item => item.id === action.payload.product.id)
                if (!product) {
                    state.products.push({...action.payload.product, paid:false})
                    state.price += Number(action.payload.product.sale_price?action.payload.product.sale_price:action.payload.product.original_price)
                    state.id = date.getTime()
                    state.quantity += 1
                }
            } else {
                state.products.push({...action.payload.product,paid:false})
                state.price += Number(action.payload.product.sale_price?action.payload.product.sale_price:action.payload.product.original_price)
                state.id = date.getTime()
                state.quantity += 1
            }
        },
        validatCart: (state, action) => {
            const date = new Date()
            if (state.products.length > 0) {
                state.products = [...action.payload.products];
                state.paid = true;
                state.price = Number(action.payload.price);
                state.id = date.getTime()
                state.quantity = Number(action.payload.quantity);
            }
        },
        removeProduct: (state, action) => {

            if (state.products.length > 0) {
                state.products = state.products.filter(product => product.id !== action.payload.id)
                state.quantity -= 1;
                state.price -= Number(action.payload.sale_price? action.payload.sale_price : action.payload.original_price)
            }

        },
        deleteCart: (state, action) => {
            state.products = []
            state.price = 0
            state.paid = false
            state.delivered = false
            state.quantity = 0
        }
    }
})

export const { addProduct, validatCart, removeProduct, deleteCart } = cartSlice.actions
export default cartSlice.reducer;