import CardCurso from "./CardCurso";
import FormInscripCurso from "./FormInscripCurso";

const Cursos = () => {
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
      <CardCurso></CardCurso>
      <article className="hola">
       <FormInscripCurso></FormInscripCurso>  
      </article>
     
    </section>
  );
};

export default Cursos;
