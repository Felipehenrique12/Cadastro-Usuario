package com.contatos.backendcontatos.repository;

import com.contatos.backendcontatos.modelo.Contato;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface ContatoRepository extends JpaRepository<Contato, Long> {
    Optional<Contato> findByCelular(String celular); 
}
