const express = require('express');
const router = express();

const { crearCliente, editCliente, getAllCliente,changeEstado} = require('../controllers/paciente.controller');

router.post('/crearCliente', crearCliente);
router.put('/editCliente', editCliente);
router.get('/getCliente', getAllCliente);
router.put('/changeEstado', changeEstado);

module.exports = router;