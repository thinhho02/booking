import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';


import { web } from '../secret_google.json'
import theme from './theme/theme.js'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={web.client_id}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
