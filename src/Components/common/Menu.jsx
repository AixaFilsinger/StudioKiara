// src/Components/common/Menu.js
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import Logo from '../../assets/logofull.png';
import { useAuth } from '../routes/AuthContext';

const Menu = ({ showModal }) => {
  const { currentUser } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const closeNavbar = () => setExpanded(false);

  return (
    <Navbar expanded={expanded} onToggle={handleToggle} expand="lg" className="nav" variant="light">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          <div>
            <img src={Logo} alt="kiara studio logo" className="logo" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink end className="nav-item nav-link" to={"/"} onClick={closeNavbar}>
              Inicio
            </NavLink>
            <NavLink end className="nav-item nav-link" to={"/servicios"} onClick={closeNavbar}>
              Servicios
            </NavLink>
            <NavLink end className="nav-item nav-link" to={"/cursos"} onClick={closeNavbar}>
              Cursos
            </NavLink>
            <NavLink end className="nav-item nav-link" to={"/contacto"} onClick={closeNavbar}>
              Contacto
            </NavLink>
            <NavLink end className="nav-item nav-link" to={"/nosotros"} onClick={closeNavbar}>
              Nosotros
            </NavLink>
            <NavLink end className={"nav-item nav-link"} to={"/Reservas"} onClick={closeNavbar}>
              Reservas
            </NavLink>
            <NavLink end className={"nav-item nav-link"} to={"/login"} onClick={showModal}>
              Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
