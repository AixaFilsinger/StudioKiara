
import Banner from '../../assets/Banner.png'
import CardInicio from './inicio/CardInicio'


const Inicio = () => {
    return ( <section className='mainSection'>
    <img src={Banner} alt="banner kiara studio" className='banner mb-5'/>
        <section>
            <aside className='text-center display-3 mt-5'>
                <p className='tituloInicio'>~Somos una estética llena de amor y felicidad~</p>
            </aside>
           <CardInicio></CardInicio>
               
            
        </section>
    </section>
    
    );
};

export default Inicio;