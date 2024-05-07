import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/Shop/Shop';
import Home from './components/Layout/Home';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import cartProductsLoader from './loaders/cartProductsLoader';
import Checkout from './components/Checkout/Checkout';
import AuthProvider from './AuthProvider/AuthProvoder';
import Register from './components/Register/Register';
import PrivetRout from './PrivetRoute/PrivetRout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Shop></Shop>,
        loader:()=>fetch('http://localhost:5000/productsCount')
      },
      {
        path: 'orders',
        element: <PrivetRout><Orders></Orders></PrivetRout>,
        loader: cartProductsLoader
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path:'checkout',
        element: <Checkout></Checkout>
      },
      {
        path: 'login',
        element: <Login></Login>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
