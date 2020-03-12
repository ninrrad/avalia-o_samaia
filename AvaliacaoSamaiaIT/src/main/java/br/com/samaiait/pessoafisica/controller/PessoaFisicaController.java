package br.com.samaiait.pessoafisica.controller;

import java.util.List;

import javax.transaction.Transactional;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.samaiait.exception.SamaiaException;
import br.com.samaiait.pessoafisica.entities.PessoaFisica;
import br.com.samaiait.pessoafisica.service.PessoaFisicaService;

@RestController
@RequestMapping("/api")
public class PessoaFisicaController {

	@Autowired
	private PessoaFisicaService service;
	

	@GetMapping(value = "/pessoa_fisica/{id}", produces = "application/json")
	PessoaFisica consultarPessoaFisicaPorId(@PathVariable long id) {
		try {
			return service.obterPessoaFisica(id);
		} catch (Exception e) {
			return null;
		}
	}
	
	@GetMapping(value = "/pessoa_fisica", produces = "application/json")
	List<PessoaFisica> consultarPessoaFisica() {
		try {
			return service.listarPessoasFisicas(0, 10, null).toList();
		} catch (Exception e) {
			return null;
		}
	}
	
	@PostMapping(value= "/pessoa_fisica", consumes = "application/json")
	Response inserirPessoaFisica(@RequestBody PessoaFisica pessoaFisica) {
		try {
			 
			service.salvar(pessoaFisica);
			return Response.status(Status.CREATED).entity(pessoaFisica.getId()).build();
		} catch (SamaiaException e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e.getUserMessage()).build();
		}
	}
	
	@PutMapping(value= "/pessoa_fisica_update", consumes = "application/json", produces = "application/json")
	Response atualizarPessoaFisica(@RequestBody PessoaFisica pessoaFisica) {
		try {
			service.atualizar(pessoaFisica);
			return Response.status(Status.CREATED).entity(pessoaFisica.getId()).build();
		} catch (SamaiaException e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e.getUserMessage()).build();
		}
	}
	
	@Transactional
	@DeleteMapping(value= "/pessoa_fisica/{id}")
	Response removerPessoaFisica(@PathVariable long id) {
		try {
			PessoaFisica pessoaFisica = service.obterPessoaFisica(id);
			service.remover(pessoaFisica);
			return Response.status(Status.CREATED).entity(pessoaFisica.getId()).build();
		} catch (SamaiaException e) {
			e.printStackTrace();
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e.getUserMessage()).build();
		}
	}
	
}