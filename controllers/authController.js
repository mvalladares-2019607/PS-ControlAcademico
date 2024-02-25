
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Estudiante = require('../models/estudiante');

exports.registro = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;
    const estudianteExistente = await Estudiante.findOne({ correo });
    if (estudianteExistente) {
      return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const nuevoEstudiante= new Estudiante({ nombre, correo , password: hashedPassword });
    await nuevoEstudiante.save();
    res.status(201).json({ mensaje: 'Estudiante registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const estudiante = await Estudiante.findOne({ correo }); 
    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }
    const passwordValido = await bcryptjs.compare(password, estudiante.password); 
    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' }); 
    }
    const token = jwt.sign({ id: estudiante._id }, 'secreto');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
