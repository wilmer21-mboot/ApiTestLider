import jwt from 'jsonwebtoken';
const SECRET_KEY = 'wmoro09'; // Cambia esta clave secreta por la misma que usaste en "authController.js"

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
  }

  try {
    // Verificar y decodificar el token JWT
    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token de autenticación inválido' });
  }
};

export default jwtMiddleware;
