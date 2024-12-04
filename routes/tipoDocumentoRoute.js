const express = require("express");
const TipoDocumentoController = require("../controllers/tipoDocumentoController");

const router = express.Router();

router.post("/cadastrar", TipoDocumentoController.cadastrar);
router.put("/atualizar", TipoDocumentoController.atualizar);
router.get("/listar", TipoDocumentoController.listar);
router.delete("/deletar", TipoDocumentoController.deletar);

module.exports = router;
