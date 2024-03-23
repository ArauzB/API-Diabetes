const express = require('express');
const router = express();

const { createCompraWithDetalle, getCompras, getCompra} = require('../controllers/cargoMedicamento.controller');

router.post('/compraOrden', createCompraWithDetalle);
router.get('/getCompras', getCompras);
router.get('/getCompra', getCompra);



module.exports = router;