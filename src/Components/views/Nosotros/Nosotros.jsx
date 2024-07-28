import React from 'react';
import Intro from './Intro';
import Parallax from './Parallax';
import './nosotros.scss';

const Nosotros = () => {
  return (
    <div className="nosotros-container">
      <section>
        <Intro/>
      </section>
      <section>
        <Parallax/>
      </section>
      <section>Servicio1</section>
      <section>Servicio2</section>
      <section>Servicio3</section>
      <section>Servicio4</section>
      <section>End</section>
    </div>
  );
};

export default Nosotros;

