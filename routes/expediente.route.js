const express = require('express');
const router = express();

const {     crearExpediente,
    obtenerExpedientes,
    obtenerExpedientePorId,
    actualizarExpediente,
    eliminarExpediente} = require('../controllers/expediente.controller');


    router.post('/expedientes', crearExpediente);
    router.get('/expedientes', obtenerExpedientes);
    router.get('/expedientes/:id', obtenerExpedientePorId);
    router.put('/expedientes/:id', actualizarExpediente);
    router.delete('/expedientes/:id', eliminarExpediente);

module.exports = router;