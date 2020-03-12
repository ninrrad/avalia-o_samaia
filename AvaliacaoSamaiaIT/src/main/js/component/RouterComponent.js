import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListaPessoaFisicaComponent from "./user/ListaPessoaFisicaComponent";
import AddPessoaFisicaComponent from "./user/AddPessoaFisicaComponent";
import React from "react";

const AppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Route path="/" exact component={ListaPessoaFisicaComponent} />
                        <Route path="/PessoaFisica" component={ListaPessoaFisicaComponent} />
                        <Route path="/add-PessoaFisica" component={AddPessoaFisicaComponent} />
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default AppRouter;