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
    },
    cursos: {
        type: Array, 
        default: ["","",""]
    },
    role: {
        type: String, 
        default: "STUDENT_ROLE"
    }
    

});

const Estudiante = mongoose.model('Estudiante', EstudianteEschema);
module.exports = Estudiante;