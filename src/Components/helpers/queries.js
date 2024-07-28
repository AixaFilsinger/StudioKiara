import axios from "axios";

const url_cursos = import.meta.env.VITE_Cursos;
const url_clientes = import.meta.env.VITE_Clientes;
const url_servicios = import.meta.env.VITE_Servicios;
const url_reservas = import.meta.env.VITE_Reservas;
const url_inscripcion = import.meta.env.VITE_Inscripcion;

export const obtenerCursos = async () => {
  try {
    const respuesta = await axios.get(url_cursos);
    return respuesta.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const consultaCrearInscripcion = async (inscripcion) => {
  try {

    const respuesta = await axios.post(url_inscripcion, inscripcion, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return respuesta.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const obtenerClientes = async () => {
  try {
    const respuesta = await axios.get(url_clientes);
    return respuesta.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const consultaCrearCliente = async (cliente) => {
  try {
    const respuesta = await axios.post(url_clientes, cliente, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return respuesta.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const obtenerServicios = async () => {
  try {
    const respuesta = await axios.get(url_servicios);
    return respuesta.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
