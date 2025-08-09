package com.contatos.backendcontatos.modelo;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CONTATO", schema = "DESAFIO")
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CONTATO_ID")
    private Long id;

    @NotBlank(message = "O nome é obrigatório.")
    @Size(max = 100, message = "O nome pode ter no máximo 100 caracteres.")
    @Column(name = "CONTATO_NOME", length = 100, nullable = false)
    private String nome;

    @Email(message = "E-mail inválido.")
    @Size(max = 50, message = "O e-mail pode ter no máximo 50 caracteres.")
    @Column(name = "CONTATO_EMAIL", length = 50)
    private String email;

    @NotBlank(message = "O celular é obrigatório.")
    @Pattern(regexp = "\\d{11}", message = "O celular deve conter exatamente 11 dígitos numéricos.")
    @Column(name = "CONTATO_CELULAR", length = 11, nullable = false, unique = true)
    private String celular;

    @Pattern(regexp = "\\d{10}", message = "O telefone deve conter exatamente 10 dígitos numéricos.")
    @Column(name = "CONTATO_TELEFONE", length = 10)
    private String telefone;

    @Pattern(regexp = "[SN]", message = "O campo 'favorito' deve ser 'S' (sim) ou 'N' (não).")
    @Column(name = "CONTATO_FAV", length = 1)
    private String favorito;

    @Pattern(regexp = "[SN]", message = "O campo 'situação ativa' deve ser 'S' (sim) ou 'N' (não).")
    @Column(name = "CONTATO_ST_ATIVO", length = 1)
    private String situacaoAtivo;

    @Column(name = "CONTATO_DT_CADASTRO")
    private LocalDateTime dataCadastro;
}
