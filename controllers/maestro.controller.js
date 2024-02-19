const Maestro = require('../models/maestro'); 

exports.maestrosGet = async (req, res = response)=>{
    const { limite, desde } = req.query; 
    const query = { estado: true}; 

    const [total, maestros] = await Promise.all([
        Maestro.countDocuments(query), 
        Maestro.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        maestros
    });
}

exports.crearMaestro = async ( req, res) =>{
    try{
        const { nombre, correo, password} = req.body;
        const maestroExistente = await Maestro.findOne({ correo });
        if(maestroExistente){
            return res.status(400).json({message: 'El maestro ya existe'});
        }
        const nuevoMaestro = new Maestro({nombre, correo, password});
        await nuevoMaestro.save(); 
        res.status(201).json({message: 'El maestro se creó correctamente', maestro: nuevoMaestro });
    }catch(error){
        res.status(500).json({ message: 'Error al crear el maestro', error: error.message});

    }
};

exports.eliminarPerfilMaestro = async (req, res) =>{
  const { id } = req.params;

  try {
      await Maestro.findByIdAndUpdate(id, {estado: false});
      const maestroActualizado = await Maestro.findOne({_id: id});
      if (!maestroActualizado) {
          return res.status(404).json({ message: 'Maestro no encontrado' });
      }
      res.json({ message: 'Perfil eliminado correctamente', maestro: maestroActualizado });
  } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el perfil del maestro', error: error.message });
  }
};

exports.actualizarPerfilMaestro = async (req, res) => {
    try {
      const { nombre, correo } = req.body;
      const maestroId = req.params.id;
      const maestro = await Maestro.findById(maestroId);
      if (!maestro) {
        return res.status(404).json({ message: 'Maestro no encontrado' });
      }
      maestro.nombre = nombre;
      maestro.correo = correo;
      await maestro.save();
      res.status(200).json({ message: 'Perfil del maestro actualizado correctamente', maestro });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el perfil del maestro', error: error.message });
    }
  };