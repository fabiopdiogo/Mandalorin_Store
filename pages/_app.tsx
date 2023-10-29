import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import theme from '../src/theme'
import { CartProvider } from '../src/contexts/CartProvider';
const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.black};
  }

  a{
    color: ${props => props.theme.primary};
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s;
  }

  a:hover {
    color: ${props => props.theme.primaryHover};
  }

`

function App({ Component, pageProps }) {
  
  return (
    <CartProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
    </CartProvider>

  );
}

export default App;
