const mongoose = require('mongoose'); 

const CursoSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        required: [true, 'Se necesita un nombre']
    }, 
    estado: {
        type: Boolean, 
        default: true
    }
}); 

const Curso = mongoose.model('Curso', CursoSchema);
module.exports = Curso;