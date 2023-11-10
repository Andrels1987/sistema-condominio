package com.condominio.repositorios;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.condominio.models.Entregadores;

public interface RepositorioDeEntregadores extends MongoRepository<Entregadores, String>{
    
}
