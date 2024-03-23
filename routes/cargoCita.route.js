const express = require('express');
const router = express();

const { crearMaterial,getMateriales, editMaterial, getMaterial} = require('../controllers/cargoCita.controller');

router.post('/crearMaterial', crearMaterial);
router.put('/editMaterial', editMaterial);
router.get('/getMateriales', getMateriales);
router.get('/getMaterial/:id', getMaterial);


module.exports = router;