import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './Components/common/Menu'
import Footer from './Components/common/Footer'
import Inicio from './Components/views/Inicio'
import Contacto from './Components/views/Contacto'
import Cursos from './Components/views/Cursos'
import Nosotros from './Components/views/Nosotros'
import Servicios from './Components/views/Servicios'
import Reservas from './Components/views/Reserva/Reservas'
import Error404 from './Components/views/Error404'
function App() {
 

  return (
    <BrowserRouter>
   <Menu ></Menu>
   <Routes>
    <Route exact path="/" element={<Inicio></Inicio>}></Route>
    <Route exact path="/contacto" element={<Contacto></Contacto>}></Route>
    <Route exact path="/nosotros" element={<Nosotros ></Nosotros>}></Route>
    <Route exact path="/servicios" element={<Servicios ></Servicios>}></Route>
    <Route exact path="/cursos" element={<Cursos ></Cursos>}></Route>
    <Route  path="/Reservas/" element={<Reservas></Reservas> }></Route>
    <Route  path="*" element={<Error404></Error404>}></Route>
   </Routes>
   <Footer></Footer>
   </BrowserRouter>
  )
}

export default App
