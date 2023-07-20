import express from 'express';
const router = express.Router();
import authController from '../controladores/authController.js'; // Agregar la extensión .js al import

// Ruta para registrar un nuevo usuario
router.post('/auth/register', authController.register);

// Ruta para iniciar sesión
router.post('/auth/login', authController.login);

export default router;
