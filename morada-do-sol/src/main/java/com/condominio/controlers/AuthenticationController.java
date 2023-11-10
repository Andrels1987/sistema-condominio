package com.condominio.controlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.autoconfigure.observation.ObservationProperties.Http;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.condominio.Services.TokenService;
import com.condominio.models.LoginReturnDTo;
import com.condominio.models.SessionDto;
import com.condominio.models.User;
import com.condominio.repositorios.RepositorioUser;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RequestMapping("/")
@RestController
public class AuthenticationController {    
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    RepositorioUser repositorioUser;

    @Autowired
    TokenService tokenService;
    
    
    
   
    @PostMapping(path = "/auth/login", consumes = {"*/*"})
    public ResponseEntity<LoginReturnDTo> login(@RequestBody @Valid User user){
                           
        Authentication auth = null;
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(user.getLoginEmail(), user.getPassword(), user.getAuthorities());                             
            auth = authenticationManager.authenticate(usernamePassword);
            var token = tokenService.generateToken((User) auth.getPrincipal());  
            SessionDto.saveToken(token);
            return ResponseEntity.ok(new LoginReturnDTo(token));
        } catch (AuthenticationException e) {
            System.out.println("AUTH EXCEPTION "+e.getMessage());
        } catch (Exception e) {
            System.out.println("EXCEPTION "+e.getMessage());
        }
        return ResponseEntity.ok(new LoginReturnDTo(null));
        
    }

    @PostMapping("/auth/register")
    public String regitrar(@RequestBody @Valid User user){
        System.out.println("User : " + user);
        return "LOGIN";
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<LoginReturnDTo> logout(){
        SessionDto.saveToken(null);
        return ResponseEntity.ok(new LoginReturnDTo(""));
    }
    @GetMapping("/auth/token")
    public ResponseEntity<LoginReturnDTo> getToken(){
       var token = SessionDto.showToken();
       if(token != null){
           return ResponseEntity.ok(new LoginReturnDTo(token));
        }
        return ResponseEntity.ok(new LoginReturnDTo(null));
    }
}
