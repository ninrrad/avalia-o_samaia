import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
//import './index.css'
import App from './App'




ReactDOM.render( 
	<ThemeProvider theme={theme}>
	{ }
		<CssBaseline />
		<App />
	</ThemeProvider>,
document.getElementById('react'))