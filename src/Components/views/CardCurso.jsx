
import Card from "react-bootstrap/Card";
import uñas from "../../assets/uñas12.jpg";
import manicura from "../../assets/uñas7.jpg";
import pestañas from "../../assets/Lifting1.jpg"
import { useNavigate } from "react-router-dom";

const CardCurso = ({ curso }) => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleInscribirseClick = () => {
    // Redirige al formulario
    navigate('/formulario-inscripcion', { state: { cursoId: curso.idcurso } }); // Pasa el ID del curso como estado
  };

  const cursosData = {
    "Semi permanente": {
      imagen: uñas,
      descripcion: "Un esmalte semipermanente es un tipo de manicura que se hace cada 2-3 semanas."
    },
    "Lifting de pestañas": {
      imagen: pestañas,
      descripcion: "Es un tratamiento que eleva la curvatura de tus pestañas, resaltando la expresión de la mirada y alargando las pestañas desde la raíz, sin utilizar pelo sintético."
    },
    "Kapping gel": {
      imagen: manicura,
      descripcion: "La manicura kapping consiste en aplicar una fina capa de acrílico o gel fortificador sobre la uña que actúa como una barrera protectora."
    }
  };
  const { imagen, descripcion } = cursosData[curso.nombrecurso] || {
    imagen: manicura,  // Imagen y descripción por defecto si el servicio no se encuentra
    descripcion: "Servicio de belleza personalizado para ti."
  };

  return (
    <div className="col-sm-12 col-md-5 col-xl-4 mb-3">
      <Card style={{ width: "16rem", height:"29rem", border: "1px solid #FFD700" }} className="borde-card">
        <Card.Img variant="top" src={imagen}  className="img-fluid" style={{width:"257.67px", height:"257.67px"}}/>
        <Card.Body className="bg-card-cursos" style={{height:"208px"}}>
          <Card.Title className="fw-semibold">{curso.nombrecurso}</Card.Title>
          <Card.Text>
            {descripcion}
          </Card.Text>

        </Card.Body>
      </Card>
    </div>
  );
};

export default CardCurso;
