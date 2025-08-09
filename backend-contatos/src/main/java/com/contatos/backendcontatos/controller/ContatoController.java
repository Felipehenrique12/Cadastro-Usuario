package com.contatos.backendcontatos.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.contatos.backendcontatos.modelo.Contato;
import com.contatos.backendcontatos.service.ContatoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contatos")
@CrossOrigin(origins = "*")
public class ContatoController {

    private final ContatoService service;

    public ContatoController(ContatoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@Valid @RequestBody Contato contato) {
        String celular = contato.getCelular();
        System.out.println("Valor do celular: " + celular); // Log para depuração
        
        if (contato.getNome() == null || contato.getNome().isEmpty()) {
        	return ResponseEntity.badRequest().body("O preenchimento do nome é obrigatório");
        }
        
        if (celular == null || celular.isEmpty()) {
            return ResponseEntity.badRequest().body("O preenchimento do celular é obrigatório.");
        }

        Optional<Contato> contatoExistente = service.buscarPorCelular(celular);
        if (contatoExistente.isPresent()) {
            return ResponseEntity.badRequest().body("Contato já cadastrado com este celular.");
        }

        return ResponseEntity.ok(service.salvar(contato));
    }

    @GetMapping
    public List<Contato> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contato> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Contato contato) {
        return ResponseEntity.ok(service.atualizar(id, contato));
    }

    @PatchMapping("/{id}/inativar")
    public ResponseEntity<?> inativar(@PathVariable Long id) {
        service.inativar(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/favoritar")
    public ResponseEntity<?> favoritar(@PathVariable Long id) {
        service.favoritar(id);
        return ResponseEntity.noContent().build();
    }
}