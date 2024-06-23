// src/App.js
import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './Components/common/Menu';
import Footer from './Components/common/Footer';
import Inicio from './Components/views/Inicio';
import Contacto from './Components/views/Contacto';
import Cursos from './Components/views/Cursos';
import Nosotros from './Components/views/Nosotros';
import Servicios from './Components/views/Servicios';
import Admin from './Components/views/Admin';
import Error404 from './Components/views/Error404';
import Modal from './Components/Modal/Modal';
import LoginForm from './Components/Modal/LoginForm';
import { AuthProvider } from './Components/routes/AuthContext';
import PrivateRoute from './Components/routes/RutasProtegidas';

function App() {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Menu showModal={showModal} />
        <Modal show={show} handleClose={hideModal}>
          <LoginForm handleClose={hideModal} />
        </Modal>
        <Routes>
          <Route exact path="/" element={<Inicio />}></Route>
          <Route exact path="/contacto" element={<Contacto />}></Route>
          <Route exact path="/nosotros" element={<Nosotros />}></Route>
          <Route exact path="/servicios" element={<Servicios />}></Route>
          <Route exact path="/cursos" element={<Cursos />}></Route>
          <Route
            path="/administrador/*"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
