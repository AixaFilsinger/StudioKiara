import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';



const Contacto = () => {
  const buttonStyles = {
    backgroundColor: "#fbcfc4",
    color: "black",
    border: "none",
    width: "100px",
    height: "40px",
    transition: "transform 0.3s ease"
  };

  const [formValues, setformValues] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const { nombre, email, mensaje } = formValues;
  const [formValid, setFormValid] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    const { nombre, email, mensaje } = formValues;
    setFormValid(nombre && email && mensaje);
  }, [formValues]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (formValid) {
      setShow(true);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        {/* Primera columna */}
        <Col md={6} className="mt-5">
          <Form className="formulario">
            <h4 className="mb-5">¡Pónete en contacto con nosotros!</h4>
            <Form.Group controlId="contactoNombre" className="mt-2">
              <Form.Label style={{ fontFamily: "Arial", fontSize: "15px" }}>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                style={{ width: "400px" }}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="contactoEmail" className="mt-3">
              <Form.Label style={{ fontFamily: "Arial", fontSize: "15px" }}>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                style={{ width: "400px" }}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="contactoMensaje" className="mt-3">
              <Form.Label style={{ fontFamily: "Arial", fontSize: "15px" }}>¡Déjanos tu mensaje!</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="mensaje"
                style={{ width: "400px" }}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              className="buttonform mt-5"
              style={{ ...buttonStyles }}
              onMouseEnter={(e) => e.target.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
              onClick={handleShow}
              disabled={!formValid}
            >
              Enviar
            </Button>
            {/* Comienzo del modal */}
            <Modal show={show} onHide={handleClose} animation={true} style={{ zIndex: 1050 }}>
              <Modal.Header closeButton>
                <Modal.Title>¡Mensaje enviado!</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ fontFamily: 'Arial' }}>¡Nos pondremos en contacto con vos cuanto antes! ¡Muchas gracias!</Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={handleClose} style={{ backgroundColor: '#fbcfc4', color: "black", border: "none" }}>
                  Aceptar
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </Col>
        {/* Segunda columna */}
        <Col md={6} className="mt-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1823963101556!2d-65.21310932499887!3d-26.834150389924968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d1c479dbf2b%3A0x1304b87c1021b7!2sKiara%20Studio!5e0!3m2!1ses-419!2sar!4v1721760113020!5m2!1ses-419!2sar"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '4px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="d-flex justify-content-center">
            <ul className="list-unstyled mt-3" style={{ listStyleType: 'none' }}>
              <li className="mb-2" style={{ fontFamily: "Arial", fontSize: "15px" }}>
                <FontAwesomeIcon icon={faLocationDot} /> Combate de Las Piedras
                812, San Miguel de Tucumán
              </li>
              <li className="mb-2" style={{ fontFamily: "Arial", fontSize: "15px" }}>
                <FontAwesomeIcon icon={faInstagram} /> _kiara_studio_
              </li>
              <li className="mt-4 mb-4">
                <h3 className="mt-2" style={{ fontSize: "30px" }}>¡Esperamos verte pronto!</h3>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;