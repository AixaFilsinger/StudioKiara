import React from "react";
import logotipo from "../../assets/logofull.png";
import { GrInstagram } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
import { PiWhatsappLogoBold } from "react-icons/pi";
import { ImWhatsapp } from "react-icons/im";
const Footer = () => {
  return (
    <footer className="footer">
      <aside id="infoFooter">
        <div className="title-main">
          <h2>Nuestros horarios</h2>
          <div className="subtitle">
            Lunes a Viernes
            <div className="minisub">10 a 20hs</div>
          </div>
          <div className="subtitle">
            Sábados
            <div className="minisub">10 a 20hs</div>
          </div>
          <div className="subtitle">
            Domingos y feriados
            <div className="minisub"> CERRADO</div>
          </div>
          <h2 style={{ position: "relative", top: "50px" }}>
            ¿Dónde nos encontramos?
          </h2>
          <div
            className="subtitle"
            style={{ position: "relative", top: "80px" }}
          >
            Combate de las piedras 812, Barrio sur
          </div>
        </div>
      </aside>
      <aside className="downFooter">
        <div className="text-center">
          <img src={logotipo} alt="Kiara Studio logo" className="logotipo" />
        </div>
        <div className="text-center text-secondary"><ImWhatsapp className=" me-1"/><GrInstagram className="me-1" />
        </div>
       
      </aside>
    </footer>
  );
};

export default Footer;
