package br.com.samaiait.pessoafisica.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.samaiait.pessoafisica.entities.PessoaFisica;
import br.com.samaiait.pessoafisica.entities.PessoaFisicaEndereco;

public interface PessoaFisicaEnderecoRepository extends JpaRepository<PessoaFisicaEndereco, Long> {
    List<PessoaFisicaEndereco> findByPessoaFisica(PessoaFisica id);
    
    void deleteAllByPessoaFisica(PessoaFisica id);
}
