import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from '../../assets/logofull.png'

const Menu = () => {
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
            <NavLink end className={"nav-item nav-link"} to={"/"}>
              Inicio
            </NavLink>
            <NavLink end className={"nav-item nav-link"} to={"/servicios"}>
              Servicios
            </NavLink>
            <NavLink end className={"nav-item nav-link"} to={"/cursos"}>
              Cursos
            </NavLink>
            <NavLink end className={"nav-item nav-link"} to={"/contacto"}>
              Contacto
            </NavLink>
            <NavLink end className={"nav-item nav-link"} to={"/nosotros"}>
              Nosotros
            </NavLink>

            <NavLink end className={"nav-item nav-link"} to={"/administrador"}>
              Administrador
            </NavLink>

            <NavLink end className={"nav-item nav-link"} to={"/login"}>
              Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
