package com.condominio.models;

import org.springframework.data.mongodb.core.mapping.DocumentReference;

public class Dependente {
    private String parentesco;
    @DocumentReference
    private Moradores dependente;
    public Dependente(String parentesco, Moradores dependente) {
        this.parentesco = parentesco;
        this.dependente = dependente;
    }
    public Dependente() {
        
    }
    public String getParentesco() {
        return parentesco;
    }
    public void setParentesco(String parentesco) {
        this.parentesco = parentesco;
    }
    public Moradores getDependente() {
        return dependente;
    }
    public void setDependente(Moradores dependente) {
        this.dependente = dependente;
    }
    @Override
    public String toString() {
        return "Dependente [parentesco=" + parentesco + ", dependentes=" + dependente + "]";
    }

    
}
