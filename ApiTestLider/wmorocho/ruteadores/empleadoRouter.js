import express from 'express';
const router = express.Router();
import empleadoController from '../controladores/empleadoController.js'; // Agregar la extensión .js al import
import jwtMiddleware from '../middlewares/jwtMiddleware.js'; // Agregar la extensión .js al import

// Middleware para verificar el token JWT antes de acceder a los endpoints de empleados
router.use(jwtMiddleware);

// Ruta para obtener todos los empleados con sueldo diferente de cero
router.get('/empleados', empleadoController.obtenerEmpleados);

// Ruta para obtener un empleado por ID o nombre si su sueldo está entre 500 y 1000
router.get('/empleado/:id', empleadoController.obtenerEmpleadoPorIdONombre);

// Ruta para crear un nuevo empleado
router.post('/empleados', empleadoController.crearEmpleado);

// Ruta para actualizar un empleado por ID o nombre
router.patch('/empleados/:id', empleadoController.actualizarEmpleado);

// Ruta para eliminar un empleado por ID o nombre
router.delete('/empleado/:id', empleadoController.eliminarEmpleado);

export default router;
