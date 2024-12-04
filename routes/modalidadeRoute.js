const express = require("express");
const ModalidadeController = require("../controllers/modalidadeController");

const router = express.Router();

router.post("/cadastrar", ModalidadeController.cadastrar);
router.put("/atualizar", ModalidadeController.atualizar);
router.get("/listar", ModalidadeController.listar);
router.delete("/deletar", ModalidadeController.deletar);

module.exports = router;
