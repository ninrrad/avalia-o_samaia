package br.com.samaiait.pessoafisica.service;

import org.springframework.data.domain.Page;

import br.com.samaiait.exception.SamaiaException;
import br.com.samaiait.pessoafisica.entities.PessoaFisica;

/**
 * Classe reponsável pela abstração e conexão da regra de negócio 
 * 
 *  para uma pessoa fisica.
 * 
 * 
 * @author David S. Vladimir 08/02/2020  
 *  
 */

public interface PessoaFisicaService {
	
	/**
	 * Método responssável por validar e persistir uma PessoaFisica
	 * @param pessoa
	 * @throws Exception
	 */
	public void salvar(PessoaFisica pessoaFisica) throws SamaiaException;
	
	/**
	 * Método responssável por atualizar uma PessoaFisica já persistida
	 * @param PessoaFisica
	 * @throws Exception
	 */
	public void atualizar(PessoaFisica pessoaFisica) throws SamaiaException;
	
	/**
	 * Método responssável por atualizar uma PessoaFisica já persistida 
	 * @param pessoa
	 */
	public void remover(PessoaFisica pessoaFisica) throws SamaiaException;
	
	/**
	 * Método responssável por recuperar uma PessoaFisica persistida
	 * @param idPessoaFisica
	 * @return
	 */
	public PessoaFisica obterPessoaFisica(Long idPessoaFisica) throws SamaiaException;
	
	/**
	 *Método responssável por consultar as PessoaFisica persistidas
	 * @return
	 * @throws Exception 
	 */
	public Page<PessoaFisica> listarPessoasFisicas(int page, int size,String sort) throws SamaiaException;

}