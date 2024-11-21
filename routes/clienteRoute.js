const express = require('express');
const ClienteController = require('../controllers/ClienteController');

const router = express.Router();

router.post('/cadastrar', ClienteController.cadastrar);
router.put('/atualizar', ClienteController.atualizar);
router.get('/listarAll', ClienteController.listarTodos);
router.get('/listarStatus', ClienteController.listarPorStatus);
router.delete('/deletar', ClienteController.deletar);

module.exports = router;
