import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Spinner, Alert, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import Inscripcionadmin from './Inscripcionadmin';

const Admin = () => {
    const [reservas, setReservas] = useState([]);
    const [inscripciones, setInscripciones] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState('reservas');
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({
        idCliente: '',
        idServicio: '',
        Dia: '',
        Horario: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredReservas, setFilteredReservas] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const [reservasResponse, inscripcionesResponse, clientesResponse, serviciosResponse, cursosResponse] = await Promise.all([
                axios.get('https://kiara-studio-vercel.vercel.app/api/reservas'),
                axios.get('https://kiara-studio-vercel.vercel.app/api/inscripcion'),
                axios.get('https://kiara-studio-vercel.vercel.app/api/clientes'),
                axios.get('https://kiara-studio-vercel.vercel.app/api/servicios'),
                axios.get('https://kiara-studio-vercel.vercel.app/api/cursos')
            ]);
            setReservas(reservasResponse.data);
            setFilteredReservas(reservasResponse.data);
            setInscripciones(inscripcionesResponse.data);
            setClientes(clientesResponse.data);
            setServicios(serviciosResponse.data);
            setCursos(cursosResponse.data);
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

    useEffect(() => {
        const results = reservas.filter(reserva =>
            getClienteNombre(reserva.idcliente).toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredReservas(results);
    }, [searchTerm, reservas]);

    const getClienteNombre = (idCliente) => {
        const cliente = clientes.find(c => c.idcliente === idCliente);
        return cliente ? cliente.nombreapellido : 'Cliente desconocido';
    };

    const getServicioNombre = (idServicio) => {
        const servicio = servicios.find(s => s.idservicio === idServicio);
        return servicio ? servicio.nombreservicio : 'Servicio desconocido';
    };

    const getCursoNombre = (idCurso) => {
        const curso = cursos.find(c => c.idcurso === idCurso);
        return curso ? curso.nombrecurso : 'Curso desconocido';
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://kiara-studio-vercel.vercel.app/api/${view}/${id}`);
            await fetchData();
        } catch (error) {
            console.error(`Error deleting ${view}:`, error);
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


        if (!data.idCliente || !data.idServicio || !data.Dia || !data.Horario) {
            setError({ message: 'Todos los campos son requeridos' });
            return;
        }

        try {
            if (view === 'reservas') {
                if (currentItem) {
                    await axios.put(`https://kiara-studio-vercel.vercel.app/api/reservas/${currentItem.idreserva}`, data);
                } else {
                    await axios.post('https://kiara-studio-vercel.vercel.app/api/reservas', data);
                }
            } else if (view === 'inscripciones') {
                if (currentItem) {
                    await axios.put(`https://kiara-studio-vercel.vercel.app/api/inscripcion/${currentItem.idinscripcion}`, data);
                } else {
                    await axios.post('https://kiara-studio-vercel.vercel.app/api/inscripcion', data);
                }
            }
            await fetchData();
            handleCloseModal();
        } catch (error) {
            console.error(`Error saving ${view}:`, error);
            setError(error);
        }
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setFormData({
            idCliente: item.idcliente,
            idServicio: item.idservicio,
            Dia: item.dia ? format(parseISO(item.dia), 'yyyy-MM-dd') : '',
            Horario: item.horario
        });
        setShowModal(true);
    };

    const handleAdd = () => {
        setCurrentItem(null);
        setFormData({ idCliente: '', idServicio: '', Dia: '', Horario: '' });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ idCliente: '', idServicio: '', Dia: '', Horario: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (selectedOption, actionMeta) => {
        setFormData(prev => ({ ...prev, [actionMeta.name]: selectedOption ? selectedOption.value : '' }));
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const clienteOptions = clientes.map(cliente => ({
        value: cliente.idcliente,
        label: cliente.nombreapellido
    }));

    const servicioOptions = servicios.map(servicio => ({
        value: servicio.idservicio,
        label: servicio.nombreservicio
    }));

    const cursoOptions = cursos.map(curso => ({
        value: curso.idcurso,
        label: curso.nombrecurso
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
            <h1 className="my-4">Administración</h1>
            <Form className="mb-4">
                <Form.Group controlId="viewSelect">
                    <Form.Label>Selecciona la vista</Form.Label>
                    <Form.Control
                        as="select"
                        value={view}
                        onChange={(e) => setView(e.target.value)}
                    >
                        <option value="reservas">Reservas</option>
                        <option value="inscripciones">Inscripciones</option>
                    </Form.Control>
                </Form.Group>
            </Form>

            {view === 'reservas' && (
                <>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Buscar por nombre del cliente..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </InputGroup>
                    <Button onClick={handleAdd} className="mb-4">Agregar Reserva</Button>
                    <Row>
                        {filteredReservas.map(reserva => (
                            <Col key={reserva.idreserva} md={4} className="mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{format(parseISO(reserva.dia), 'dd/MM/yyyy')}</Card.Title>
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
                </>
            )}

            {view === 'inscripciones' && (
                <Inscripcionadmin />
            )}

            <Modal show={showModal} onHide={handleCloseModal} style={{ zIndex: 1050 }}>
                <Form onSubmit={handleSave}>
                    <Modal.Header closeButton>
                        <Modal.Title>{currentItem ? `Editar ${view.slice(0, -1).toUpperCase()}` : `Agregar ${view.slice(0, -1).toUpperCase()}`}</Modal.Title>
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
                            <Form.Label>Curso/Servicio</Form.Label>
                            <Select
                                name="idServicio"
                                value={servicioOptions.find(option => option.value === formData.idServicio)}
                                onChange={handleSelectChange}
                                options={view === 'reservas' ? servicioOptions : cursoOptions}
                                isClearable
                                required
                            />
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
                            {currentItem ? `Guardar Cambios` : `Agregar ${view.slice(0, -1).toUpperCase()}`}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default Admin;

