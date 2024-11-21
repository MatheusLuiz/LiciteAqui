const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/autentic', loginController.findUserByUsername);
router.post('/cadastrar', loginController.insertLogin);
router.put('/atualizar', loginController.updateLogin);
router.delete('/deletar', loginController.deleteLogin);

module.exports = router;