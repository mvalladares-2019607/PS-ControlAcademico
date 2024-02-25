const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'se necesita el nombre']
  },
  correo: {
    type: String,
    required: [true, 'se necesita el correo']
  },
  password: {
    type: String,
    required: [true, 'se necesita password']
  },
  cursos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso',
  }],
  rol: {
    type: String,
    enum: ['TEACHER_ROLE', 'STUDENT_ROLE'],
    default: 'STUDENT_ROLE',
  },
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);
module.exports = Estudiante;
