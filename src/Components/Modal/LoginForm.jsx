import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ handleClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            handleClose(); // Cierra el modal después de iniciar sesión
            navigate('/administrador'); // Redirige a la página de administración después de iniciar sesión
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{'ERROR: Usuario inexistente'}</p>}
                <button type="submit" className="btn btn-primary custom-btn">Ingresar</button>
            </form>
        </div>
    );
};

export default LoginForm;
