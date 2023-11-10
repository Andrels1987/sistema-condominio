import {configureStore} from '@reduxjs/toolkit'
import entregadorReducer from './entregadorSlice'
import { apiSlice } from '../features/api/apiSlice'
import  contadorReducer  from './user'

//erros.
    //color reducerPath ao inves de reducer linha 10
export const store = configureStore({
    reducer :{
        user : contadorReducer,
        entregador : entregadorReducer,
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    //obrigado colocar este declaração
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
    
})