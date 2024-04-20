const express = require('express');
const router = express();

const {  crearMedicamento, obtenerMedicamentos, obtenerMedicamentoPorId, actualizarMedicamento, eliminarMedicamento} = require('../controllers/cargoMedicamento.controller');

router.post('/medicamentos', crearMedicamento);
router.get('/medicamentos', obtenerMedicamentos);
router.get('/medicamentos/:id', obtenerMedicamentoPorId);
router.put('/medicamentos/:id', actualizarMedicamento);
router.delete('/medicamentos/:id', eliminarMedicamento);




module.exports = router;