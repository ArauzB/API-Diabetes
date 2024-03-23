const express = require('express');
const router = express();

const {createProducto, editProducto, getAllProducto} = require('../controllers/expediente.controller');

router.post('/createProducto', createProducto);
router.put('/editProducto', editProducto);
router.get('/getAllProducto', getAllProducto);

module.exports = router;