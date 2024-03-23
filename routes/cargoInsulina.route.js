const express = require('express');
const router = express();

const {    createVentaWithDetalle,
    getVentas,
    getVentaById,
    getVentasByCliente, cambiarEstadoVenta} = require('../controllers/cargoInsulina.controller');

router.post('/createVentaWithDetalle', createVentaWithDetalle);
router.get('/getVentas', getVentas);
router.get('/getVentaById/:id', getVentaById);
router.get('/getVentasByCliente/:id', getVentasByCliente);
router.post('/cambiarEstadoVenta', cambiarEstadoVenta);

module.exports = router;