const express = require('express');
const router = express();

const {  crearMedicamento, obtenerMedicamentos, obtenerMedicamentoPorId, actualizarMedicamento, eliminarMedicamento} = require('../controllers/cargoMedicamento.controller');

router.post('/crearMedicamento', crearMedicamento);
router.get('/obtenerMedicamentos', obtenerMedicamentos);
router.post('/obtenerMedicamentoPorId', obtenerMedicamentoPorId);
router.put('/actualizarMedicamento/:id', actualizarMedicamento);
router.delete('/eliminarMedicamento/:id', eliminarMedicamento);




module.exports = router;