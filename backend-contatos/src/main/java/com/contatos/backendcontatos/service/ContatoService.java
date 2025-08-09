package com.contatos.backendcontatos.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.contatos.backendcontatos.modelo.Contato;
import com.contatos.backendcontatos.repository.ContatoRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ContatoService implements IContatoService{

	 private final ContatoRepository repository;

	    public ContatoService(ContatoRepository repository) {
	        this.repository = repository;
	    }

	    @Override
	    public Contato salvar(Contato contato) {
	        contato.setDataCadastro(LocalDateTime.now());
	        contato.setSituacaoAtivo("S");
	        contato.setFavorito("N");
	        return repository.save(contato);
	    }

	    @Override
	    public List<Contato> listar() {
	        return repository.findAll(Sort.by(Sort.Direction.DESC, "situacaoAtivo"));
	    }

	    @Override
	    public Optional<Contato> buscarPorId(Long id) {
	        return repository.findById(id);
	    }

	    @Override
	    public Optional<Contato> buscarPorCelular(String celular) {
	        return repository.findByCelular(celular);
	    }

	    @Override
	    public Contato atualizar(Long id, Contato novo) {
	        Contato existente = repository.findById(id)
	            .orElseThrow(() -> new EntityNotFoundException("Contato não encontrado"));
	        existente.setNome(novo.getNome());
	        existente.setEmail(novo.getEmail());
	        existente.setCelular(novo.getCelular());
	        existente.setTelefone(novo.getTelefone());
	        return repository.save(existente);
	    }

	    @Override
	    public void inativar(Long id) {
	        Contato contato = repository.findById(id)
	            .orElseThrow(() -> new EntityNotFoundException("Contato não encontrado"));
	        contato.setSituacaoAtivo("N");
	        repository.save(contato);
	    }

	    @Override
	    public void favoritar(Long id) {
	        Contato contato = repository.findById(id)
	            .orElseThrow(() -> new EntityNotFoundException("Contato não encontrado"));
	        if(contato.getFavorito().equals("N")) {
	        	 contato.setFavorito("S");
	        } else {
	        	contato.setFavorito("N");
	        }
	       
	        repository.save(contato);
	    }

	}