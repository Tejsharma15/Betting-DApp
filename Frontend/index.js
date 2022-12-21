import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react'
import { MoralisProvider } from 'react-moralis';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoralisProvider appId = "S52fikKjag5N1KtxZFNYcYusLCfMeWcrLPghdXd4" serverUrl= "https://243mf2xtaan7.usemoralis.com:2053/server">
      <ChakraProvider>
        <App /> 
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>
);