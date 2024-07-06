import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

const Admin = () => {
    const [reservas, setReservas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
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
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getClienteNombre = (idcliente) => {
        const cliente = clientes.find(c => c.idcliente === idcliente);
        return cliente ? cliente.nombreapellido : 'Cliente desconocido';
    };

    const getServicioNombre = (idservicio) => {
        const servicio = servicios.find(s => s.idservicio === idservicio);
        return servicio ? servicio.nombreservicio : 'Servicio desconocido';
    };

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
                    Error al cargar los datos: {error.message}
                </Alert>
            </Container>
        );
    }

    return (
        <Container>
            <h1 className="my-4">Reservas</h1>
            <Row>
                {reservas.map(reserva => (
                    <Col key={reserva.idreserva} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{format(new Date(reserva.dia), 'dd/MM/yyyy')}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{reserva.horario.substring(0, 5)}</Card.Subtitle>
                                <Card.Text><strong>Cliente:</strong> {getClienteNombre(reserva.idcliente)}</Card.Text>
                                <Card.Text><strong>Servicio:</strong> {getServicioNombre(reserva.idservicio)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Admin;

// instalar (npm install date-fns) para poder funcionar el formato de dias y hora