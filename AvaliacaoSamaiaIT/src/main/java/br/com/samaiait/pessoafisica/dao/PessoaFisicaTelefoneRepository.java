package br.com.samaiait.pessoafisica.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.samaiait.pessoafisica.entities.PessoaFisica;
import br.com.samaiait.pessoafisica.entities.PessoaFisicaTelefone;

public interface PessoaFisicaTelefoneRepository extends JpaRepository<PessoaFisicaTelefone, Long> {
      List<PessoaFisicaTelefone> findByPessoaFisica(PessoaFisica id);
      
      void deleteAllByPessoaFisica(PessoaFisica id);
}
