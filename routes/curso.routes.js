const express = require('express'); 

const router = express.Router();

const cursoController = require ('../controllers/curso.controller');
const { verificarToken } = require('../middlewares/authMiddleware');

//GET 
router.get('/', cursoController.cursoGet);
//Post 
router.post('/', verificarToken, cursoController.crearCurso)
// Put 
router.put('/:id', cursoController.actualizarCurso);
// Delete
router.delete('/:id', cursoController.eliminarCurso);
module.exports = router;
