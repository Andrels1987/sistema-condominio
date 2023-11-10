package com.condominio.controlers;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.condominio.models.Veiculo;
import com.condominio.repositorios.RepositorioDeVeiculos;

import jakarta.websocket.server.PathParam;


@RestController
@RequestMapping("/")
public class VeiculoController {
    @Autowired
    private RepositorioDeVeiculos repositorioDeVeiculos;


    @GetMapping("veiculos")
    public List<Veiculo> getAllVeiculos(){
        return repositorioDeVeiculos.findAll(Sort.by(Sort.Direction.ASC, "placa")); 
     }

     @GetMapping("veiculos/save")
    public List<Veiculo> inserirVeiculos(){
        List<Veiculo> list = new ArrayList<>();
        list.add(new Veiculo("Civic", "Branco", "", "HRV7B89", "S 2", "HONDA"));
        list.add(new Veiculo("Uno", "Vermelho", "", "LTM4623", "S 1", "FIAT"));
        list.add(new Veiculo("Civic", "Branco", "", "LHX7R51", "Parqueamento", "TOYOTA"));
        //Veiculo v = new Veiculo("Civic", "Branco", "", "LHX7R51", "Parqueamento", "TOYOTA");
        return repositorioDeVeiculos.saveAll(list);
         //return "Salvo";
     }

     @GetMapping("veiculo/{id}")
    public ResponseEntity<Veiculo> getVeiculoPelaPlaca(@PathVariable("id") String id){
        Veiculo v = repositorioDeVeiculos.getVeiculoById(id);
        System.out.println("VEICULO: " + v );
        if(v != null){
           return ResponseEntity.ok(v);
        }
        return ResponseEntity.ok(new Veiculo());
     }
}
