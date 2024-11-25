const express = require('express');
const ClienteController = require('../controllers/clienteController');

const router = express.Router();

router.post('/cadastrar', ClienteController.cadastrar);
router.put('/atualizar', ClienteController.atualizar);
router.get('/listar', ClienteController.listar);
router.delete('/deletar', ClienteController.deletar);

module.exports = router;
