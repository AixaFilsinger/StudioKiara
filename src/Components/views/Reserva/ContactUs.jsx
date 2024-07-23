import React, { useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = ({ to_name, from_name, Servicio, Dia, Horario }) => {
    const form = useRef();

    useEffect(() => {
        sendEmail();
    }, []);

    const sendEmail = () => {
        emailjs
            .sendForm('service_3g5jkxz', 'template_0dzpmlm', form.current, 'QldQ9QNi9ySP848QW')
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <form ref={form} style={{ display: 'none' }}>
            <input type="text" name="to_name" value={to_name} readOnly />
            <input type="text" name="from_name" value={from_name} readOnly />
            <input type="text" name="Servicio" value={Servicio} readOnly />
            <input type="text" name="Dia" value={Dia} readOnly />
            <input type="text" name="Horario" value={Horario} readOnly />
        </form>
    );
};

export default ContactUs;
