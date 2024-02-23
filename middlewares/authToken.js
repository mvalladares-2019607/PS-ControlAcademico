const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
  
  const token = req.header('Authorization');

 
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, 'secreto');
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: 'Token inválido' });
  }
};

module.exports = autenticarToken;
