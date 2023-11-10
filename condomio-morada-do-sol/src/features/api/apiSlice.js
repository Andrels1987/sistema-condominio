import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = process.env.BASE_URL;
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    tagTypes: ["moradores"],
    endpoints: (builder) => ({
        getMoradores: builder.query({
            query: ({token}) => ({
                url: '/moradores',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "text/plain"
                },
            }),
            providesTags: ['moradores']
        }),
        addMorador: builder.mutation({
            query: ({morador, token}) => ({
                url: "/add/morador",
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "text/plain"
                },
                body: {
                    nome: morador.nome,
                    sobrenome: morador.sobrenome,
                    apartamento: '1202',
                    bloco: 'c',
                    telefone: morador.telefone,
                    foto: morador.foto,
                    veiculo: morador.veiculo,
                    dependentes: morador.dependentes,
                    criadoEm: new Date(),
                }
            }),
            invalidatesTags: ['moradores']
        }),
        updateMorador: builder.mutation({
            query: ({morador, token}) => ({
                url: `/update/morador/${morador.id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "text/plain"
                },
                body: morador
            }),
            invalidatesTags: ['moradores']
        }),
        getMoradorPeloId: builder.query({
            query: ({token, id}) => ({
                url: `/moradores/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "text/plain"
                },
                method: 'GET',
            }),
            invalidatesTags: ['moradores']
        }),
        getLogin: builder.mutation({
            query: ({login}) => ({
                url: "/auth/login",
                method: 'POST',  
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': ['http://localhost:3000'],
                    'Access-Control-Allow-Credentials': 'true',
                    'Host': ['http://localhost:3000'],
                },                          
                body: {
                    "username": "andrels",
                    loginEmail: login.email,
                    password: login.password
                }
            }),
            invalidatesTags: ['moradores']
        }),
        addEntrega: builder.mutation({
            //precisa ser o mesmo nome de quando é chamado
            //se foi passado morador, o parametro tem ser morador.
            query: ({ moradorEscolhido, entregador, token }) => ({
                // query : (entrega) => ({
                url: "/add/servico",
                headers:{
                    Authorization: `Bearer ${token}`,
                    //erro-resolvido: passei de 'text/plain' para 'application/json'
                    "content-type": "application/json"
                },
                method: 'POST',
                body: {
                    /* nomeMorador: entrega.nomeMorador,
                    bloco: entrega.bloco,
                    apartamento: entrega.apartamento,
                    nomeEntregador: entrega.nomeEntregador,
                    idEntregador: entrega.idEntregador,
                    empresaEntregador: entrega.empresaEntregador,
                    numeroDocumentoEntregador: entrega.numeroDocumentoEntregador,
                    dataEntregaServico: new Date()   */
                    nomeMorador: moradorEscolhido.nome,
                    bloco: moradorEscolhido.bloco,
                    apartamento: moradorEscolhido.apartamento,
                    nomeEntregador: entregador.nome,
                    idEntregador: entregador.id,
                    empresaEntregador: entregador.empresa,
                    numeroDocumentoEntregador: entregador.numeroDocumento,
                    observacao: moradorEscolhido.observacao,
                    dataEntregaServico: new Date()
                }
            }),
            invalidatesTags: ['moradores']
        }),
        getEntregas: builder.query({
            query: ({token}) => ({
                url:`/entrega_servico`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "text/plain"
                }}),
            providesTags: ['moradores']
        }),
        getVeiculos: builder.query({
            query: ({token}) => ({
                url: `/veiculos`,
                headers : {
                    Authorization: `Bearer ${token}`,
                    "content-type": "text/plain"
                },
                method: 'GET',
            }),
            providesTags: ['moradores']
        }),
        getVeiculoPeloId: builder.query({
            query: ({token, id}) => ({
                url: `/veiculo/${id}`,
                headers : {
                    Authorization: `Bearer ${token}`,
                    "content-type": "text/plain"
                },
                method: 'GET',
            }),
            providesTags: ['moradores']
        }),
        getToken: builder.query({
            query: () => ({
                url: `/auth/token`,
                method: 'GET',
            }),
            providesTags: ['moradores']
        }),
        getProprietarioPeloIdVeiculo: builder.query({
            query: ({token, id}) => ({
                url: `/moradores/proprietario/${id}`,
                headers : {
                    Authorization: `Bearer ${token}`,
                    "content-type": "text/plain"
                },
                method: 'GET',
            }),
            providesTags: ['moradores']
        }),
        logoutApp: builder.mutation({
            query: () => ({
                url: `/auth/logout`,
                method: 'POST',
            }),
            providesTags: ['moradores']
        }),
    })
})

export const {
    useGetMoradoresQuery,
    useGetMoradorPeloIdQuery,
    useAddMoradorMutation,
    useUpdateMoradorMutation,
    useAddEntregaMutation,
    useGetEntregasQuery,
    useGetVeiculosQuery,
    useGetLoginMutation,
    useGetVeiculoPeloIdQuery,
    useGetProprietarioPeloIdVeiculoQuery,
    useLogoutAppMutation, 
    useGetTokenQuery
} = apiSlice