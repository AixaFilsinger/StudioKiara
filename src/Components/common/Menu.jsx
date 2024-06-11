import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from '../../assets/logofull.png'
import { useState } from "react";

const Menu = () => {
  const [expanded, setExpanded] = useState(false);

  const closeNav = () => setExpanded(false);
  return (
    <Navbar className="nav" variant="white" expand="lg" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
         <div>
          <img src={Logo} alt="kiara studio logo" className="logo" />
         </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink end className={"nav-item nav-link"} to={"/"} onClick={closeNav}>
              Inicio
            </NavLink>
            <NavLink end className={"nav-item nav-link"} to={"/servicios"} onClick={closeNav}>
              Servicios
            </NavLink>
            <NavLink end className={"nav-item nav-link"} to={"/cursos"} onClick={closeNav}>
              Cursos
            </NavLink>
            <NavLink end className={"nav-item nav-link"} to={"/contacto"} onClick={closeNav}>
              Contacto
            </NavLink>
            <NavLink end className={"nav-item nav-link"} to={"/nosotros"} onClick={closeNav}>
              Nosotros
            </NavLink>

            <NavLink end className={"nav-item nav-link"} to={"/Reservas"} onClick={closeNav}>
              Reservas
            </NavLink>

            <NavLink end className={"nav-item nav-link"} to={"/login"} onClick={closeNav}>
              Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
