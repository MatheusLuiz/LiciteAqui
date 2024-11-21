const express = require('express');
const LicitacaoController = require('../controllers/licitacaoController');

const router = express.Router();

router.post('/cadastrar', LicitacaoController.cadastrar);
router.put('/atualizar', LicitacaoController.atualizar);
router.get('/listar', LicitacaoController.listar);
router.delete('/deletar', LicitacaoController.deletar);

module.exports = router;
