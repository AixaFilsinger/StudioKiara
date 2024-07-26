import React, { useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = ({ to_name, to_email, from_name, NombreServicio, Dia, Horario }) => {
    const form = useRef();

    useEffect(() => {
        // console.log('to_email:', to_email); // Verifica el valor de to_email
        if (validateEmail(to_email)) {
            sendEmail();
        } else {
            console.error('Invalid email address.');
        }
    }, [to_email]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const sendEmail = () => {
        emailjs
            .sendForm('service_3g5jkxz', 'template_0dzpmlm', form.current, 'QldQ9QNi9ySP848QW')
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                }
            );
    };

    return (
        <form ref={form} style={{ display: 'none' }}>
            <input type="text" name="to_name" value={to_name} readOnly />
            <input type="email" name="to_email" value={to_email} readOnly />
            <input type="text" name="from_name" value={from_name} readOnly />
            <input type="text" name="NombreServicio" value={NombreServicio} readOnly />
            <input type="text" name="Dia" value={Dia} readOnly />
            <input type="text" name="Horario" value={Horario} readOnly />
        </form>
    );
};

export default ContactUs;
