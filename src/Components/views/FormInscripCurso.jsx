import { consultaCrearInscripcion, consultaCrearCliente, obtenerClientes, obtenerCursos } from '../helpers/queries';
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';

const FormInscripCurso = () => {
  const [clientes, setClientes] = useState([]);
  const [curso, setCursos] = useState([]);

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

      let idcliente;
      if (clienteExistente) {
        idcliente = clienteExistente.idcliente;
      } else {
        const nuevoCliente = {
          nombreapellido: inscripNueva.nombreapellido,
          email: inscripNueva.email,
          telefono: inscripNueva.telefono,
        };

        const respuestaCliente = await consultaCrearCliente(nuevoCliente);
        if (respuestaCliente && respuestaCliente.idcliente) {
          idcliente = respuestaCliente.idcliente;
        } else {
          throw new Error('Error al crear el cliente');
        }
      }

      const nuevaInscripcion = {
        idcliente,
        idcurso: inscripNueva.curso,
      };

      const respuestaInscripcion = await consultaCrearInscripcion(nuevaInscripcion);
      if (respuestaInscripcion && respuestaInscripcion.message === "Ya existe una inscripcion igual") {
        Swal.fire("Error", "Ya existe una inscripción con esos datos", "error");
      } else if (respuestaInscripcion && respuestaInscripcion.idinscripcion) {
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

  return (
    <section className="formCursosContainer">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formnombre">
          <Form.Label>Nombre y Apellido</Form.Label>
          <Form.Control type="text" placeholder="Ej: Aixa Filsinger" {...register("nombreapellido", {
            required: "Este campo es obligatorio",
            minLength: {
              value: 5,
              message: "Este campo debe contener mínimo 5 caracteres",
            },
            maxLength: {
              value: 100,
              message: "Su nombre y apellido debe contener máximo 100 caracteres",
            }
          })} />
          <Form.Text className="text-danger">
            {errors.nombreapellido?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCurso">
          <Form.Label>Curso a elegir</Form.Label>
          <Form.Select
            aria-label="Curso"
            {...register("curso", { required: "Debe elegir una opción" })}
          >
            <option value="">Seleccione una Categoría</option>
            {curso.map((curso) => (
              <option key={curso.idcurso} value={curso.idcurso}>
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
          <Form.Control type="email" placeholder="Ej: aixa@gmail.com" {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'El Email debe contener "@" y terminar en: ".com"',
            },
          })} />
          <Form.Text className="text-danger">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTelefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="text" placeholder="Ej: 3813976548" {...register("telefono", {
            required: "Este campo es obligatorio"
          })} />
          <Form.Text className="text-danger">
            {errors.telefono?.message}
          </Form.Text>
        </Form.Group>

        <Button className="btn-cursos" type="submit">
          Enviar
        </Button>
      </Form>
    </section>
  );
};

export default FormInscripCurso;
