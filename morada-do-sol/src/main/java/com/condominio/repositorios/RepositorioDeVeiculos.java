package com.condominio.repositorios;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.condominio.models.Veiculo;

public interface RepositorioDeVeiculos extends MongoRepository<Veiculo, String>{
 public Veiculo getVeiculoById(String id); 
}