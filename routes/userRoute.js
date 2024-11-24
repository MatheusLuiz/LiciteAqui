const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/cadastrar', UserController.cadastrar);
router.put('/atualizar', UserController.atualizar);
router.get('/listar', UserController.listar);
router.delete('/deletar', UserController.deletar); 

module.exports = router;