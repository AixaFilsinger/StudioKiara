import React, { useState, useEffect } from 'react';
import Banner from '../../assets/Banner.png';
import CardInicio from './inicio/CardInicio';
import { Container, Row, Col } from 'react-bootstrap';
import estudio1 from '../../assets/estudio1.jpg';
import estudio2 from '../../assets/estudio2.jpg';

const Inicio = () => {
  const [scrollY, setScrollY] = useState(0);

  // Función para manejar el scroll
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Estilos para el carrusel y otros elementos
  const bannerStyle = {
    opacity: scrollY < 200 ? 1 : 0, // Ajusta según sea necesario
    transition: 'opacity 1s ease-in-out',
  };

  const sectionStyle = (offset) => ({
    opacity: scrollY > offset ? 1 : 0,
    transform: scrollY > offset ? 'translateY(0)' : 'translateY(50px)',
    transition: 'opacity 1s ease-in-out, transform 1.1s ease-in-out',
  });

  return (
    <section className='mainSection'>
      <img src={Banner} alt="banner kiara studio" className='banner mb-md-5' style={bannerStyle} />
      <section>
        <aside className='text-center display-3 mt-md-5' style={sectionStyle(300)}>
          <p className='tituloInicio p-4'>~Somos una estética llena de amor y felicidad~</p>
        </aside>
        <CardInicio />
        <Container>
          <Row className='text-center'>
            <Col md={6} className='mb-3' style={sectionStyle(600)}>
              <img src={estudio1} alt="" className='img-fluid rounded w-75' />
            </Col>
            <Col md={6} className='mb-3 align-self-center' style={sectionStyle(700)}>
              <p className='pInicio'>
                ¿Lista para experimentar una transformación
                de belleza completa?
                En nuestra estética,
                te ofrecemos una gama de servicios para cuidar tus uñas,
                cejas, pestañas y depilación con atención personalizada y
                profesionalismo.
              </p>
            </Col>
            <Col md={{ order: 'last' }} className='mb-3' style={sectionStyle(800)}>
              <img src={estudio2} alt="" className='img-fluid rounded w-75' />
            </Col>
            <Col md={6} className='mb-3 miniSub align-self-center' style={sectionStyle(900)}>
              <p className='pInicio'>
                Descubre un espacio donde tu belleza se realza en cada detalle. En nuestra estética,
                creemos que sentirse cómoda es esencial para disfrutar al máximo de nuestros servicios.
                Te garantizamos un ambiente acogedor y relajante para que puedas relajarte mientras te cuidamos.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </section>
  );
};

export default Inicio;
