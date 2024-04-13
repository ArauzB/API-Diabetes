const express = require('express');
const router = express();

const { createExpediente, editExpediente, getAllExpedientes} = require('../controllers/expediente.controller');

router.post('/createExpediente', createExpediente);
router.put('/editExpediente', editExpediente);
router.get('/getAllExpedientes', getAllExpedientes);

module.exports = router;