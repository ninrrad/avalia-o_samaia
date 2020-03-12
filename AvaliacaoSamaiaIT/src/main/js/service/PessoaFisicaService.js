import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/api/pessoa_fisica';

class PessoaFisicaService {

    fetchPessoa() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchPessoaById(pessoaId) {
        return axios.get(USER_API_BASE_URL + '/' + pessoaId);
    }

    deletePessoa(pessoaId) {
        return axios.delete(USER_API_BASE_URL + '/' + pessoaId);
    }

    addPessoa(pessoa) {
    		
        return axios.post(""+USER_API_BASE_URL, pessoa);
    }

    editPessoa(pessoa) {
        return axios.put(""+USER_API_BASE_URL + '_update', pessoa);
    }

}

export default new PessoaFisicaService();