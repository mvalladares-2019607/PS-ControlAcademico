const mongoose = require('mongoose');

const EstudianteEschema = new mongoose.Schema ({
    nombre: {
        type: String, 
        required: [true, 'Se necesita un nombre']
    }, 
    correo: {
        type: String, 
        required: [true, 'Se necesita un correo']
    }, 
    password: {
        type: String, 
        required: [true, 'Se necesita contraseña']
    }, 
    estado: {
        type: Boolean, 
        default:true
    }
  /*  role: { type: String, enum: ['TEACHER_ROLE', 'STUDENT_ROLE'], default: 'STUDENT_ROLE' },

    cursos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }]*/

});

const Estudiante = mongoose.model('Estudiante', EstudianteEschema);
module.exports = Estudiante;