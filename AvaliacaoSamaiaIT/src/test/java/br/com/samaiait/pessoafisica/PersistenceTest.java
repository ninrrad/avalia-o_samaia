package br.com.samaiait.pessoafisica;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.GregorianCalendar;
import java.util.Iterator;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import br.com.samaiait.persistence.entities.TipoTelefone;
import br.com.samaiait.pessoafisica.dao.PessoaFisicaRepository;
import br.com.samaiait.pessoafisica.entities.PessoaFisica;
import br.com.samaiait.pessoafisica.entities.PessoaFisicaTelefone;


@DataJpaTest
public class PersistenceTest {
  
    @Autowired
    private PessoaFisicaRepository pfRepository;
    
    @Test
    @Transactional
    public void insert(){
    	PessoaFisica pf1 =  new PessoaFisica();
    	pf1.setNome("José");
    	pf1.setDataNascimento(new GregorianCalendar(1983, 12, 20));
    	pf1.setEmail("aaaa@bbb.com");
    	pf1.setCpf("81887965572");
    	
    	PessoaFisicaTelefone pfTell = new PessoaFisicaTelefone();
    	pfTell.setNome("Celular pessoal"); 
    	pfTell.setTelefone("(61)98141-1216");
    	pfTell.setTipo(TipoTelefone.MOVEL);
    	pfTell.setPessoaFisica(pf1);
    	pf1.getTelefones().add(pfTell);
    	
    	pfRepository.save(pf1);
    	
    	Iterator<PessoaFisica> itPf = pfRepository.findAll().iterator();
    	assertEquals("José" ,itPf.next().getNome());  
    }
 
    // TODO: Adicionar outros testes de persistencia 
    
}