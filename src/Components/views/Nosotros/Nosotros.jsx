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
    </div>
  );
};

export default Nosotros;

