const express = require('express');
const router = express();

const {    crearCita, getCitas, getCita} = require('../controllers/cargoCita.controller');

router.post('/crearCita', crearCita);
router.get('/getCitas', getCitas);
router.get('/getCita/:id', getCita);


module.exports = router;