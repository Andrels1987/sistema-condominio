package com.condominio.configuration;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.condominio.Services.TokenService;
import com.condominio.models.SessionDto;
import com.condominio.repositorios.RepositorioUser;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    
    @Autowired
    TokenService tokenService;
    @Autowired
    RepositorioUser userRepositorio;
    @Autowired
    HttpSession session;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        var token = this.recoverToken(request);
         System.out.println("TOKEN : " + token);
         var sessionToken = SessionDto.showToken();
         System.out.println("SESSION TOKEN : " + sessionToken);
         var checkedTk = (token != null && !token.equals("Bearer")) ? token : sessionToken; 
         if (checkedTk != null) {              
            System.out.println("Session token: " + checkedTk);
            var loginEmail = tokenService.validateToken(checkedTk);
            UserDetails user = userRepositorio.getUserByLoginEmail(loginEmail);
            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest req) {

        var authHeader = req.getHeader("Authorization");
        if (authHeader == null) {
            return null;
        }
        var result = authHeader.replace("Bearer ", "");
        System.out.println("RESULT = " + result);
        return authHeader.replace("Bearer ", "");

    }

}
