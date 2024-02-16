const mongoose = require('moongose');

const MaestroSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        required: [true, 'Se necesita nombre']
    }, 
    correo: {
        type: String, 
        required: [true, 'Se necesita correo']
    },
    password: {
        type: String, 
        required: [true, 'Se necesita contraseña']
    } ,
    estado: {
        type: Boolean, 
        default:true
    }
});

const Maestro = moongose.model('Maestro', MaestroSchema);
module.exports = Maestro;