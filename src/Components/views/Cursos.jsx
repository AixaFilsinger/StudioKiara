import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import uñas from "../../assets/uñas1.jpg";
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
      <article>
        <div className="container text-center">
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <Card style={{ width: "16rem", border: "1px solid #FFD700" }} className="borde-card">
                <Card.Img variant="top" src={uñas} />
                <Card.Body className="bg-card-cursos ">
                  <Card.Title className="fw-semibold">Manicura</Card.Title>
                  <Card.Text>
                    
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button size="lg" className="btn-cursos">Inscribirse</Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-sm-12 col-md-4"></div>
            <div className="col-sm-12 col-md-4">Column</div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Cursos;
