const express = require("express");
const DocumentoLicitacaoController = require("../controllers/documentoLicitacaoController");

const router = express.Router();

router.post("/cadastrar", DocumentoLicitacaoController.cadastrar);
router.put("/atualizar", DocumentoLicitacaoController.atualizar);
router.get("/listar", DocumentoLicitacaoController.listar);
router.delete("/deletar", DocumentoLicitacaoController.deletar);

module.exports = router;
