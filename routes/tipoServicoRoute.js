const express = require("express");
const TipoServicoController = require("../controllers/tipoServicoController");

const router = express.Router();

router.post("/cadastrar", TipoServicoController.cadastrar);
router.put("/atualizar", TipoServicoController.atualizar);
router.get("/listar", TipoServicoController.listar);
router.delete("/deletar", TipoServicoController.deletar);

module.exports = router;
