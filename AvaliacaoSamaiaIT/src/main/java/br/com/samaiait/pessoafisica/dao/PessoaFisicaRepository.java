package br.com.samaiait.pessoafisica.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.samaiait.pessoafisica.entities.PessoaFisica;

public interface PessoaFisicaRepository extends JpaRepository<PessoaFisica, Long>{

}
