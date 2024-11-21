const express = require('express');
const ContatoClienteController = require('../controllers/contatoClienteController');

const router = express.Router();

router.post('/cadastrar', ContatoClienteController.cadastrar);
router.put('/atualizar', ContatoClienteController.atualizar);
router.get('/listar', ContatoClienteController.listar);
router.delete('/deletar', ContatoClienteController.deletar);

module.exports = router;
