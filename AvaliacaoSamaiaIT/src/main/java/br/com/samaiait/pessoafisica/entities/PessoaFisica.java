package br.com.samaiait.pessoafisica.entities;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
/**
 * Classe reponsável pela persistencia dos dados
 *  de uma pessoa fisica.
 * 
 * 
 * @author David S. Vladimir 08/02/2020  
 *  
 */
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, 
property = "@id")
@Entity
public class PessoaFisica{

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE) //funciona melhor em POSTGRES
	private Long id;
    
	@Version
    private Long version = 0L;
	
	@Column(nullable = false,length = 256)
	private String nome;
	
	@Column(nullable = false,length = 12,unique = true)
	private String cpf;
	//TODO:verificar pois a prova nao diz o que é obrigatório ou não, 
	@Column(nullable = true,length = 256)
	private String email;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	@Temporal(TemporalType.DATE)
	private Calendar dataNascimento;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	@CreationTimestamp
	private Date dataCadastro;
	
	//TODO:Validar se a tabela sera usada apenas para pessoa fisica do contrario remover o cascade ALL 
	@OneToMany(mappedBy = "pessoaFisica", cascade = CascadeType.ALL)
    private Set<PessoaFisicaEndereco> enderecos = new HashSet<>();
	
	//TODO:Validar se a tabela sera usada apenas para pessoa fisica do contrario remover o cascade ALL 
	@OneToMany(mappedBy = "pessoaFisica", cascade = CascadeType.ALL)
    private Set<PessoaFisicaTelefone> telefones = new HashSet<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getVersion() {
		return version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Calendar getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Calendar dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public Date getDataCadastro() {
		return dataCadastro;
	}
	
	public Set<PessoaFisicaEndereco> getEnderecos() {
		return enderecos;
	}

	public void setEnderecos(Set<PessoaFisicaEndereco> enderecos) {
		this.enderecos = enderecos;
	}

	public Set<PessoaFisicaTelefone> getTelefones() {
		return telefones;
	}

	public void setTelefones(Set<PessoaFisicaTelefone> telefones) {
		this.telefones = telefones;
	}
	
	

	@Override
	public String toString() {
		return "PessoaFisica [id=" + id + ", version=" + version + ", nome=" + nome + ", cpf=" + cpf + ", email="
				+ email + ", dataNascimento=" + dataNascimento + ", dataCadastro=" + dataCadastro + ", enderecos="
				+ enderecos + ", telefones=" + telefones + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PessoaFisica other = (PessoaFisica) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	 
}
