import { useEffect, useState } from "react";
import CardServicio from "./CardServicio";
import { obtenerServicios } from "../helpers/queries";
import { Link } from "react-router-dom";

const Servicios = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    obtenerServicios().then((respuesta) => {
      if (respuesta) {
        setServicios(respuesta);
      } else {
        console.log("Se produjo un error");
      }
    });
  }, []);

  return (
    <section className="mainSection">
      <h1 className="text-center mt-5 h1Servicios">Nuestros Servicios</h1>
      <p className="text-center fs-5">
        Si deseas sacar un turno en alguno de nuestros servicios, por favor presiona sobre la imagen
      </p>

      <article className="ConteinerCards mt-3 mb-5">
        {servicios.map((servicio) => (
          <Link to={"/Reservas"} key={servicio.idServicio}>
            <CardServicio servicio={servicio} />
          </Link>
        ))}
      </article>
    </section>
  );
};

export default Servicios;
