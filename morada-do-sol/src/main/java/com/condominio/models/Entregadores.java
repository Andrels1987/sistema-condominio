package com.condominio.models;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document("entregadores")
public class Entregadores {
    @Id
    private String id;
    private String nome;
    private String numeroDocumento;
    private String empresa;
    private String foto;
    private LocalDateTime criadoEm;

    public Entregadores() {
      
    }

    public Entregadores(String id, String nome, String numeroDocumento, String empresa, String foto, LocalDateTime criadoEm) {
        this.id = id;
        this.nome = nome;
        this.numeroDocumento = numeroDocumento;
        this.empresa = empresa;
        this.foto = foto;
        this.criadoEm = criadoEm;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNumeroDocumento() {
        return numeroDocumento;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public String getEmpresa() {
        return empresa;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }
    

    

    @Override
    public String toString() {
        return "Entregadores [id=" + id + ", nome=" + nome + ", numeroDocumento=" + numeroDocumento + ", empresa="
                + empresa + ", foto=" + foto + ", criadoEm=" + criadoEm + "]";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }

    
    
}
