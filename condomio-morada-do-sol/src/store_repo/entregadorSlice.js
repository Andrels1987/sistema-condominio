import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import moment from "moment/moment";

export const fetchEntregadores = createAsyncThunk('entregadores/fetchEntregadores', async(token) =>{
    try {
        const response = await axios.get('http://192.168.1.105:8023/entregadores', 
        {
            headers: 
            {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.data
        return [...data]   
    } catch (error) {
        console.log(error);
    }
})

export const deleteEntregadores = createAsyncThunk('entregadores/deleteEntregadores', async({id,t}) =>{
    console.log("TOKEN : ", t);
    try {
        const response = await axios.delete(`http://192.168.1.105:8023/delete/entregador/${id}`,
        {
            headers: 
            {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${t}`
            }
        })
        const data = await response.data
        return data   
    } catch (error) {
        console.log(error);
    }
})
export const postEntregadores = createAsyncThunk('entregadores/postEntregadores', async(entregador, token) =>{
    try {
        if(token !== null){
            const criadoEm = new Date()
            entregador = {...entregador, criadoEm }
            console.log("EM POST : ", entregador);
            const response = await axios.post("http://192.168.1.105:8023/add/entregador", entregador, {
                headers:{
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}`
                }
            });
            //const response = await axios.post("http://192.168.1.105:8023/add/entregador", entregador);
            const data = await response.data           
            console.log("DATA : ", data);
            return data
        }else{
            return {};
        }         
    } catch (error) {
        console.log(error);
    }
})
export const updateEntregador = createAsyncThunk('entregadores/updateEntregador', async(entregador, token) =>{
    try {
        if(token !== null){

            const id = entregador.id;
            const response = await axios.put(`http://192.168.1.105:8023/update/entregador/${id}`, entregador, {
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.data
        console.log("DATA : ", data);
        return data   
    }else{
        return {}
    }
    } catch (error) {
        console.log(error);
    }
})

const initialState= {
    entregadores: [],
    status: 'idle',
    error : null
}
export const entregadorSlice = createSlice({
    name: "entregador",
    initialState,
    reducers: {
        addEntregador: {
            reducer : (state, action) => {
                console.log("PAYLOAD");
                state.entregadores.push("entregador4")
            },
            //prepare : () => {}
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchEntregadores.pending, (state, action)=>{
                state.status = 'loading'
                action.payload = []
            })
            .addCase(fetchEntregadores.fulfilled, (state, action)=>{  
                   if(action.payload === undefined){
                    return state.entregadores = []
                   }         
                const loadedEntregadores = action.payload.map(entregador =>{
                    entregador.criadoEm = moment(entregador.criadoEm).format('YYYY-mm-dd');
                    return entregador;
                })

                state.entregadores = loadedEntregadores;
            })
            .addCase(fetchEntregadores.rejected, ()=>{
                console.log("rejected");
            })
            .addCase(deleteEntregadores.pending, (state, action)=>{
                state.status = 'loading'
            })
            .addCase(deleteEntregadores.fulfilled, (state, action)=>{  
                    console.log("ACTION : ", action.payload);   
                    console.log("STATE : ",state); 

                if(action.payload === ""){
                    console.log("Nenhum Entregador deletado")
                    return;
                }
                const id = action.payload;
                const entregadoresRestantes = state.entregadores.filter(entregador => entregador.id !== id)
                state.entregadores = entregadoresRestantes;

            })
            .addCase(deleteEntregadores.rejected, ()=>{
                console.log("rejected");
            })
            .addCase(postEntregadores.pending, (state, action)=>{
                state.status = 'loading'
            })
            .addCase(postEntregadores.fulfilled, (state, action)=>{  
                 const newEntregador = {
                    id: action.payload.id,
                    nome: action.payload.nome,
                    numeroDocumento: action.payload.numeroDocumento,
                    empresa: action.payload.empresa,
                    foto: action.payload.foto, 
                    criadoEm: action.payload.criadoEm
                }
                state.entregadores.push(newEntregador);
                
            })
            .addCase(postEntregadores.rejected, ()=>{
                console.log("rejected");
            })
            .addCase(updateEntregador.fulfilled, (state, action)=>{
                console.log("fulfilled : ", action.payload);
                if(action.payload.id === ""){
                    console.log("NADA ACONTECEU");
                    return;
                }
                const entregadores = state.entregadores.filter(entregador => entregador.id !== action.payload.id)
                state.entregadores = [...entregadores, action.payload];
            })
    }
})
export const getEntregadores = (state) => state.entregador.entregadores
export const getEntregadorPeloId = (state, id) => state.entregador.entregadores.find(entregador => entregador.id === id)
export const getStatus = (state) => state.entregador.status
export const { addEntregador } = entregadorSlice.actions
export default entregadorSlice.reducer;