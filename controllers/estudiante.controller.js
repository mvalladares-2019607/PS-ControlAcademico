const Estudiante = require('../models/estudiante');

exports.estudiantesGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total, estudiantes] = await Promise.all([
        Estudiante.countDocuments(query),
        Estudiante.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        estudiantes
    });
} 

exports.crearEstudiante = async (req, res) => {
    try {
      const { nombre, correo, password } = req.body;  
      const estudianteExistente = await Estudiante.findOne({ correo });
      if (estudianteExistente) {
        return res.status(400).json({ message: 'El estudiante ya existe' });
      }
      const nuevoEstudiante = new Estudiante({ nombre, correo, password });
      await nuevoEstudiante.save();
      res.status(201).json({ message: 'Estudiante creado exitosamente', estudiante: nuevoEstudiante });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el estudiante', error: error.message });
    }
  };

  exports.eliminarEstudiante = async (req, res) =>{
    const { id } = req.params;
    await Estudiante.findByIdAndUpdate(id, {estado:false});

    const estudiante = await Estudiante.findOne({_id: id});
    res.status(201).json({message: 'Usuario eliminado exitosamente'}), 
    estudiante
  };

  exports.actualizarPerfilEstudiante = async (req, res) => {
    try {
      const { nombre, correo } = req.body;
      const estudianteId = req.params.id;
      const estudiante = await Estudiante.findById(estudianteId);
      if (!estudiante) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
      estudiante.nombre = nombre;
      estudiante.correo = correo;
      await estudiante.save();
      res.status(200).json({ message: 'Perfil del estudiante actualizado correctamente', estudiante });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el perfil del estudiante', error: error.message });
    }
  };