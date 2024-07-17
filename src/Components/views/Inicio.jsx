
import Banner from '../../assets/Banner.png'
import CardInicio from './inicio/CardInicio'
import { Container, Row, Col } from 'react-bootstrap';
import estudio1 from '../../assets/estudio1.jpg'
import estudio2 from '../../assets/estudio2.jpg'



const Inicio = () => {
    return (<section className='mainSection'>
        <img src={Banner} alt="banner kiara studio" className='banner mb-md-5' />
        <section>
            <aside className='text-center display-3 mt-md-5'>
                <p className='tituloInicio p-4'>~Somos una estética llena de amor y felicidad~</p>
            </aside>
            <Container>
                <Row className='text-center'>
                    <Col md={6} className='mb-3'>
                        <img src={estudio1} alt="" className='img-fluid rounded w-75' />
                    </Col>
                    <Col md={6} className='mb-3 align-self-center'>
                        <p className='pInicio'>
                            ¿Lista para experimentar una transformación
                            de belleza completa?
                            En nuestra estética,
                            te ofrecemos una gama de servicios para cuidar tus uñas,
                            cejas, pestañas y depilación con atención personalizada y
                            profesionalismo.
                        </p>
                    </Col>
                    <Col md={{ order: 'last' }} className='mb-3'>
                        <img src={estudio2} alt="" className='img-fluid rounded w-75' />
                    </Col>
                    <Col md={6} className='mb-3 miniSub align-self-center'>
                        <p className='pInicio'>
                            Descubre un espacio donde tu belleza se realza en cada detalle.En nuestra estética,
                            creemos que sentirse cómoda es esencial para disfrutar al máximo de nuestros servicios.
                            Te garantizamos un ambiente acogedor y relajante para que puedas relajarte mientras te cuidamos.
                        </p>
                    </Col>
                </Row>

            </Container>
            <CardInicio></CardInicio>


        </section>
    </section>

    );
};

export default Inicio;