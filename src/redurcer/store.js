import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, PURGE, REGISTER, REHYDRATE, FLUSH, PAUSE, PERSIST, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import  UserSlice  from './userSlice';
import  cartSlice  from './cartSlice';
import orderSlice from './orderSlice';
import productSlice from './productSlice';
import favoritesSlice from './favoritesSlice';


const routeRedurcer = combineReducers({
    currentUSer : UserSlice,
    userCart : cartSlice,
    userOrder: orderSlice,
    productList: productSlice,
    favorites: favoritesSlice
})
const persisionfig = {
    key: 'root',
    storage: AsyncStorage,
    version:1
    // whitelist:['currentUser']
};

const persiteRedurcer = persistReducer(persisionfig, routeRedurcer);

export const store = configureStore({
    reducer:persiteRedurcer,
    middleware:getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,REGISTER,PURGE]
        }
    })
});

export const persiststore = persistStore(store)
