import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { consultaCrearInscripcion, obtenerClientes, obtenerCursos } from '../helpers/queries';
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const FormInscripCurso = ({show, onHide}) => {
  const [clientes, setClientes]= useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

      const [curso, setCurso] = useState([]);

  useEffect(()=>{
    obtenerCursos().then((respuesta)=>{
      if(respuesta){
        setCurso(respuesta);
      }else{
        console.log("Se produhjo un error maca")
      }

    })
  }, [])

      const onSubmit = (inscripNueva) => {
        obtenerClientes().then((respuesta)=>{
           if(respuesta){
            setClientes(respuesta)
            return setClientes(respuesta)
           }else{
            console.log("se produjo un error")
           }
        })
        if(obtenerClientes()===inscripNueva){
          
        }
        //realizar la peticion que agregue la receta a la API
        consultaCrearInscripcion(inscripNueva).then((respuesta) => {
          console.log(respuesta)
          if (respuesta && respuesta.message === "Ya existe una inscripcion igual") {
            Swal.fire("Error", "Ya existe una inscripcion con ese nombre", "error");
          } else if ( respuesta && respuesta.id) {
            Swal.fire(
              "Solicitud Enviada",
              `Kiara Studio se comunicara en breve `,
              "success"
            );
            reset();
          } else {
            Swal.fire(
              "Error",
              `Intente realizar esta operacion mas tarde`,
              "error"
            );
          }
        });
        reset();
      };

{/*
  const [clientes, setClientes] = useState([]);
  const [cursos, setCursos] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    obtenerCursos().then((respuesta) => {
      if (respuesta) {
        setCursos(respuesta);
      } else {
        console.log("Se produjo un error al obtener los cursos");
      }
    });

    obtenerClientes().then((respuesta) => {
      if (respuesta) {
        setClientes(respuesta);
      } else {
        console.log("Se produjo un error al obtener los clientes");
      }
    });
  }, []);

  const onSubmit = async (inscripNueva) => {
    try {
      const clienteExistente = clientes.find(
        (cliente) => cliente.email === inscripNueva.email
      );

      let clienteId;
      if (clienteExistente) {
        clienteId = clienteExistente.id;
      } else {
        const nuevoCliente = {
          nombreyapellido: inscripNueva.nombreyapellido,
          email: inscripNueva.email,
          celular: inscripNueva.celular,
        };

        const respuestaCliente = await consultaCrearCliente(nuevoCliente);
        if (respuestaCliente && respuestaCliente.id) {
          clienteId = respuestaCliente.id;
        } else {
          throw new Error('Error al crear el cliente');
        }
      }

      const nuevaInscripcion = {
        clienteid: clienteId,
        cursosid: inscripNueva.curso,
      };

      const respuestaInscripcion = await consultaCrearInscripcion(nuevaInscripcion);
      if (respuestaInscripcion && respuestaInscripcion.message === "Ya existe una inscripcion igual") {
        Swal.fire("Error", "Ya existe una inscripción con esos datos", "error");
      } else if (respuestaInscripcion && respuestaInscripcion.inscripcionid) {
        Swal.fire(
          "Solicitud Enviada",
          `Kiara Studio se comunicará en breve`,
          "success"
        );
        reset();
      } else {
        throw new Error('Error al crear la inscripción');
      }
    } catch (error) {
      Swal.fire(
        "Error",
        `Intente realizar esta operación más tarde. Error: ${error.message}`,
        "error"
      );
    }
  };
  */ }
    
  return (
    <Modal
    
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <section className="formCursosContainer">
       <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formnombre">
        <Form.Label>nombre y Apellido</Form.Label>
        <Form.Control type="text" placeholder="Ej:Aixa Filsinger" {...register("nombreyapellido", {
              required:
                "Este campo es obligatorio",
              minLength: {
                value: 5,
                message:
                  "Este campo debe contener minimo 5 caracteres",
              },
              maxLength: {
                value: 100,
                message:
                  "Su nombre y apellido debe contener maximo 100 caracteres",
              }
            })}/>
       <Form.Text className="text-danger">
            {errors.nombreyapellido?.message}
          </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCurso">
          <Form.Label>Curso a elegir</Form.Label>
          <Form.Select
            aria-label="Curso"
            {...register("curso", { required: "Debe elegir una opcion" })}
          >
            <option value="">Seleccione una Categoria</option>
            {curso.map((curso) => (
          <option key={curso.id} value={curso.id}>
            {curso.nombrecurso}
          </option>
        ))}
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.curso?.message}
          </Form.Text>
        </Form.Group>

      <Form.Group className="mb-3" controlId="formemail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ej:Aixa@gamil.com"  {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'El Email debe contener "@" y terminar en: ".com"',
              },
            })}/>
             <Form.Text className="text-danger">
            {errors.email?.message}
          </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCelular">
        <Form.Label>Celular</Form.Label>
        <Form.Control type="number" placeholder="Ej:3813976548" {...register("celular",{
            required:"Este campo es obligatorio"
        })} />
        <Form.Text className="text-danger">
            {errors.celular?.message}
          </Form.Text>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        enviar
      </Button>
    </Form>
    </section>
    <Modal.Footer>
      <Button onClick={onHide} className="btn-cursos">Enviar</Button>
    </Modal.Footer>
  </Modal>
    
  );
};

export default FormInscripCurso;
