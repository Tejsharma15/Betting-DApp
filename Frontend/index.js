import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react'
import { MoralisProvider } from 'react-moralis';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoralisProvider appId = "Add moralis app ID here" serverUrl= "Add moralis server url here">
      <ChakraProvider>
        <App /> 
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>
);
