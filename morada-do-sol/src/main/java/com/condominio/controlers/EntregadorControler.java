package com.condominio.controlers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.condominio.models.Entregadores;
import com.condominio.models.SessionDto;
import com.condominio.repositorios.RepositorioDeEntregadores;

//PROBLEMAS RESOLVIDOS:
//ADICIONAR IP DA MAQUINA NO MONGO    DB PARA PODER ACESSAR DATABASE
//erro to conectar socket : adicionar ip da maquina
//COLOCAR O ARQUIVO MAIN NA PASTA PRINCIPADO DO PROJETO
//@CrossOrigin(origins = {"http://192.168.1.105:3000/", "http://192.168.1.100:3000", "http://192.168.1.104:3000", "http://localhost:3000"})

@RequestMapping("/")
@RestController
public class EntregadorControler {

    @Autowired
    private RepositorioDeEntregadores repositorioDeEntregadores;

    @GetMapping("entregadores")
    public List<Entregadores> getEntregadores() {
        System.out.println("entregadores");
        List<Entregadores> entregadores = this.repositorioDeEntregadores.findAll();
        return entregadores;
    }

    @GetMapping("entregador/{id}")
    public Entregadores getEntregadorPeloId(@PathVariable("id") String id) {
        Optional<Entregadores> entregador = this.repositorioDeEntregadores.findById(id);

        return entregador.get();
    }

    @PostMapping(value = "add/entregador")
    public Entregadores AddEntregador(@RequestBody Entregadores entregador) {
        // System.out.println(entregador);

        Entregadores entregadorSalvo = this.repositorioDeEntregadores.save(entregador);
        // return new Entregadores();
        return entregadorSalvo;
    }

    // @CrossOrigin(origins = {"http://192.168.1.105:3000/",
    // "http://192.168.1.100:3000", "http://192.168.1.104:3000",
    // "http://localhost:3000"}
    @DeleteMapping("delete/entregador/{id}")
    public String DeleteEntregador(@PathVariable("id") String id){  
        var token  = SessionDto.showToken();
        if(token != null){
            Optional<Entregadores> entregadorEncontrado = this.repositorioDeEntregadores.findById(id);
            if(entregadorEncontrado.isEmpty()){
                return "";
            }
            this.repositorioDeEntregadores.deleteById(id);
            return entregadorEncontrado.get().getId();
        }    
        
        return "";
    }

    @PutMapping("update/entregador/{id}")
    public Entregadores UpdateEntregador(@PathVariable("id") String id, @RequestBody Entregadores entregador) {
        Entregadores entregadorSalvo = this.repositorioDeEntregadores.findById(id).get();
        if (entregadorSalvo == null) {
            System.out.println("entregador NÃO ENCONTRADO");
            return new Entregadores();
        }
        entregadorSalvo.setNome(entregador.getNome());
        entregadorSalvo.setEmpresa(entregador.getEmpresa());
        entregadorSalvo.setNumeroDocumento(entregador.getNumeroDocumento());
        this.repositorioDeEntregadores.save(entregadorSalvo);
        return entregadorSalvo;
    }
}
