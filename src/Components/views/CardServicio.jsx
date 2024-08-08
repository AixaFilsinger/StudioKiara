import cejas from "../../assets/pestañas1.jpg";
import manicura from "../../assets/uñas1.jpg";
import depi from "../../assets/depilacion.jpg";
import pestañas from "../../assets/Lifting1.jpg"

const CardServicio = ({ servicio }) => {
  const serviciosData = {
    "Manicura y Pedicura": {
      imagen: manicura,
      descripcion: "Cuida y embellece tus manos con un servicio de manicura profesional."
    },
    "Lifting de pestañas": {
      imagen: pestañas,
      descripcion: "Es un tratamiento que eleva la curvatura de tus pestañas, resaltando la expresión de la mirada y alargando las pestañas desde la raíz, sin utilizar pelo sintético."
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
    <div className="cardServicios">
      <div className="face front">
        <img src={imagen} alt="" className="img" />
        <h3>{servicio.nombreservicio}</h3>
      </div>
      <div className="face back">
        <h3>{servicio.nombreservicio}</h3>
        <p>{descripcion}</p>
      </div>
    </div>
  );
};

export default CardServicio;
