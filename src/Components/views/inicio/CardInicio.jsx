import uñas7 from '../../../assets/uñas7.jpg'
import estudio1 from '../../../assets/estudio1.jpg'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const CardInicio = () => {
  return (
    <section className="container d-flex justify-content-center">
      <section className="row mt-5 ">
        <aside className="col-sm-12 col-md-6">
        <Link to="./Servicios">
          <Card className="bg-dark text-white custom-card">
            <Card.Img
              src={uñas7}
              alt="Uñas"
              className='img-fluid'
              style={{opacity: 0.5}}
            />
            <Card.ImgOverlay>
              <Card.Title>Servicios</Card.Title>
              <Card.Text>
                Descubre la belleza que mereces. En Kiara Studio ofrecemos
                manicura y pedicura de alta calidad, lifting de pestañas para
                una mirada cautivadora, tratamientos especializados para cejas y
                depilación láser efectiva y segura. ¡Hoy Lucite!
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
          </Link>
        </aside>
        <aside className="col-sm-12 col-md-6">
        <Link to="./Cursos">
          <Card className="bg-dark text-white custom-card">
            <Card.Img
              src={estudio1}
              className='img-fluid'
              alt="Uñas"
              style={{opacity: 0.5}}
            />
            <Card.ImgOverlay>
              <Card.Title>Cursos</Card.Title>
              <Card.Text>
                Ofrecemos los mejores cursos para que puedas capacitarte de la
                mejor manera. ¡Con Kiara Studio también aprendés!
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
          </Link>
        </aside>
      </section>
    </section>
  );
};

export default CardInicio;
