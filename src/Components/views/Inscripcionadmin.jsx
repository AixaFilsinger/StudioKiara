import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap';
import Select from 'react-select';

const Inscripcionadmin = () => {
    const [inscripciones, setInscripciones] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showInscripcionModal, setShowInscripcionModal] = useState(false);
    const [currentInscripcion, setCurrentInscripcion] = useState(null);
    const [formData, setFormData] = useState({
        idCliente: '',
        idCurso: '',
        Telefono: '',
        Email: ''
    });

    const fetchData = useCallback(async () => {
        try {
            const [inscripcionesResponse, clientesResponse, cursosResponse] = await Promise.all([
                axios.get('https://kiara-studio-vercel.vercel.app/api/inscripcion'),
                axios.get('https://kiara-studio-vercel.vercel.app/api/clientes'),
                axios.get('https://kiara-studio-vercel.vercel.app/api/cursos')
            ]);
            setInscripciones(inscripcionesResponse.data);
            setClientes(clientesResponse.data);
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

    const getClienteNombre = (idCliente) => {
        const cliente = clientes.find(c => c.idcliente === idCliente);
        return cliente ? cliente.nombreapellido : 'Cliente desconocido';
    };

    const getClienteTelefono = (idCliente) => {
        const cliente = clientes.find(c => c.idcliente === idCliente);
        return cliente ? cliente.telefono : 'Teléfono desconocido';
    };

    const getClienteEmail = (idCliente) => {
        const cliente = clientes.find(c => c.idcliente === idCliente);
        return cliente ? cliente.email : 'Email desconocido';
    };

    const getCursoNombre = (idCurso) => {
        const curso = cursos.find(c => c.idcurso === idCurso);
        return curso ? curso.nombrecurso : 'Curso desconocido';
    };

    const handleDelete = async (idInscripcion) => {
        try {
            await axios.delete(`https://kiara-studio-vercel.vercel.app/api/inscripcion/${idInscripcion}`);
            await fetchData();
        } catch (error) {
            console.error('Error deleting inscription:', error);
            setError(error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const data = {
            ...formData,
            Telefono: formData.Telefono,
            Email: formData.Email
        };

        // Verificar campos requeridos
        if (!data.idCliente || !data.idCurso || !data.Telefono || !data.Email) {
            setError({ message: 'Todos los campos son requeridos' });
            return;
        }

        try {
            if (currentInscripcion) {
                await axios.put(`https://kiara-studio-vercel.vercel.app/api/inscripcion/${currentInscripcion.idinscripcion}`, data);
            } else {
                await axios.post('https://kiara-studio-vercel.vercel.app/api/inscripcion', data);
            }
            await fetchData();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving inscription:', error);
            setError(error);
        }
    };

    const handleEdit = (inscripcion) => {
        setCurrentInscripcion(inscripcion);
        setFormData({
            idCliente: inscripcion.idcliente,
            idCurso: inscripcion.idcurso,
            Telefono: inscripcion.telefono,
            Email: inscripcion.email
        });
        setShowInscripcionModal(true);
    };

    const handleAdd = () => {
        setCurrentInscripcion(null);
        setFormData({ idCliente: '', idCurso: '', Telefono: '', Email: '' });
        setShowInscripcionModal(true);
    };

    const handleCloseModal = () => {
        setShowInscripcionModal(false);
        setFormData({ idCliente: '', idCurso: '', Telefono: '', Email: '' });
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
            <h1 className="my-4">Inscripciones</h1>
            <Button onClick={handleAdd} className="mb-4">Agregar Inscripción</Button>
            <Row>
                {inscripciones.map(inscripcion => (
                    <Col key={inscripcion.idinscripcion} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{getCursoNombre(inscripcion.idcurso)}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{getClienteNombre(inscripcion.idcliente)}</Card.Subtitle>
                                <Card.Text><strong>Teléfono Cliente:</strong> {getClienteTelefono(inscripcion.idcliente)}</Card.Text>
                                <Card.Text><strong>Email Cliente:</strong> {getClienteEmail(inscripcion.idcliente)}</Card.Text>
                                <Button variant="primary" onClick={() => handleEdit(inscripcion)}>Editar</Button>
                                <Button variant="danger" onClick={() => handleDelete(inscripcion.idinscripcion)} className="ms-2">Eliminar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showInscripcionModal} onHide={handleCloseModal} style={{ zIndex: 1050 }}>
                <Form onSubmit={handleSave}>
                    <Modal.Header closeButton>
                        <Modal.Title>{currentInscripcion ? 'Editar Inscripción' : 'Agregar Inscripción'}</Modal.Title>
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
                            <Form.Label>Curso</Form.Label>
                            <Select
                                name="idCurso"
                                value={cursoOptions.find(option => option.value === formData.idCurso)}
                                onChange={handleSelectChange}
                                options={cursoOptions}
                                isClearable
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
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                        <Button variant="primary" type="submit">
                            {currentInscripcion ? 'Guardar Cambios' : 'Agregar Inscripción'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default Inscripcionadmin;

