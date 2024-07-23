import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Container, Card, Spinner, Alert, Button, Form } from 'react-bootstrap';
import ContactUs from './ContactUs';

const Reservas = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({

    nombreCliente: '',
    idServicio: '',
    Dia: '',
    Horario: '',
    Telefono: '',
    Email: ''
  });

  const [emailData, setEmailData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const serviciosResponse = await axios.get('https://kiara-studio-vercel.vercel.app/api/servicios');
      setServicios(serviciosResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error al cargar los datos. Por favor, intente de nuevo más tarde.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getClientId = async () => {
    try {

      const response = await axios.post('https://kiara-studio-vercel.vercel.app/api/clientes', {

        NombreApellido: formData.nombreCliente,
        Telefono: formData.Telefono,
        Email: formData.Email
      });
      console.log('Respuesta del servidor al crear cliente:', response.data);
      return response.data.id;
    } catch (error) {
      console.error('Error al crear o buscar el cliente:', error);
      throw new Error('Error al crear o buscar el cliente.');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Verificar campos requeridos
    if (!formData.nombreCliente || !formData.idServicio || !formData.Dia || !formData.Horario || !formData.Telefono || !formData.Email) {
      setError('Todos los campos son requeridos.');
      return;
    }

    try {

      const idcliente = await getClientId();
      console.log('idcliente obtenido:', idcliente);

      const data = {
        idCliente: idcliente,
        idServicio: formData.idServicio,
        Dia: formData.Dia,
        Horario: formData.Horario
      };

      console.log('Datos enviados:', data);

      const response = await axios.post('https://kiara-studio-vercel.vercel.app/api/reservas', data);

      console.log('Respuesta del servidor:', response);

      setSuccessMessage('Reserva guardada exitosamente.');
      setEmailData({
        to_name: formData.nombreCliente,
        from_name: 'Kiara Studio',
        idServicio: formData.idServicio,
        Dia: formData.Dia,
        Horario: formData.Horario
      });
      await fetchData();
      resetForm();
      setError(null);
    } catch (error) {
      console.error('Error saving reservation:', error);
      setError(error.response?.data?.message || 'Error al guardar la reserva. Por favor, intente de nuevo más tarde.');
    }
  };

  const resetForm = () => {
    setFormData({

      nombreCliente: '',
      idServicio: '',
      Dia: '',
      Horario: '',
      Telefono: '',
      Email: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Crear Nueva Reserva</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
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
            <Form.Group className="mb-3">
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
            <Form.Group className="mb-3">
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
            <Form.Group className="mb-3">
              <Form.Label>Servicio</Form.Label>
              <Form.Select
                name="idServicio"
                value={formData.idServicio}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione un servicio</option>
                {servicios.map(servicio => (
                  <option key={servicio.idservicio} value={servicio.idservicio}>{servicio.nombreservicio}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Día</Form.Label>
              <Form.Control
                type="date"
                name="Dia"
                value={formData.Dia}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Horario</Form.Label>
              <Form.Control
                type="time"
                name="Horario"
                value={formData.Horario}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Crear Reserva
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {emailData && (
        <ContactUs
          to_name={emailData.to_name}
          from_name={emailData.from_name}
          idServicio={servicios.idServicio}
          Dia={emailData.Dia}
          Horario={emailData.Horario}
        />
      )}
    </Container>
  );
};

export default Reservas;
