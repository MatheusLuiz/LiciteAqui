const express = require("express");
const ClienteController = require("../controllers/clienteController");

const router = express.Router();

router.post("/cadastrar", ClienteController.cadastrar);
router.put("/atualizar", ClienteController.atualizar);
router.delete("/deletar", ClienteController.deletar);

router.get("/listar/ativos", ClienteController.listarClientesAtivos);
router.get("/listar/inativos", ClienteController.listarClientesInativos);
router.get("/listar/suspensos", ClienteController.listarClientesSuspensos);
router.get("/listar/todos", ClienteController.listarTodosClientes);

module.exports = router;
