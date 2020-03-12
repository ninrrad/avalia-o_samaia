package br.com.samaiait.pessoafisica.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.com.samaiait.exception.SamaiaException;
import br.com.samaiait.exception.SamaiaException.Error;
import br.com.samaiait.exception.SamaiaException.ErrorType;
import br.com.samaiait.pessoafisica.dao.PessoaFisicaEnderecoRepository;
import br.com.samaiait.pessoafisica.dao.PessoaFisicaRepository;
import br.com.samaiait.pessoafisica.dao.PessoaFisicaTelefoneRepository;
import br.com.samaiait.pessoafisica.entities.PessoaFisica;
import br.com.samaiait.pessoafisica.entities.PessoaFisicaEndereco;
import br.com.samaiait.pessoafisica.entities.PessoaFisicaTelefone;

@Service
public class PessoaFisicaServiceImpl implements PessoaFisicaService {
	
	@Autowired
	private PessoaFisicaRepository repository;
	@Autowired
	private PessoaFisicaTelefoneRepository telefoneRepository;
	@Autowired
	private PessoaFisicaEnderecoRepository enderecoRepository;

	public void salvar(PessoaFisica pessoaFisica) throws SamaiaException {
		try {
			pessoaFisica.getEnderecos().forEach(a-> a.setPessoaFisica(pessoaFisica));
			pessoaFisica.getTelefones().forEach(a-> a.setPessoaFisica(pessoaFisica));
			repository.save(pessoaFisica);
		}catch(DataAccessException  e) {
			e.printStackTrace();
			throw new SamaiaException(ErrorType.PERSISTENCE_ERROR,e);
		}catch(Exception  e) {
			throw new SamaiaException(ErrorType.PERSISTENCE_ERROR,Error.UNKNOWN_ERROR,e,null);
		}
	}

	public void atualizar(PessoaFisica pessoaFisica) throws SamaiaException {
		try {
			List<PessoaFisicaTelefone> telefones = telefoneRepository.findByPessoaFisica(pessoaFisica);
			List<PessoaFisicaEndereco> enderecos = enderecoRepository.findByPessoaFisica(pessoaFisica);
			pessoaFisica.getTelefones().forEach(a-> { 
														a.setPessoaFisica(pessoaFisica); 
														if(telefones.contains(a)) {
															telefones.remove(a); 
														}
													});
			pessoaFisica.getEnderecos().forEach(a-> { 
														a.setPessoaFisica(pessoaFisica); 
														if(enderecos.contains(a)) {
														   enderecos.remove(a); 
														}
													});

			telefoneRepository.deleteAll(telefones);
			enderecoRepository.deleteAll(enderecos);
			repository.save(pessoaFisica);
			
		}catch(DataAccessException  e) {
			e.printStackTrace();
			
			throw new SamaiaException(ErrorType.PERSISTENCE_ERROR,e);
		}catch(Exception  e) {
			throw new SamaiaException(ErrorType.PERSISTENCE_ERROR,Error.UNKNOWN_ERROR,e,null);
		}
	}
	
	@Transactional
	public void remover(PessoaFisica pessoa) throws SamaiaException {
		try {
			repository.delete(pessoa);
		}catch(DataAccessException  e) {
			throw new SamaiaException(ErrorType.PERSISTENCE_ERROR,e);
		}catch(Exception  e) {
			throw new SamaiaException(ErrorType.PERSISTENCE_ERROR,Error.UNKNOWN_ERROR,e,null);
		}
	}

	@Override
	public PessoaFisica obterPessoaFisica(Long idPessoaFisica) throws SamaiaException {
		try {
			Optional<PessoaFisica> pessoaFisica = repository.findById(idPessoaFisica);
			if(pessoaFisica.isPresent())
				return pessoaFisica.get();
			else
				throw new SamaiaException(ErrorType.BUSINESS_ERROR,Error.INVALID_PARAMETER);
		}catch(DataAccessException  e) {
			throw new SamaiaException(ErrorType.PERSISTENCE_ERROR,e);
		}catch(Exception  e) {
			throw new SamaiaException(ErrorType.PERSISTENCE_ERROR,Error.RESOURCE_DUPLICATED,e,null);
		}
	}

	@Override
	public Page<PessoaFisica> listarPessoasFisicas(int page, int size,String sort) throws SamaiaException {
		try {
			if (size < 1) {
				size = 10;
			}
			if (sort == null) {
				sort = "id";
			}
	
			PageRequest request = PageRequest.of(page, size, Sort.by(sort));
			
			return repository.findAll(request);
		}catch(DataAccessException  e) {
			throw new SamaiaException(ErrorType.PERSISTENCE_ERROR,e);
		}catch(Exception  e) {
			throw new SamaiaException(ErrorType.PERSISTENCE_ERROR,Error.RESOURCE_DUPLICATED,e,null);
		}
	}

	private void verifyCPF(String cpf) {

	}

	
	
}
