const { Schema, model} = require('mongoose');

const EstudianteEschema = Schema ({
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
    role: { type: String, enum: ['TEACHER_ROLE', 'STUDENT_ROLE'], default: 'STUDENT_ROLE' },
    cursos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }]

});

module.exports = model('Estudiante', EstudianteEschema);