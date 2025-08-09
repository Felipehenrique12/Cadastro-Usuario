package com.contatos.backendcontatos.service;

import java.util.List;
import java.util.Optional;

import com.contatos.backendcontatos.modelo.Contato;

public interface IContatoService {
    Contato salvar(Contato contato);
    List<Contato> listar();
    Optional<Contato> buscarPorId(Long id);
    Optional<Contato> buscarPorCelular(String celular);
    Contato atualizar(Long id, Contato contatoAtualizado);
    void inativar(Long id);
    void favoritar(Long id);
}