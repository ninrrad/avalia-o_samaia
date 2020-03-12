import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import PessoaFisicaService from "../../service/PessoaFisicaService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';




import Popup from "reactjs-popup";

class AddPessoaFisicaComponent extends Component{
	
	
    constructor(props){
        super(props);
        this.state ={
        	id:'',	
        	'@id':1,
            nome: '',
            cpf: '',
            email: '',
            dataNascimento: '',
            dataCadastro: '',
            enderecos: [
            	
            ],
            telefones: [
            	
            ],
            message: null,
            tmpTel_nome:'', 
            tmpTel_telefone:'',
            tmpTel_tipo:'MOVEL',
            
            end_nome:'',
        	end_logradouro:'',
        	end_cep:'',
        	end_bairro:'',
        	end_cidade:'',
        	end_uf:'',
            
            version:	0,
            isOpenT: false,
            isOpenE: false,
            update: false
        
        }
        
        this.saveUser 		= [];
        this.comeback 		= this.comeback.bind(this);
        this.savePessoa 	= this.savePessoa.bind(this);
        this.addTelefone 	= this.addTelefone.bind(this);
        this.removeTelefone = this.removeTelefone.bind(this);
        this.addEndereco	= this.addEndereco.bind(this);
        this.removeEndereco = this.removeEndereco.bind(this); 
        this.masckCPF   	= this.masckCPF.bind(this);
        this.masckDate  	= this.masckDate.bind(this);
        this.maskToDate  	= this.maskToDate.bind(this);
    
    }
    
    componentDidMount() {
        this.loadPessoa();
    }

    loadPessoa() {
    	var id = window.localStorage.getItem("userId");
        if(id!=null){
        	this.update=true;
        	PessoaFisicaService.fetchPessoaById(id)
            .then((res) => {
                let pessoa = res.data;
                this.setState({
                id: pessoa.id,
                '@id':pessoa['@id'],
                nome: pessoa.nome,
                cpf: pessoa.cpf,
                email:pessoa.email,
                version:pessoa.version,
                dataNascimento: new Date(pessoa.dataNascimento).toLocaleDateString(),
                dataCadastro: new Date(pessoa.dataCadastro).toLocaleDateString(),
                enderecos: pessoa.enderecos!=null?pessoa.enderecos:[], 
                telefones: pessoa.telefones.map(x=>({id:x.id,pessoaFisica:x.pessoaFisica, nome:x.nome, telefone:x.telefone, tipo:x.tipo}))
                })
            });
        }
    }

    
    addEndereco(){	
    	this.setState({ isOpenE: false });
    	let endereco ={nome:this.state.end_nome, logradouro:this.state.end_logradouro, cep:this.state.end_cep, bairro:this.state.end_bairro,cidade:this.state.end_cidade,uf:this.state.end_uf};
    	console.log(endereco)
    	this.state.enderecos.push(endereco);
    	
    	this.state.end_nome=' ';
    	this.state.end_logradouro=' ';
    	this.state.end_cep='00';
    	this.state.end_bairro=' ';
    	this.state.end_cidade=' ';
    	this.state.end_uf='DF';
    	
    	
    	
    	this.forceUpdate();
    }

    removeEndereco(item){
    	var i=0;
    	console.log("enderecos:"+this.state.enderecos +" item "+item);
    	this.state.enderecos = this.state.enderecos.filter(value => item !== value)
       	
    	this.forceUpdate();
    }
    
    addTelefone(){
    	
    	this.setState({ isOpenT: false });
    	let fone ={nome:this.state.tmpTel_nome, telefone:this.state.tmpTel_telefone,tipo:this.state.tmpTel_tipo};
    	console.log(fone);
   
    	this.state.telefones.push(fone);
    	this.state.tmpTel_nome='';
    	this.state.tmpTel_telefone=0;
    	this.state.tmpTel_tipo='';
    	
    	this.forceUpdate();
    }

    
    removeTelefone(item){
    	var i=0;
    	console.log("telefoness:"+this.state.telefones +" item "+item);
    	this.state.telefones = this.state.telefones.filter(value => item !== value)
       	
    	this.forceUpdate();
    }
    
    
    maskToDate(tDate){
    	if(tDate=='') return tDate;
    	var ds = tDate.split('/');
    	return ds[2]+"-"+ds[1]+"-"+ds[0]+"T00:00:00.0Z";
    }
    
    
    
    savePessoa(userId) {
    	//var data =  Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit',year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'});
    	
    	let pessoa = {
			id:					this.state.id,
			'@id': 				this.state['@id'],
			version:			this.state.version,
			nome:  				this.state.nome,
			cpf:  				this.state.cpf.replace(/\D/g, ''),
			email:  			this.state.email,
			dataNascimento:  	this.maskToDate(this.state.dataNascimento),
			dataCadastro:  		this.maskToDate(this.state.dataCadastro),
			enderecos:  		this.state.enderecos,
			telefones:  		this.state.telefones
    	}
    	if(this.update){
    		PessoaFisicaService.editPessoa(pessoa)
	           .then((response) => 
	           			{ 
	           				
		           			if(response.data.status == 500) {
		           				var errMSG = response.data.context.entity;
		           			
		           				this.setState({message : errMSG});
		           				toast(errMSG);
		           			}else{
		           				toast("A Pessoa Fisica "+ this.state.nome + " foi cadastrada com sucesso");
		           	   		 this.props.history.push('/');	
		           			}	
	        	   		 
	        	   		},
			    	  (error) 	=> 
			    	   	{ 
			    	   		toast("Falha interna ao realizar cadastro");	
			    		 this.setState({message : error});
			    		 console.log(error) 
			    		}
	           	);
    	}else{
		    	PessoaFisicaService.addPessoa(pessoa)
		           .then((response) => 
		           			{ 
		           				
			           			if(response.data.status == 500) {
			           				var errMSG = response.data.context.entity;
			           			
			           				this.setState({message : errMSG});
			           				toast(errMSG);
			           			}else{
			           				toast("A Pessoa Fisica "+ this.state.nome + " foi cadastrada com sucesso");
			           	   		 this.props.history.push('/');	
			           			}	
		        	   		 
		        	   		},
				    	  (error) 	=> 
				    	   	{ 
				    	   		toast("Falha interna ao realizar cadastro");	
				    		 this.setState({message : error});
				    		 console.log(error) 
				    		}
		           	);
    	}
    }
    
    masckCPF(val){
	    return val.replace(/\D/g, '') 
	    .replace(/(\d{3})(\d)/, '$1.$2') 
	    .replace(/(\d{3})(\d)/, '$1.$2')
	    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
	    .replace(/(-\d{2})\d+?$/, '$1');
    }
    
    masckDate(val){
	    return val.replace(/\D/g, '') 
	    .replace(/(\d{2})(\d)/, '$1/$2') 
	    .replace(/(\d{2})(\d{1,4})/, '$1/$2')
	    .replace(/(\/\d{4})\d+?$/, '$1');
    }
    
    comeback() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/');
    }
    
    handleChange(event) {
         console.log(event.target.name+"<-nome valor->"+ event.target.value);
    	if(event.target.name == "cpf"){
    		this.setState({ [event.target.name]: this.masckCPF(event.target.value) });
    	}else if(event.target.name.startsWith("data")){
    		this.setState({ [event.target.name]: this.masckDate(event.target.value) });
    	}else if(event.target.name.startsWith("tmpTel1")){
    		var sName = event.target.name.split(".");
    		
    		this.setState(this.state.tmpTel[sName[1]], event.target.value); 
    	}else{
    		this.setState({ [event.target.name]: event.target.value });	
    	}
	}
    
    handleOpenT() {
        this.setState({ isOpenT: true });
     }
    handleOpenE() {
        this.setState({ isOpenE: true });
     }
    render() {
        return(
            <div>
            	
                <Typography variant="h4" style={style}>Pessoa Fisica</Typography>
                <form style={formContainer}>
                <div>
			        <IconButton aria-label="Voltar"  color="primary" onClick={this.comeback} >
			  			<ArrowBackIcon /> 
			  		</IconButton>
			  		<IconButton aria-label="Salvar"  color="primary" onClick={this.savePessoa} >
						<SaveIcon /> 
					</IconButton>
	                <div>
	                    <TextField type="text"   placeholder="Nome" fullWidth margin="normal" name="nome" value={this.state.nome}  onChange={this.handleChange.bind(this)} />
	
	                    <TextField type="text" placeholder="CPF" fullWidth margin="normal" name="cpf" value={this.state.cpf}  onChange={this.handleChange.bind(this)} />
	
	                    <TextField type="text"   placeholder="E-mail" fullWidth margin="normal" name="email" value={this.state.email} onChange={this.handleChange.bind(this)}  />
	
	                    <TextField type="text" placeholder="Datade Nascimento" fullWidth margin="normal" name="dataNascimento" value={this.state.dataNascimento}  onChange={this.handleChange.bind(this)} />
	
	                    <TextField type="text" disable='true' placeholder="Data de Cadastro" fullWidth margin="normal" name="dataCadastro" value={this.state.dataCadastro}   />
	                  </div>
	                  <div>  
	                  
	                  
	                  <Popup name="T" open={this.state.isOpenT} modal onOpen={this.handleOpenT.bind(this)} trigger={
	                		  <IconButton aria-label="Adicionar"  color="primary"  >
	                		  		<AddCircleOutlineIcon/>Adicionar Telefone 
	                		  		</IconButton>
	                		  		}>
	                  			<Typography variant="h4" style={style}>Telefone</Typography>
	                  		
	                  			<div>
	                  			<TextField type="text"   placeholder="Descrição" fullWidth margin="normal" name="tmpTel_nome" value={this.state.tmpTel_nome}  onChange={this.handleChange.bind(this)} />
	                  			
	    	                    <TextField type="text" placeholder="Numero" fullWidth margin="normal" name="tmpTel_telefone" value={this.state.tmpTel_telefone}  onChange={this.handleChange.bind(this)} />
	    	
	    	                    <TextField type="text"   placeholder="Tipo" fullWidth margin="normal" name="tmpTel_tipo" value={this.state.tmpTel_tipo} onChange={this.handleChange.bind(this)}  />
	    	                  			
	                  			<Button variant="contained" color="primary" onClick={this.addTelefone}>Salvar</Button>
	                  			</div>
	                  		
	                  </Popup>
	                  <Popup  name="E" open={this.state.isOpenE} modal onOpen={this.handleOpenE.bind(this)} trigger={
	                		  <IconButton aria-label="Adicionar"  color="primary"  >
	                		  		<AddCircleOutlineIcon/>Adicionar Endereço 
	                		  		</IconButton>
	                		  		}>
	                  			<Typography variant="h4" style={style}>Endereço</Typography>
	                  		
	                  			<div>
	                  			<TextField type="text"   placeholder="Descrição" fullWidth margin="normal" name="end_nome" value={this.state.end_nome}  onChange={this.handleChange.bind(this)} />
	                  			
	    	                    <TextField type="text" placeholder="Logradouro" fullWidth margin="normal" name="end_logradouro" value={this.state.end_logradouro}  onChange={this.handleChange.bind(this)} />
	    	
	    	                    <TextField type="text"   placeholder="CEP" fullWidth margin="normal" name="end_cep" value={this.state.end_cep} onChange={this.handleChange.bind(this)}  />" +
	                  			<TextField type="text"   placeholder="Bairro" fullWidth margin="normal" name="end_bairro" value={this.state.end_bairro} onChange={this.handleChange.bind(this)}  />
	                  			<TextField type="text"   placeholder="Cidade" fullWidth margin="normal" name="end_cidade" value={this.state.end_cidade} onChange={this.handleChange.bind(this)}  />
	                  			<TextField type="text"   placeholder="UF" fullWidth margin="normal" name="end_uf" value={this.state.end_uf} onChange={this.handleChange.bind(this)}  />
	                  			<Button variant="contained" color="primary" onClick={this.addEndereco}>Salvar</Button>
	                  			</div>
	                  		
	                  </Popup>
	                  
	                  
	                  <List component="nav"   aria-labelledby="nested-list-subheader"    subheader={
	                    <ListSubheader component="div" id="nested-list-subheader">
	                      Telefones
	                    </ListSubheader>
	                  } >

	                  {this.state.telefones.map(item => (
	                          <ListItem key={item.id}>
	                            <ListItemAvatar>
	                              <Avatar>
	                                	<ContactPhoneIcon />
	                              </Avatar>
	                            </ListItemAvatar>
	                            <ListItemText primary={item.nome} secondary={item.telefone} />
	                            <ListItemSecondaryAction>
		                            <IconButton onClick={() => this.removeTelefone(item)} >
		                            	<DeleteIcon />
	                		  		</IconButton>
	                            
	                            </ListItemSecondaryAction>
	                            </ListItem>
	                   ))}
	                  
	                  </List>
	                  <List component="nav"   aria-labelledby="nested-list-subheader"    subheader={
	  	                    <ListSubheader component="div" id="nested-list-subheader">
	  	                      Endereços
	  	                    </ListSubheader>
	  	                  } >

	  	                  {this.state.enderecos.map(item => (
	  	                          <ListItem key={item.id}>
	  	                            <ListItemAvatar>
	  	                              <Avatar>
	  	                                	<ContactPhoneIcon />
	  	                              </Avatar>
	  	                            </ListItemAvatar>
	  	                            <ListItemText primary={item.nome} secondary={item.logradouro + " - " +item.cep+ " - " + item.uf + " - " +item.cidade +" - " + item.bairro} />
	  	                            <ListItemSecondaryAction>
	  		                            <IconButton onClick={() => this.removeEndereco(item)} >
	  		                            	<DeleteIcon />
	  	                		  		</IconButton>
	  	                            
	  	                            </ListItemSecondaryAction>
	  	                            </ListItem>
	  	                   ))}
	  	                  
	  	                  </List>

	                  
	                  </div>
                  </div>
                  
                  </form>
            
            
    </div>
        );
    }
}
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'

}

export default AddPessoaFisicaComponent;

