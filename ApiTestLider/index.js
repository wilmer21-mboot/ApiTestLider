import express from 'express';
import bodyParser from 'body-parser';

// Conexión a la base de datos de MongoDB
import './db.js'; // Agregar la extensión .js al import

// Crear la aplicación de Express
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rutas de la API REST
import authRouter from './wmorocho/ruteadores/authRouter.js'; // Agregar la extensión .js al import
import empleadoRouter from './wmorocho/ruteadores/empleadoRouter.js'; // Agregar la extensión .js al import

app.use('/api', authRouter);
app.use('/api', empleadoRouter);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor API REST escuchando en http://localhost:${port}`);
});
