import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from './router';

import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './assets/libs/feather-icons/feather.min.js';
import './assets/js/app';
import { ContextProvider } from '../context/ContextProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
	</React.StrictMode>
)
