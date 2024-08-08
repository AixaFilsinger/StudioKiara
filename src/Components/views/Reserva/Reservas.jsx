import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Container, Card, Spinner, Alert, Button, Form } from "react-bootstrap";
import ContactUs from "./ContactUs";
import styles from "./Reserva.module.css";
import Swal from "sweetalert2";


const Reservas = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    nombreCliente: "",
    idServicio: "",
    Dia: "",
    Horario: "",
    Telefono: "",
    Email: "",
  });

  const [emailData, setEmailData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const serviciosResponse = await axios.get(
        "https://kiara-studio-vercel.vercel.app/api/servicios"
      );
      setServicios(serviciosResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        "Error al cargar los datos. Por favor, intente de nuevo más tarde."
      );
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getClientId = async () => {
    try {
      const response = await axios.post(
        "https://kiara-studio-vercel.vercel.app/api/clientes",
        {
          NombreApellido: formData.nombreCliente,
          Telefono: formData.Telefono,
          Email: formData.Email,
        }
      );
      // console.log("Respuesta del servidor al crear cliente:", response.data);
      return response.data.id;
    } catch (error) {
      console.error("Error al crear o buscar el cliente:", error);
      throw new Error("Error al crear o buscar el cliente.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      !formData.nombreCliente ||
      !formData.idServicio ||
      !formData.Dia ||
      !formData.Horario ||
      !formData.Telefono ||
      !formData.Email
    ) {
      setError("Todos los campos son requeridos.");
      return;
    }

    try {
      const idcliente = await getClientId();
      // console.log("idcliente obtenido:", idcliente);

      const data = {
        idCliente: idcliente,
        idServicio: formData.idServicio,
        Dia: formData.Dia,
        Horario: formData.Horario,
      };

      // console.log("Datos enviados:", data);

      const response = await axios.post(
        "https://kiara-studio-vercel.vercel.app/api/reservas",
        data
      );

      // console.log("Respuesta del servidor:", response);

      // Obtener nombre del servicio
      const selectedServicio = servicios.find(
        (servicio) => servicio.idservicio === parseInt(formData.idServicio)
      );
      const nombreServicio = selectedServicio
        ? selectedServicio.nombreservicio
        : "Servicio no encontrado";

      /*setSuccessMessage("Reserva guardada exitosamente.");*/
      Swal.fire("Tu turno fue reservado", "Recordá que tenes hasta 24hs antes para cancelarlo. ¡Esperamos verte pronto!", "success");

      setEmailData({
        to_name: formData.nombreCliente,
        to_email: formData.Email, // Añadido campo to_email
        from_name: "Kiara Studio",
        NombreServicio: nombreServicio,
        Dia: formData.Dia,
        Horario: formData.Horario,
      });
      await fetchData();
      resetForm();
      setError(null);
    } catch (error) {
      console.error("Error saving reservation:", error);
      setError(
        error.response?.data?.message ||
        "Error al guardar la reserva. Por favor, intente de nuevo más tarde."
      );
    }
  };

  const resetForm = () => {
    setFormData({
      nombreCliente: "",
      idServicio: "",
      Dia: "",
      Horario: "",
      Telefono: "",
      Email: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <div>Cargando...</div>
      </Container>
    );
  }

  return (
    <section className="mainSection">
      <Container className="mt-4 mb-5">
        <h1 className="text-center">Sacar turno</h1>
        <div className={styles.formContainer}>
          <Card>
            <Card.Body>
              <Card.Title>Crear Nueva Reserva</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              <Form onSubmit={handleSave}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Nombre del Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombreCliente"
                    value={formData.nombreCliente}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre del nuevo cliente"
                    required
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    name="Telefono"
                    value={formData.Telefono}
                    onChange={handleInputChange}
                    placeholder="Ingrese el teléfono del nuevo cliente"
                    required
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    placeholder="Ingrese el email del nuevo cliente"
                    required
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Servicio</Form.Label>
                  <Form.Select
                    name="idServicio"
                    value={formData.idServicio}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione un servicio</option>
                    {servicios.map((servicio) => (
                      <option
                        key={servicio.idservicio}
                        value={servicio.idservicio}
                      >
                        {servicio.nombreservicio}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Día</Form.Label>
                  <Form.Control
                    type="date"
                    name="Dia"
                    value={formData.Dia}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Horario</Form.Label>
                  <Form.Control
                    type="time"
                    name="Horario"
                    value={formData.Horario}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Button
                  className={styles.createReservationButton}
                  type="submit"
                >
                  Crear Reserva
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
        {emailData && (
          <ContactUs
            to_name={emailData.to_name}
            to_email={emailData.to_email} // Pasar to_email al componente ContactUs
            from_name={emailData.from_name}
            NombreServicio={emailData.NombreServicio}
            Dia={emailData.Dia}
            Horario={emailData.Horario}
          />
        )}
      </Container>
    </section>
  );
};

export default Reservas;
