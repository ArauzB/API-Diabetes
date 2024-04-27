const express = require('express');
const router = express();

const {crearInsulina,
    obtenerInsulinas,
    obtenerInsulinaPorId,
    actualizarInsulina,
    eliminarInsulina} = require('../controllers/cargoInsulina.controller');

    router.post('/crearInsulina', crearInsulina);
    router.get('/obtenerInsulinas', obtenerInsulinas);
    router.get('/obtenerInsulinaPorId/:id', obtenerInsulinaPorId);
    router.put('/actualizarInsulina/:id', actualizarInsulina);
    router.delete('/eliminarInsulina/:id', eliminarInsulina);

module.exports = router;