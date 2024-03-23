const express = require('express');
const router = express();

const { createCategoria, editCategoria, getAllCategorias} = require('../controllers/categoria.controller');

router.post('/createCategoria', createCategoria);
router.put('/editCategoria', editCategoria);
router.get('/getAllCategoria', getAllCategorias);

module.exports = router;