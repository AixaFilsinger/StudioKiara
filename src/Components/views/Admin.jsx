import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { format, parseISO, addDays } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap';
import Select from 'react-select';

const Admin = () => {
    const [reservas, setReservas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showReservaModal, setShowReservaModal] = useState(false);
    const [currentReserva, setCurrentReserva] = useState(null);
    const [formData, setFormData] = useState({
        idCliente: '',
        idServicio: '',
        Dia: '',
        Horario: ''
    });

    const fetchData = useCallback(async () => {
        try {
            const [reservasResponse, clientesResponse, serviciosResponse] = await Promise.all([
                axios.get('https://kiara-studio-vercel.vercel.app/api/reservas'),
                axios.get('https://kiara-studio-vercel.vercel.app/api/clientes'),
                axios.get('https://kiara-studio-vercel.vercel.app/api/servicios')
            ]);
            setReservas(reservasResponse.data);
            setClientes(clientesResponse.data);
            setServicios(serviciosResponse.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getClienteNombre = (idCliente) => {
        const cliente = clientes.find(c => c.idcliente === idCliente);
        return cliente ? cliente.nombreapellido : 'Cliente desconocido';
    };

    const getServicioNombre = (idServicio) => {
        const servicio = servicios.find(s => s.idservicio === idServicio);
        return servicio ? servicio.nombreservicio : 'Servicio desconocido';
    };

    const handleDelete = async (idReserva) => {
        try {
            await axios.delete(`https://kiara-studio-vercel.vercel.app/api/reservas/${idReserva}`);
            await fetchData();
        } catch (error) {
            console.error('Error deleting reservation:', error);
            setError(error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const data = {
            ...formData,
            Dia: new Date(formData.Dia).toISOString(),
            Horario: formData.Horario
        };

        // Verificar campos requeridos
        if (!data.idCliente || !data.idServicio || !data.Dia || !data.Horario) {
            setError({ message: 'Todos los campos son requeridos' });
            return;
        }

        try {
            if (currentReserva) {
                await axios.put(`https://kiara-studio-vercel.vercel.app/api/reservas/${currentReserva.idreserva}`, data);
            } else {
                await axios.post('https://kiara-studio-vercel.vercel.app/api/reservas', data);
            }
            await fetchData();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving reservation:', error);
            setError(error);
        }
    };

    const handleEdit = (reserva) => {
        setCurrentReserva(reserva);
        setFormData({
            idCliente: reserva.idcliente,
            idServicio: reserva.idservicio,
            Dia: format(parseISO(reserva.dia), 'yyyy-MM-dd'),
            Horario: reserva.horario
        });
        setShowReservaModal(true);
    };

    const handleAdd = () => {
        setCurrentReserva(null);
        setFormData({ idCliente: '', idServicio: '', Dia: '', Horario: '' });
        setShowReservaModal(true);
    };

    const handleCloseModal = () => {
        setShowReservaModal(false);
        setFormData({ idCliente: '', idServicio: '', Dia: '', Horario: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (selectedOption, actionMeta) => {
        setFormData(prev => ({ ...prev, [actionMeta.name]: selectedOption ? selectedOption.value : '' }));
    };

    const clienteOptions = clientes.map(cliente => ({
        value: cliente.idcliente,
        label: cliente.nombreapellido
    }));

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <div>Cargando...</div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    Error: {error.message}
                </Alert>
            </Container>
        );
    }

    return (
        <Container>
            <h1 className="my-4">Reservas</h1>
            <Button onClick={handleAdd} className="mb-4">Agregar Reserva</Button>
            <Row>
                {reservas.map(reserva => (
                    <Col key={reserva.idreserva} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{format(addDays(parseISO(reserva.dia), 1), 'dd/MM/yyyy')}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{reserva.horario}</Card.Subtitle>
                                <Card.Text><strong>Cliente:</strong> {getClienteNombre(reserva.idcliente)}</Card.Text>
                                <Card.Text><strong>Servicio:</strong> {getServicioNombre(reserva.idservicio)}</Card.Text>
                                <Button variant="primary" onClick={() => handleEdit(reserva)}>Editar</Button>
                                <Button variant="danger" onClick={() => handleDelete(reserva.idreserva)} className="ms-2">Eliminar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showReservaModal} onHide={handleCloseModal} style={{ zIndex: 1050 }}>
                <Form onSubmit={handleSave}>
                    <Modal.Header closeButton>
                        <Modal.Title>{currentReserva ? 'Editar Reserva' : 'Agregar Reserva'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Cliente</Form.Label>
                            <Select
                                name="idCliente"
                                value={clienteOptions.find(option => option.value === formData.idCliente)}
                                onChange={handleSelectChange}
                                options={clienteOptions}
                                isClearable
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                        <Button variant="primary" type="submit">
                            {currentReserva ? 'Guardar Cambios' : 'Agregar Reserva'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default Admin;

