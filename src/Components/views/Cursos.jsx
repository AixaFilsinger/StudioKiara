import { useState, useEffect } from "react";
import CardCurso from "./CardCurso";
import FormInscripCurso from "./FormInscripCurso";
import { obtenerCursos } from "../helpers/queries";
import { Container, Spinner } from "react-bootstrap";

const Cursos = () => {
  const [curso, setCurso] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerCursos().then((respuesta) => {
      if (respuesta) {
        setCurso(respuesta);
        setLoading(false);
      } else {
        console.log("Se produjo un error al obtener los cursos");
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
    <section className="mainSection p-5">
      <h1 className="text-center fw-semibold mt-0 mb-3">Nuestros cursos</h1>
      <p className="texto-cursos text-center fs-5">
        Todos nuestros cursos incluyen el material que se necesita para realizar cada clase. ¡Animate y capacitate con lo mejor!
      </p>
      <div className="container text-center">
        <div className="row">
          {curso.map((curso) => (
            <CardCurso
              key={curso.idcurso} // Asegúrate de que idcurso sea único
              curso={curso}
              setModalShow={setModalShow}
            />
          ))}
        </div>
      </div>


      <article className="hola">
        <FormInscripCurso show={modalShow} onHide={() => setModalShow(false)} />
      </article>

    </section>
  );
};

export default Cursos;
