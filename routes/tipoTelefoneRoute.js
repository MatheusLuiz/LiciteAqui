const express = require('express');
const TipoTelefoneController = require('../controllers/tipoTelefoneController');

const router = express.Router();

router.post('/cadastrar', TipoTelefoneController.cadastrar);
router.put('/atualizar', TipoTelefoneController.atualizar);
router.get('/listar', TipoTelefoneController.listar);
router.delete('/deletar', TipoTelefoneController.deletar);

module.exports = router;
