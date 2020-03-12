import React from 'react'
import AppRouter from "./component/RouterComponent";
import NavBar from "./component/Navbar";
import Container from '@material-ui/core/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
	  toast.configure()
	return (
		     <div>
	            <NavBar/>
	            <Container>
	                <AppRouter/>
	            </Container>
	        </div>
  )
}

export default App