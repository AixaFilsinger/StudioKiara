import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const FormInscripCurso = () => {
  const [clientes, setClientes] = useState([]);
  const [cursos, setCursos] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cursosRespuesta = await axios.get("https://kiara-studio-vercel.vercel.app/api/cursos");
        const clientesRespuesta = await axios.get("https://kiara-studio-vercel.vercel.app/api/clientes");

        setCursos(cursosRespuesta.data || []);
        setClientes(clientesRespuesta.data || []);
      } catch (error) {
        console.error("Error al obtener cursos y clientes:", error.message);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      let idCliente;

      // Verificar cliente existente
      const clienteExistente = clientes.find(cliente => cliente.email === data.email);
      if (clienteExistente) {
        idCliente = clienteExistente.idcliente;
      } else {
        const nuevoCliente = {
          nombreapellido: data.nombreapellido,
          email: data.email,
          telefono: data.telefono,
        };

        const respuestaCliente = await axios.post(
          "https://kiara-studio-vercel.vercel.app/api/clientes",
          nuevoCliente
        );

        console.log("Respuesta del servidor al crear cliente:", respuestaCliente.data);

        if (respuestaCliente.data && respuestaCliente.data.idcliente) {
          idCliente = respuestaCliente.data.idcliente;

          // Actualizar la lista de clientes después de agregar un nuevo cliente
          setClientes(prevClientes => [...prevClientes, respuestaCliente.data]);
        } else {
          throw new Error("Error al crear el cliente");
        }
      }

      // Datos de inscripción
      const nuevaInscripcion = {
        idCliente,
        idCurso: data.curso,
      };

      console.log("Datos de inscripción:", nuevaInscripcion);

      // Crear inscripción
      const respuestaInscripcion = await axios.post(
        "https://kiara-studio-vercel.vercel.app/api/inscripcion",
        nuevaInscripcion
      );

      console.log("Respuesta del servidor al crear inscripción:", respuestaInscripcion.data);

      if (respuestaInscripcion.data && respuestaInscripcion.data.id) {
        Swal.fire("Solicitud Enviada", "Kiara Studio se comunicará en breve", "success");
        reset();
      } else {
        throw new Error("Error al crear la inscripción");
      }
    } catch (error) {
      console.error("Error en el envío del formulario:", error);
      Swal.fire("Error", `Intente realizar esta operación más tarde. Error: ${error.message}`, "error");
    }
  };

  return (
    <section className="formCursosContainer">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formnombre">
          <Form.Label>Nombre y Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Aixa Filsinger"
            {...register("nombreapellido", {
              required: "Este campo es obligatorio",
              minLength: {
                value: 5,
                message: "Este campo debe contener mínimo 5 caracteres",
              },
              maxLength: {
                value: 100,
                message: "Su nombre y apellido debe contener máximo 100 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.nombreapellido?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCurso">
          <Form.Label>Curso a elegir</Form.Label>
          <Form.Select
            aria-label="Curso"
            {...register("curso", { required: "Debe elegir una opción" })}
          >
            <option value="">Seleccione una Categoría</option>
            {cursos.map((curso) => (
              <option key={curso.idcurso} value={curso.idcurso}>
                {curso.nombrecurso}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="text-danger">{errors.curso?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formemail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ej: aixa@gmail.com"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'El Email debe contener "@" y terminar en: ".com"',
              },
            })}
          />
          <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTelefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: 3813976548"
            {...register("telefono", { required: "Este campo es obligatorio" })}
          />
          <Form.Text className="text-danger">{errors.telefono?.message}</Form.Text>
        </Form.Group>

        <Button className="btn-cursos" type="submit">
          Enviar
        </Button>
      </Form>
    </section>
  );
};

export default FormInscripCurso;
