const express = require('express');
const router = express();

const {crearInsulina,
    obtenerInsulinas,
    obtenerInsulinaPorId,
    actualizarInsulina,
    eliminarInsulina} = require('../controllers/cargoInsulina.controller');

    router.post('/insulinas', crearInsulina);
    router.get('/insulinas', obtenerInsulinas);
    router.get('/insulinas/:id', obtenerInsulinaPorId);
    router.put('/insulinas/:id', actualizarInsulina);
    router.delete('/insulinas/:id', eliminarInsulina);

module.exports = router;