const Curso = require('../models/curso');

exports.cursoGet = async (req, res = response) =>{
    const { limite, desde} = req.query; 

    const query = {estado: true};

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query), 
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
}
exports.crearCurso= async ( req, res) =>{
    try{
        const { nombre } = req.body;
        const cursoExistente = await Curso.findOne({ nombre });
        if(cursoExistente){
            return res.status(400).json({message: 'El curso ya existe'});
        }
        const nuevoCurso = new Curso({ nombre });
        await nuevoCurso.save(); 
        res.status(201).json({message: 'El curso se creó correctamente', curso: nuevoCurso });
    }catch(error){
        res.status(500).json({ message: 'Error al crear el curso', error: error.message});

    }
};
exports.actualizarCurso= async (req, res) => {
    try {
      const { nombre } = req.body;
      const cursoId = req.params.id;
      const curso = await Curso.findById(cursoId);
      if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      curso.nombre = nombre;
      
      await curso.save();
      res.status(200).json({ message: 'curso actualizado correctamente', curso });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el curso', error: error.message });
    }
  };

  exports.eliminarCurso = async (req, res) =>{
    const { id } = req.params;
    await Curso.findByIdAndUpdate(id, {estado:false});
  
    const curso = await Curso.findOne({_id: id});
    res.status(201).json({message: 'Curso eliminado exitosamente'}), 
    curso
  };