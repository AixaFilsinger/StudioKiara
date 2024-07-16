import React, { useEffect, useState } from 'react';
import styles from './Reserva.module.css';
import axios from 'axios';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
  const [disabledDates, setDisabledDate] = useState([]);

  //Solicitud al backend para obtener las fechas deshabilitadas
  useEffect(() => {
    const fetchDisabledDates = async () => {
      try{
        const rsp = await axios.get('http://localhost:3002/disabledDates'); //Cambiar cuando este lista la base de datos
        if(rsp.status === 200){
          console.log('Fechas deshabilitadas obtenidas:', rsp.data);
          const dates = [];
          rsp.data.forEach(item => {
            dates.push(item.date);
          });
          setDisabledDate(dates);
        }
      } catch(error){
        console.error('Error al recuperar las fechas deshabilitadas', error);
      }
    };
    fetchDisabledDates();
  }, []);

  const disableSundays = (date) => {
    const day = date.getDay();
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
      time: selectedTimes[0]
    });
  };

  const handleDateChange = (selectedDates) => {
    setFormData({
      ...formData,
      date: selectedDates[0]
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
            <option value=''>Seleccione el servicio</option>
            <option value='nails'>Uñas</option>
            <option value='eyelashes'>Pestañas</option>
            <option value='eyebrows'>Cejas</option>
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Día:
          <Flatpickr
            className={styles.flatpickrContainer}
            value={formData.date}
            onChange={handleDateChange}
            options={{
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "Y-m-d",
              minDate: "today",
              disable: [...disabledDates, disableSundays]
            }}
            required
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Hora:
          <Flatpickr
          value={formData.time}
          onChange={handleTimeChange}
            options= {{
              enableTime: true,
              noCalendar: true,
              minTime: "10:00",
              maxTime: "20:00",
            }}
            required
          />
          {/* <select
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
          </select> */}
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
