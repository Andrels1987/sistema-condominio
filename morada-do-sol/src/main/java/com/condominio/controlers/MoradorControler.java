package com.condominio.controlers;


import java.util.ArrayList;
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

import com.condominio.models.Dependente;
import com.condominio.models.Moradores;
import com.condominio.models.Veiculo;
import com.condominio.repositorios.RepositorioDeMoradores;
import com.condominio.repositorios.RepositorioDeVeiculos;

@RequestMapping("/")
@RestController
public class MoradorControler {
    
    private RepositorioDeMoradores repositorioDeMoradores;
    @Autowired
    private RepositorioDeVeiculos repositorioDeVeiculos;

    
    public MoradorControler(RepositorioDeMoradores repositorioDeMoradores){
        this.repositorioDeMoradores = repositorioDeMoradores;
    }

    @GetMapping("/moradores")
    public List<Moradores> getAllMoradores(){
        System.out.println("entrou aqui");
        List<Moradores>  moradores = repositorioDeMoradores.findAll();
       
        return moradores;
    }

    @GetMapping("/moradores/{id}")
    public Moradores getMoradorById(@PathVariable("id") String id ){
        Optional<Moradores> moradorEncontrado = repositorioDeMoradores.findById(id);
        if(moradorEncontrado.isPresent()){
            return moradorEncontrado.get();
        }
        return new Moradores(); 
    }

     @GetMapping("/moradores/proprietario/{id_veiculo}")
    public List<Moradores> getMoradorProprietarioDoVeiculo(@PathVariable("id_veiculo") String id_veiculo ){
        List<Moradores> proprietarios = new ArrayList<>();
        List<Moradores> moradores = repositorioDeMoradores.findAll();
        if(moradores != null){
            moradores.forEach(m -> {
                List<Veiculo> veiculos = m.getVeiculo();
                if(veiculos != null){
                    veiculos.forEach(v -> {
                        if(v.getId().equals(id_veiculo)){
                            proprietarios.add(m);
                        }
                    });
                }
            });
        }
       //reduzir tamanho do dados de retorno
        return proprietarios;
    }

    @PostMapping("/add/morador")
    public String adicionarMorador(@RequestBody Moradores morador ){
        //List<Moradores> vList = this.repositorioDeMoradores.findAll().stream().filter(ve -> !ve.getNome().equals(morador.getNome())).toList();
        //List<Veiculo> vList = this.repositorioDeVeiculos.findAll().stream().filter(ve -> ve.getPlaca().equals("LHX7R51")).toList();
       // morador.setDependentes(vList);
       List<Dependente> dependentesSalvos = new ArrayList<>();
       List<Veiculo> veiculosSalvos = new ArrayList<>();
       
        
       
       List<Dependente> dependentes = morador.getDependentes();
       List<Veiculo> veiculos = morador.getVeiculo();
       dependentes.forEach(dependente -> {
           Moradores m0 = repositorioDeMoradores.getMoradorByNome(dependente.getDependente().getNome());
           if (m0 == null) {
               Moradores salvo = this.repositorioDeMoradores.save(dependente.getDependente());
               if(salvo != null){
                    Dependente d0 = new Dependente();
                    d0.setParentesco(dependente.getParentesco());
                    d0.setDependente(salvo);
                   dependentesSalvos.add(d0);
                }
                System.out.println(salvo != null ? salvo.getNome() : "sem resposta");           
            }
        });
        veiculos.forEach(veiculo -> {
            
            Veiculo m = repositorioDeVeiculos.getVeiculoById(veiculo.getPlaca());
            if (m == null) {
                Veiculo salvo = this.repositorioDeVeiculos.save(veiculo);
                if(salvo != null){
                    veiculosSalvos.add(salvo);
                }
                return;
            }
            veiculosSalvos.add(m);
            return;
        });
        
        morador.setDependentes(dependentesSalvos);
        morador.setVeiculo(veiculosSalvos);
        Moradores moradoradicionado = repositorioDeMoradores.save(morador);
        if(moradoradicionado.getId() != null){
            return "morador adicionado";
        } 
        return "Erro ao adicionar morador"; 
        /* 
        */
    }

    @DeleteMapping("delete/morador/{id}")
    public String DeleteEntregador(@PathVariable("id") String id){      
        
        Optional<Moradores> moradorEncontrado = this.repositorioDeMoradores.findById(id);
        if(moradorEncontrado.isEmpty()){
            return "";
        }
        this.repositorioDeMoradores.deleteById(id);
        return moradorEncontrado.get().getId();
    }

    @PutMapping("update/morador/{id}")
    public Moradores UpdateEntregador(@PathVariable("id") String id, @RequestBody Moradores morador){       
        Moradores moradorSalvo = this.repositorioDeMoradores.findById(id).get();
        if(moradorSalvo == null){
            System.out.println("entregador NÃO ENCONTRADO");
            return new Moradores();
        }
        moradorSalvo.setNome(morador.getNome());
        moradorSalvo.setSobrenome(morador.getSobrenome());
        this.repositorioDeMoradores.save(moradorSalvo);
        return moradorSalvo;
    }
}
