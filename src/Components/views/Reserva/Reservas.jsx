import React, { useState } from 'react';
import styles from './Reserva.module.css';
import axios from 'axios';

const Reservas = () => {
  const initialState = {
    nombreApellido: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Reserva confirmada:', formData);
    try {
      const response = await axios.post('http://localhost:3001/validateReservation', formData);

      if (response.status === 200) {
        console.log('Datos válidos:', response.data);
        setErrors([])
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
    setFormData(initialState); // Limpiamos el formulario después de enviarlo
  };

  
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>
          Apellido y Nombre:
          <input
            type="text"
            name="nombreApellido"
            value={formData.nombreApellido}
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
            name="email"
            value={formData.email}
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
            name="phone"
            value={formData.phone}
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
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value=''>Seleccione el servicio que desea reservar</option>
            <option value='nails'>Uñas</option>
            <option value='eyelashes'>Pestañas</option>
            <option value='eyebrows'>Cejas</option>
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Día:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Hora:
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una hora</option>
            {Array.from({ length: 11 }, (_, index) => (
              <option key={index + 10} value={`${index + 10}:00`}>
                {`${index + 10}:00`}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <button type="submit">Confirmar Reserva</button>
        {errors.length > 0 && (
          <ul>
            {errors.map((error,index) => (
              <li key={index} style={{color: 'red'}}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default Reservas;
