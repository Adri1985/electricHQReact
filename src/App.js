
import NavBar from './components/NavBar/NavBar'
import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Detail from './pages/Detail';
import Products from './pages/Products';
import Cart from './pages/Checkout';
import Payment from './pages/Payment'
import CreateProduct from './pages/CreateProduct';
import CartProvider from './context/CartContext';
import Login from './pages/Login'
import User from './pages/User'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from 'react'

const Stripe = React.lazy(() => import('./pages/Stripe/Stripe'));

function App() {
  
  return (
    <CartProvider>
        <BrowserRouter >
          <div className="container" >
            <NavBar />
            <Routes>
              <Route path="/electricHQReact" element={
                <Login />
              }/>
                <Route path="/productos" element ={<Products />}/>
                <Route path="/user/:id" element ={<User />}/>
              <Route path="/contacto" element ={<h1>Pagina de contacto</h1>}/>
              <Route path="/productos/:category" element ={<Products />}/>
              <Route path="/productos/:category/:id" element ={<Detail/>}/>
              <Route path ="/Checkout" element ={<Cart/>} />
              <Route path ="/productos/create" element = {<CreateProduct />}/>
              <Route path="*" element={<h1>Error 404 pagina no encontrada</h1>}/>
              <Route path='/Payment' element={<Payment />} />

            
            </Routes>
            
            {/* <Modal title="MODAL DE REGISTRO">
              <form>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <button>enviar</button>
              </form>
            </Modal> */}
          </div>
        </BrowserRouter>  
     </CartProvider>    
  );
}

export default App;
