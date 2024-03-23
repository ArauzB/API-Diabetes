const express = require('express');
const router = express();

const auth = require('./auth.route');
const paciente = require('./paciente.route');
const expediente = require('./expediente.route');
const cargoMedicamento = require('./cargoMedicamento.route');
const cargoCitas = require('./cargoCita.route');
const cargoInsulina = require('./cargoInsulina.route');




router.use('/auth', auth);
router.use('/paciente', paciente);
router.use('/expediente', expediente);
router.use('/cargoMedicamento', cargoMedicamento);
router.use('/cargoCitas', cargoCitas);
router.use('/cargoInsulina', cargoInsulina);







module.exports = router; 