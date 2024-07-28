import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import uñas from "../../assets/uñas1.jpg";
import { useNavigate } from "react-router-dom";

const CardCurso = ({ curso }) => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleInscribirseClick = () => {
    // Redirige al formulario
    navigate('/formulario-inscripcion', { state: { cursoId: curso.idcurso } }); // Pasa el ID del curso como estado
  };

  return (
    <div className="col-sm-12 col-md-4 mb-3">
      <Card style={{ width: "16rem", border: "1px solid #FFD700" }} className="borde-card">
        <Card.Img variant="top" src={uñas} />
        <Card.Body className="bg-card-cursos">
          <Card.Title className="fw-semibold">{curso.nombrecurso}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card.Text>

        </Card.Body>
      </Card>
    </div>
  );
};

export default CardCurso;
