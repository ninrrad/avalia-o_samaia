import React, { Component } from 'react'
import PessoaFisicaService from "../../service/PessoaFisicaService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class ListaPessoaFisicaComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pessoas: [],
            message: null
        }
        
        
        this.deletePessoa = this.deletePessoa.bind(this);
        this.editPessoa = this.editPessoa.bind(this);
        this.addPessoa = this.addPessoa.bind(this);
        this.reloadPessoaList = this.reloadPessoaList.bind(this);
    }

    
    
    componentDidMount() {
        this.reloadPessoaList();
    }

    reloadPessoaList() {
    	PessoaFisicaService.fetchPessoa()
            .then((res) => {
                this.setState({pessoas: res.data})
            });
    }

    deletePessoa(userId) {
    	PessoaFisicaService.deletePessoa(userId)
           .then(response => {
        	   if(response.data.status == 500) {
      				var errMSG = response.data.context.entity;
      			
      				this.setState({message : errMSG});
      				toast(errMSG);
      			}else{
      				toast("Pessoa fisica removida com sucesso!");
      	   		 this.props.history.push('/');	
      			}
               this.reloadPessoaList();
           })
    }

    editPessoa(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/add-PessoaFisica');
    }

    addPessoa() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-PessoaFisica');
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Lista de Pessoas Fisica</Typography>
                <IconButton aria-label="Adicionar"  color="primary" onClick={() => this.addPessoa()} >
                	<AddCircleOutlineIcon/> 
                </IconButton>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="center">CPF</TableCell>
                            <TableCell align="center">E-Mail</TableCell>
                            <TableCell align="center">Data de Nascimento</TableCell>
                            <TableCell align="center">Data de Cadastro</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.pessoas.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.nome}</TableCell>
                                <TableCell align="right">
                                
                                <NumberFormat value={row.cpf} displayType={'text'} format="###.###.###-##" />
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{new Date(row.dataNascimento).toLocaleDateString()}</TableCell>
                                <TableCell align="right">{new Date(row.dataCadastro).toLocaleDateString()}</TableCell>
                                <TableCell align="right" onClick={() => this.editPessoa(row.id)}> <CreateIcon /></TableCell>
                                <TableCell align="right" onClick={() => this.deletePessoa(row.id)}><DeleteIcon /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListaPessoaFisicaComponent;
