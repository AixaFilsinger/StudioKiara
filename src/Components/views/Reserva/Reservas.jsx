import React, { useState } from 'react';
import styles from './Reserva.module.css';

const Reservas = () => {
  const [formData, setFormData] = useState({
    nombreApellido: '',
    email: '',
    celular: '',
    dia: '',
    hora: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reserva confirmada:', formData);
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
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Día:
          <input
            type="date"
            name="dia"
            value={formData.dia}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Hora:
          <select
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una hora</option>
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
      </div>
    </form>
  );
};

export default Reservas;