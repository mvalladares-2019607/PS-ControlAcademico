const Estudiante = require ('../models/estudiante');

exports.registrarEstudiante = async (req, res) =>{
    try{
        const { nombre, correo, password} = req.body;
        const estudianteExistente = await Estudiante.findOne({correo})
        if(estudianteExistente){
            return res.status(400).json({mensaje: 'El correo electrónico ya está registrado'});
        }
        const estudianteNuevo = new Estudiante ({ nombre, correo, password});
        await estudianteNuevo.save();
        res.status(201).json({mensaje: 'El estudiante ha sido registrado correctamente'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

exports.asignarCurso = async (req, res) => {
    try{
        const { cursoId } = req.body; 
        const estudianteId = req.estudianteId;
        const estudiante = await Estudiante.findById(estudianteId);
        if(!estudiante){
            return res.status(404).json({mensaje: 'No se ha encontrdo al estudiante'});
        }
        if(estudiante.cursos.length >= 3){
            return res.status(400).json({mensaje: 'Solamente puede asignarse a 3 cursos.'});
        }
        if(estudiante.cursos.includes(cursoId)){
            return res.status(400).json({mensaje: 'El estudiante ya está en este curso'});
        }
        estudiante.cursos.push(cursoId);
        await estudiante.save(); 
        res.json({ mensaje: 'Curso asignado exitosamente'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};
exports.obtenerCursosAsignados = async (req, res) => {
    try {
        const estudianteId = req.estudianteId;
        const estudiante = await Estudiante.findById(estudianteId).populate('cursos', 'nombre descripcion');
        if (!estudiante) {
            return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        }
        res.json({ cursos: estudiante.cursos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.editarPerfilEstudiante = async (req, res) => {
    try {
        const estudianteId = req.estudianteId;
        const estudiante = await Estudiante.findById(estudianteId);
        if (!estudiante) {
            return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        }
        estudiante.nombre = req.body.nombre;
        estudiante.correo = req.body.correo;
        await estudiante.save();
        res.json({ mensaje: 'Perfil actualizado correctamente', estudiante });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.eliminarPerfilEstudiante = async (req, res) => {
    try {
        const estudianteId = req.estudianteId;
        await Estudiante.findByIdAndDelete(estudianteId);
        res.json({ mensaje: 'Perfil eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};