// src/Components/common/Menu.js
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import Logo from '../../assets/logofull.png';
import { useAuth } from '../routes/AuthContext';

const Menu = ({ showModal }) => {
  const { currentUser } = useAuth();

  return (
    <Navbar className="nav" variant="white" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          <div>
            <img src={Logo} alt="kiara studio logo" className="logo" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink end className="nav-item nav-link" to={"/"}>
              Inicio
            </NavLink>
            <NavLink end className="nav-item nav-link" to={"/servicios"}>
              Servicios
            </NavLink>
            <NavLink end className="nav-item nav-link" to={"/cursos"}>
              Cursos
            </NavLink>
            <NavLink end className="nav-item nav-link" to={"/contacto"}>
              Contacto
            </NavLink>
            <NavLink end className="nav-item nav-link" to={"/nosotros"}>
              Nosotros
            </NavLink>
            <NavLink end className={"nav-item nav-link"} to={"/Reservas/*"}>
              Reservas
            </NavLink>


            <button type="button" className="btn btn-primary" onClick={showModal}>
              Login
            </button>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
