import { useState, useEffect } from "react";
import CardCurso from "./CardCurso";
import FormInscripCurso from "./FormInscripCurso";
import { obtenerCursos } from "../helpers/queries";

const Cursos = () => {
  const [curso, setCurso] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    obtenerCursos().then((respuesta) => {
      if (respuesta) {
        setCurso(respuesta);
      } else {
        console.log("Se produjo un error al obtener los cursos");
      }
    });
  }, []);
  return (
    <section className="mainSection p-5">
      <h1 className="text-center fw-semibold mt-0 mb-3">Nuestros cursos</h1>
      <p className="texto-cursos">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus qui
        sunt culpa animi porro enim sint adipisci accusantium, odio minima,
        obcaecati quibusdam tempora error? Eos, similique, perferendis iusto
        repudiandae eius sit odio omnis, praesentium voluptas blanditiis
        facilis. Doloremque quos fugiat doloribus, aliquam sapiente quam atque
        repudiandae sunt asperiores corrupti? Nostrum totam laboriosam nulla
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
