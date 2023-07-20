import Empleado from '../modelos/empleado.js'; // Agregar la extensión .js al import

// Controlador para obtener todos los empleados con sueldo diferente de cero
const obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find({ sueldo: { $ne: 0 } });
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los empleados' });
  }
};

// Controlador para obtener un empleado por ID o nombre si su sueldo está entre 500 y 1000
const obtenerEmpleadoPorIdONombre = async (req, res) => {
  try {
    const { id } = req.params;
    let empleado;

    if (id.length === 24) {
      // Si el parámetro es un ID válido, buscar por ID
      empleado = await Empleado.findById(id);
    } else {
      // Si el parámetro no es un ID válido, buscar por nombre
      empleado = await Empleado.findOne({ nombre: id });
    }

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    if (empleado.sueldo < 500 || empleado.sueldo > 1000) {
      return res.status(403).json({ error: 'Sueldo del empleado fuera del rango permitido' });
    }

    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el empleado' });
  }
};

// Controlador para crear un nuevo empleado
const crearEmpleado = async (req, res) => {
  try {
    const { nombre, cedula, cargo, sueldo } = req.body;
    const sueldoCalculado = sueldo * 1.1; // Aumentar el sueldo en un 10%

    const nuevoEmpleado = await Empleado.create({
      nombre,
      cedula,
      cargo,
      sueldo: sueldoCalculado,
    });

    res.json(nuevoEmpleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el empleado' });
  }
};

// Controlador para actualizar un empleado por ID o nombre
const actualizarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { cargo, sueldo } = req.body;

    const empleado = await Empleado.findOneAndUpdate(
      { $or: [{ _id: id }, { nombre: id }] },
      { cargo, sueldo },
      { new: true }
    );

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el empleado' });
  }
};

// Controlador para eliminar un empleado por ID o nombre
const eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    const empleado = await Empleado.findOneAndDelete({ $or: [{ _id: id }, { nombre: id }] });

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
};

export default {
  obtenerEmpleados,
  obtenerEmpleadoPorIdONombre,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
};
