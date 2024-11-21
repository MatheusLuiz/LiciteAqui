const express = require('express');
const ServicoClienteController = require('../controllers/servicoClienteController');

const router = express.Router();

router.post('/cadastrar', ServicoClienteController.cadastrar);
router.put('/atualizar', ServicoClienteController.atualizar);
router.get('/listar', ServicoClienteController.listar);
router.delete('/deletar', ServicoClienteController.deletar);

module.exports = router;
