const express = require('express');
const router = express();

const {     crearExpediente,
    obtenerExpedientes,
    obtenerExpedientePorId,
    actualizarExpediente,
    eliminarExpediente} = require('../controllers/expediente.controller');


    router.post('/crearExpediente', crearExpediente);
    router.get('/obtenerExpedientes', obtenerExpedientes);
    router.post('/obtenerExpedientePorId', obtenerExpedientePorId);
    router.put('/actualizarExpediente/:id', actualizarExpediente);
    router.delete('/eliminarExpediente/:id', eliminarExpediente);

module.exports = router;