const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:5173',
            'http://localhost:3001'
        ]

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }

        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
}))



// Rutas
app.post("/validateReservation", (req, res) => {

    const { nombreApellido, email, phone, service, date, time } = req.body;
    const errors = [];

    if (!nombreApellido || typeof nombreApellido !== "string")
        errors.push("Nombre inválido");
    if (!email || !/\S+@\S+\.\S+/.test(email))
        errors.push("Correo electrónico inválido");
    if (!phone || !/^\d{10}$/.test(phone)) errors.push("Teléfono inválido");

    const validServices = ["nails", "eyelashes", "eyebrows"];
    if (!service || !validServices.includes(service))
        errors.push("Servicio inválido");

    if (!date || isNaN(Date.parse(date))) errors.push("Fecha inválida");
    
    const validTimes = [];
    for (let hour = 8; hour <= 17; hour++) {
        const timeString = hour.toString().padStart(2, '0') + ':00';
        validTimes.push(timeString);
    }
    if (!time || !validTimes.includes(time)) errors.push("Hora inválida");

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    res.status(200).json({ message: "Datos válidos" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
