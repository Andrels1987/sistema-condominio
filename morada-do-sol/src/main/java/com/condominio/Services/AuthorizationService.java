package com.condominio.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.condominio.repositorios.RepositorioUser;


@Service
public class AuthorizationService implements UserDetailsService {

    @Autowired
    RepositorioUser repositorioUser;

    @Override
    public UserDetails loadUserByUsername(String loginEmail) throws UsernameNotFoundException {
        UserDetails user = repositorioUser.getUserByLoginEmail(loginEmail);
        var au = user.getAuthorities();
        System.out.println(au);
        return user;
    }
    
}
