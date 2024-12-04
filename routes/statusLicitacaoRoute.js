const express = require("express");
const StatusLicitacaoController = require("../controllers/statusLicitacaoController");

const router = express.Router();

router.post("/cadastrar", StatusLicitacaoController.cadastrar);
router.put("/atualizar", StatusLicitacaoController.atualizar);
router.get("/listar", StatusLicitacaoController.listar);
router.delete("/deletar", StatusLicitacaoController.deletar);

module.exports = router;
