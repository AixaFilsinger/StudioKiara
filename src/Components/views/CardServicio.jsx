import pestañas from "../../assets/uñas5.jpg";

const CardServicio = ({ servicio }) => {
  return (
    <div className="cardServicios">
      <div className="face front">
        <img src={pestañas} alt="" className="img" />
        <h3>{servicio.nombreservicio}</h3>
      </div>
      <div className="face back">
        <h3>{servicio.nombreservicio}</h3>
        <p>
          Es un tratamiento que eleva la curvatura de tus pestañas, resaltando
          la expresión de la mirada y alargando las pestañas desde la raíz, sin
          utilizar pelo sintético.
        </p>
      </div>
    </div>
  );
};

export default CardServicio;
