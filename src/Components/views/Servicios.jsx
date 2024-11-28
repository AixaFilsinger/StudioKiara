import { useEffect, useState } from "react";
import CardServicio from "./CardServicio";
import { obtenerServicios } from "../helpers/queries";
import { Link } from "react-router-dom";
import { Container, Row, Spinner, Col } from "react-bootstrap";

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerServicios().then((respuesta) => {
      if (respuesta) {
        setServicios(respuesta);
        setLoading(false);
      } else {
        console.log("Se produjo un error");
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <div>Cargando...</div>
      </Container>
    );
  }

  return (
    <section className="mainSection">
      <h1 className="text-center mt-5 h1Servicios">Nuestros Servicios</h1>
      <p className="text-center fs-5">
        Si deseas sacar un turno en alguno de nuestros servicios, por favor presiona sobre la imagen
      </p>

      <Container className="mt-3 mb-5">
    <Row>
      {servicios.map((servicio) => (
        <Col xs={12} sm={4} className="d-flex justify-content-center align-items-center" key={servicio.idServicio}>
         
            <CardServicio servicio={servicio} />
          
        </Col>
      ))}
    </Row>
  </Container>
    </section>
  );
};

export default Servicios;
