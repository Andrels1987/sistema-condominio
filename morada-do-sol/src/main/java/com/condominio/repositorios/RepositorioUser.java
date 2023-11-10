package com.condominio.repositorios;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.condominio.models.User;



public interface RepositorioUser extends MongoRepository<User, String>{
    UserDetails getUserByLoginEmail(String loginEmail);
}
