import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import theme from '../src/theme'
import { CartProvider } from '../src/contexts/Cart/CartProvider';
import { AuthProvider } from '../src/contexts/Auth/AuthProvider';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    color: #FFFFFF;
    background-color: #3A3A3A;
  }

  a{
    color: #FFFFFF;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s;
  }

  a:hover {
    color: 7029A8;
  }

`

function App({ Component, pageProps }) {
  
  return (
      <AuthProvider>
        <CartProvider>        
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Component {...pageProps} />
              </ThemeProvider>     
       </CartProvider>
      </AuthProvider>
  );
}

export default App;
