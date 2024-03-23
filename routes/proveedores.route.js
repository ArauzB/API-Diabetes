const express = require('express');
const router = express();

const { crearProveedor, editProveedor, getAllProveedores, changeEstado} = require('../controllers/proveedores.controller');

router.post('/crearProveedor', crearProveedor);
router.put('/editProveedor', editProveedor);
router.get('/getProveedor', getAllProveedores);
router.put('/changeEstado', changeEstado);



module.exports = router;