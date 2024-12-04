const express = require("express");
const StatusClienteController = require("../controllers/statusClienteController");

const router = express.Router();

router.post("/cadastrar", StatusClienteController.cadastrar);
router.put("/atualizar", StatusClienteController.atualizar);
router.get("/listar", StatusClienteController.listar);
router.delete("/deletar", StatusClienteController.deletar);

module.exports = router;
