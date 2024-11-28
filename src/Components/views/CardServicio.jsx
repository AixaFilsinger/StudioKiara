import cejas from "../../assets/pestañas1.jpg";
import manicura from "../../assets/uñas1.jpg";
import depi from "../../assets/depilacion.jpg";
import pestañas from "../../assets/Lifting1.jpg"
import { Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";

const CardServicio = ({ servicio }) => {
  const serviciosData = {
    "Manicura y Pedicura": {
      imagen: manicura,
      descripcion: "Cuida y embellece tus manos con un servicio de manicura profesional."
    },
    "Lifting de pestañas": {
      imagen: pestañas,
      descripcion: "Tratamiento que eleva la curvatura de tus pestañas y resalta tu mirada."
    },
    "Depilación Láser": {
      imagen: depi,
      descripcion: "Elimina el vello no deseado de manera suave y eficaz con nuestro servicio de depilación."
    },
    "Tratamiento en cejas": {
      imagen: cejas,
      descripcion: "Dale forma y definición a tus cejas con un diseño personalizado."
    }
  };
  const { imagen, descripcion } = serviciosData[servicio.nombreservicio] || {
    imagen: manicura,  // Imagen y descripción por defecto si el servicio no se encuentra
    descripcion: "Servicio de belleza personalizado para ti."
  };

  return (
    
     <Card className="cardServicios">
      <Card.Img variant="top" src={imagen}  className="img-servicio"/>
      <Card.Body className="cardServicios-des">
        <Card.Title>{servicio.nombreservicio}</Card.Title>
        <Card.Text className="cardServicios-des">
          {descripcion}
        </Card.Text>
        <div className="boton-container">
        <Link to="/Reservas" className=""><button className="boton">Pedir Turno</button></Link>
        </div>
        
      </Card.Body>
    </Card>
    
   
  );
};

export default CardServicio;
