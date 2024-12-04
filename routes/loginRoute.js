const express = require("express");
const LoginUsuarioController = require("../controllers/loginController");

const router = express.Router();

router.post("/autentic", LoginUsuarioController.findUserByUsername);
router.post("/cadastrar", LoginUsuarioController.cadastrar);
router.put("/atualizar", LoginUsuarioController.atualizar);
router.get("/listar", LoginUsuarioController.listar);
router.delete("/deletar", LoginUsuarioController.deletar);

module.exports = router;
