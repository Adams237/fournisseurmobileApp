import { createSlice } from "@reduxjs/toolkit";

export const UserSlice =  createSlice({
    name:'user',
    initialState: {
        value:[]
    },
    reducers:{
        auth:(state, action) =>{
            state.value.pop()
            state.value.push(action.payload)
            // saveAsyncData(state);
        },
        signOut:(state)=>{
            state.value.pop()
            // AsyncStorage.removeItem('userLeratel');
        }
    }
});
export const {auth, signOut} = UserSlice.actions;

export default UserSlice.reducer;
