const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({mensaje: 'No se ha proporcionado un token válido'});
    }
    jwt.verify(token, 'secreto', (error, decoded)=> {
        if(error){
            return res.status (401).json({mensaje: 'Token inválido'});
        }
        req.estudianteId = decoded.id;
        next();
    });
};