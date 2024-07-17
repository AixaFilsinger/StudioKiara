import React, { useEffect, useState } from 'react';
import styles from './Reserva.module.css';
import axios from 'axios';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const Reservas = () => {
  const initialState = {
    NombreApellido: '',
    Email: '',
    Telefono: '',
    idServicio: '',
    Dia: '',
    Horario: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchDisabledDates = async () => {
      try {
        const rsp = await axios.get('http://localhost:3001/disabledDates'); // Cambiar cuando esté lista la base de datos
        if (rsp.status === 200) {
          console.log('Fechas deshabilitadas obtenidas:', rsp.data);
          const Dias = [];
          rsp.data.forEach(item => {
            Dias.push(item.Dia);
          });
          setDisabledDates(Dias);
        }
      } catch (error) {
        console.error('Error al recuperar las fechas deshabilitadas', error);
      }
    };
    fetchDisabledDates();
  }, []);

  const disableSundays = (Dia) => {
    const day = Dia.getDay();
    return day === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTimeChange = (selectedTimes) => {
    setFormData({
      ...formData,
      Horario: selectedTimes[0] ? selectedTimes[0].toTimeString().split(' ')[0] : '' // HH:MM:SS
    });
  };

  const handleDateChange = (selectedDates) => {
    setFormData({
      ...formData,
      Dia: selectedDates[0] ? selectedDates[0].toISOString().split('T')[0] : '' // YYYY-MM-DD
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Reserva confirmada:', formData);
    try {
      // Enviar datos del cliente y obtener el ID del cliente
      const clienteResponse = await axios.post('https://kiara-studio-vercel.vercel.app/api/Clientes', {
        NombreApellido: formData.NombreApellido,
        Telefono: formData.Telefono,
        Email: formData.Email
      });
      const idCliente = clienteResponse.data.id;

      // Enviar datos de la reserva junto con el ID del cliente
      const reservaResponse = await axios.post('https://kiara-studio-vercel.vercel.app/api/Reservas', {
        idCliente: idCliente,
        idServicio: formData.idServicio,
        Dia: formData.Dia,
        Horario: formData.Horario
      });

      setClientes([...clientes, clienteResponse.data]);
      setReservas([...reservas, reservaResponse.data]);

      setFormData(initialState); // Limpiamos el formulario después de enviarlo
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setErrors([error.response?.data?.message || 'Error en la solicitud']);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>
          Apellido y Nombre:
          <input
            type="text"
            name="NombreApellido"
            value={formData.NombreApellido}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Correo Electrónico:
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Número de Celular:
          <input
            type="tel"
            name="Telefono"
            value={formData.Telefono}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Tipo de servicio:
          <select
            name="idServicio"
            value={formData.idServicio}
            onChange={handleChange}
            required
          >
            <option value=''>Seleccione el servicio</option>
            <option value='1'>Manicura y Pedicura</option>
            <option value='2'>Lifting de pestañas</option>
            <option value='3'>Tratamiento en cejas</option>
            <option value='4'>Depilación Láser</option>
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Día:
          <Flatpickr
            className={styles.flatpickrContainer}
            value={formData.Dia}
            onChange={handleDateChange}
            options={{
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "Y-m-d",
              minDate: "today",
              disable: [
                ...disabledDates, 
                disableSundays
              ]
            }}
            required
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Hora:
          <Flatpickr
            value={formData.Horario}
            onChange={handleTimeChange}
            options={{
              enableTime: true,
              noCalendar: true,
              minTime: "10:00",
              maxTime: "20:00",
            }}
            required
          />
        </label>
      </div>
      <div>
      <button type="submit" name="confirmarReserva" className={styles.confirmarReservaButton}>Confirmar Reserva</button>
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index} style={{ color: 'red' }}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default Reservas;
