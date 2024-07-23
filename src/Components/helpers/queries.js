import axios from "axios";
//llamo a la variable de entorno

const url_cursos = import.meta.env.VITE_Cursos;
const url_clientes = import.meta.env.VITE_Clientes;
const url_servicios = import.meta.env.VITE_Servicios;
const url_reservas = import.meta.env.VITE_Reservas;
const url_inscripcion = import.meta.env.VITE_Inscripcion;

export const obtenerCursos = async ()=>{
    try {

        const respuesta = await axios.get(url_cursos);
        const listaCursos = respuesta.data
        return listaCursos;
        
    } catch (error) {
        console.log(error);
        return null
        
    }

}
export const consultaCrearInscripcion = async (inscripcion)=>{
    try {
        const respuesta = await axios.request({
            url:url_inscripcion ,
            method: `POST`,
            headers: {
                "Content-Type": "application/json"
            },
          data: {inscripcion}
        }
        )
      return respuesta.data
        
    } catch (error) {
        console.log(error);
        
    }
}
export const obtenerClientes = async ()=>{
    try {

        const respuesta = await axios.get(url_clientes);
        const listaClientes = respuesta.data
        return listaClientes;
        
    } catch (error) {
        console.log(error);
        return null
        
    }

}
export const consultaCrearClientes = async (cliente)=>{
    try {
        const respuesta = await axios.request({
            url:url_clientes ,
            method: `POST`,
            headers: {
                "Content-Type": "application/json"
            },
          data: {cliente}
        }
        )
      return respuesta.data
        
    } catch (error) {
        console.log(error);
        
    }
}