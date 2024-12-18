const ModalidadeModel = require("../models/modalidadeModel");

class ModalidadeController {
  static async cadastrar(req, res) {
    try {
      const { nome_modalidade, usuario } = req.body;

      if (!nome_modalidade || !usuario) {
        return res
          .status(400)
          .json({ error: "Dados obrigatórios não fornecidos." });
      }

      const result = await ModalidadeModel.cadastrarModalidade(
        nome_modalidade,
        usuario
      );
      return res
        .status(201)
        .json({ message: "Modalidade cadastrada com sucesso!", result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao cadastrar a modalidade." });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id_modalidade, nome_modalidade, usuario } = req.body;

      if (!id_modalidade || !nome_modalidade || !usuario) {
        return res
          .status(400)
          .json({ error: "Dados obrigatórios não fornecidos." });
      }

      const result = await ModalidadeModel.atualizarModalidade(
        id_modalidade,
        nome_modalidade,
        usuario
      );
      return res
        .status(200)
        .json({ message: "Modalidade atualizada com sucesso!", result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar a modalidade." });
    }
  }

  static async listar(req, res) {
    try {
      const modalidades = await ModalidadeModel.listarModalidade();

      if (!modalidades || modalidades.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhuma modalidade encontrada." });
      }

      return res.status(200).json(modalidades);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar as modalidades." });
    }
  }

  static async deletar(req, res) {
    try {
      const { id_modalidade, usuario } = req.body;

      if (!id_modalidade || !usuario) {
        return res
          .status(400)
          .json({ error: "Dados obrigatórios não fornecidos." });
      }

      const result = await ModalidadeModel.deletarModalidade(
        id_modalidade,
        usuario
      );
      return res
        .status(200)
        .json({ message: "Modalidade deletada com sucesso!", result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar a modalidade." });
    }
  }
}

module.exports = ModalidadeController;
