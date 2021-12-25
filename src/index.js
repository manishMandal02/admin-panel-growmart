import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

import './index.scss';
import App from './App';
import store from './Store/Store';

axios.defaults.baseURL = 'https://growmart.herokuapp.com/';
// axios.defaults.baseURL = 'http://localhost:5000';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4DAE65',
    },
    secondary: {
      main: '#40add8',
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
