import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from './router';
import { ContextProvider } from '../context/ContextProvider';
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <ChakraProvider>
        <RouterProvider router={router}/>
      </ChakraProvider>
    </ContextProvider>
	</React.StrictMode>
)
