package com.condominio.models;


import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("entrega_servico")
public class EntregaServico {
    @Id
    private String id;
    //private Moradores morador;
    private String nomeMorador;
    private Character bloco;
    private String apartamento;
    //private Entregadores entregador;
    private String nomeEntregador;
    private String idEntregador;
    private String observacao;
    private String empresaEntregador;
    private String numeroDocumentoEntregador;
    private LocalDateTime dataEntregaServico;

    
    public EntregaServico() {
    }


   


    public EntregaServico(String nomeMorador, Character bloco, String apartamento, String nomeEntregador,
            String idEntregador, String empresaEntregador, String numeroDocumentoEntregador,
            LocalDateTime dataEntregaServico, String observacao) {
        this.nomeMorador = nomeMorador;
        this.bloco = bloco;
        this.apartamento = apartamento;
        this.nomeEntregador = nomeEntregador;
        this.idEntregador = idEntregador;
        this.empresaEntregador = empresaEntregador;
        this.numeroDocumentoEntregador = numeroDocumentoEntregador;
        this.dataEntregaServico = dataEntregaServico;
        this.observacao = observacao;
    }





    public EntregaServico(String id, String nomeMorador, Character bloco, String apartamento, String nomeEntregador,
            String idEntregador, String empresaEntregador, String numeroDocumentoEntregador,
            LocalDateTime dataEntregaServico, String observacao) {
        this.id = id;
        this.nomeMorador = nomeMorador;
        this.bloco = bloco;
        this.apartamento = apartamento;
        this.nomeEntregador = nomeEntregador;
        this.idEntregador = idEntregador;
        this.empresaEntregador = empresaEntregador;
        this.numeroDocumentoEntregador = numeroDocumentoEntregador;
        this.dataEntregaServico = dataEntregaServico;
        this.observacao = observacao;
    }





    public String getId() {
        return id;
    }


    public void setId(String id) {
        this.id = id;
    }


    public String getNomeMorador() {
        return nomeMorador;
    }


    public void setNomeMorador(String nomeMorador) {
        this.nomeMorador = nomeMorador;
    }


    public Character getBloco() {
        return bloco;
    }


    public void setBloco(Character bloco) {
        this.bloco = bloco;
    }


    public String getApartamento() {
        return apartamento;
    }


    public void setApartamento(String apartamento) {
        this.apartamento = apartamento;
    }




    public LocalDateTime getDataEntregaServico() {
        return dataEntregaServico;
    }


    public void setDataEntregaServico(LocalDateTime dataEntregaServico) {
        this.dataEntregaServico = dataEntregaServico;
    }


    public String getNomeEntregador() {
        return nomeEntregador;
    }


    public void setNomeEntregador(String nomeEntregador) {
        this.nomeEntregador = nomeEntregador;
    }


    public String getIdEntregador() {
        return idEntregador;
    }


    public void setIdEntregador(String idEntregador) {
        this.idEntregador = idEntregador;
    }


    public String getEmpresaEntregador() {
        return empresaEntregador;
    }


    public void setEmpresaEntregador(String empresaEntregador) {
        this.empresaEntregador = empresaEntregador;
    }


    public String getNumeroDocumentoEntregador() {
        return numeroDocumentoEntregador;
    }


    public void setNumeroDocumentoEntregador(String numeroDocumentoEntregador) {
        this.numeroDocumentoEntregador = numeroDocumentoEntregador;
    }

    @Override
    public String toString() {
        return "EntregaServico [id=" + id + ", nomeMorador=" + nomeMorador + ", bloco=" + bloco + ", apartamento="
                + apartamento + ", nomeEntregador=" + nomeEntregador + ", idEntregador=" + idEntregador
                + ", observacao=" + observacao + ", empresaEntregador=" + empresaEntregador
                + ", numeroDocumentoEntregador=" + numeroDocumentoEntregador + ", dataEntregaServico="
                + dataEntregaServico + "]";
    }





    public String getObservacao() {
        return observacao;
    }





    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }


    
}
