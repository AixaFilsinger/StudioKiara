import { useEffect, useState } from "react";
import CardServicio from "./CardServicio";
import { obtenerServicios } from "../helpers/queries";
import { Link } from "react-router-dom";

const Servicios = () => {
  
  
  const [servicio, setServicio] = useState([]);

  useEffect(() => {
    obtenerServicios().then((respuesta) => {
      if (respuesta) {
        setServicio(respuesta);
      } else {
        console.log("Se produjo un error");
      }
    });
  }, []);

  return (
    <section className="mainSection">
      <h1 className="text-center mt-5 h1Servicios">Nuestros Servicios</h1>
      <p className="text-center">
        Si desea sacar un turno en alguno de nuestros servicios, por favor presione sobre la imagen
      </p>

      <article className="ConteinerCards mt-3 mb-5">
        {servicio.map((servicio) => (
          <Link to={"/Reservas"} key={servicio.id}>
            <CardServicio servicio={servicio} />
          </Link>
        ))}
      </article>
    </section>
  );
};

export default Servicios;
