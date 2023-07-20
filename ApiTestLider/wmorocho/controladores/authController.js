import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../modelos/usuario.js'; // Agregar la extensión .js al import

const SECRET_KEY = 'wmoro09'; // Cambia esta clave secreta por una más segura

// Controlador para registrar un nuevo usuario
const register = async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ error: 'El usuario ya está registrado' });
    }

    // Encriptar la contraseña antes de guardarla en la base de datos
    const saltRounds = 10;
    const hashedContraseña = await bcrypt.hash(contraseña, saltRounds);

    // Crear el nuevo usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      contraseña: hashedContraseña,
    });

    // Crear y firmar el token JWT
    const token = jwt.sign({ id: nuevoUsuario._id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Controlador para iniciar sesión
const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Buscar el usuario en la base de datos por su correo electrónico
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ error: 'El usuario no está registrado' });
    }

    // Verificar la contraseña del usuario
    const contraseñaCoincide = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaCoincide) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crear y firmar el token JWT
    const token = jwt.sign({ id: usuario._id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

export default {
  register,
  login,
};
