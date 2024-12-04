const StatusLicitacaoModel = require("../models/statusLicitacaoModel");

class StatusLicitacaoController {
  static async cadastrar(req, res) {
    try {
      const { nome_status, usuario } = req.body;

      if (!nome_status || !usuario) {
        return res
          .status(400)
          .json({ error: "Dados obrigatórios não fornecidos." });
      }

      const result = await StatusLicitacaoModel.cadastrarStatusLicitacao(
        nome_status,
        usuario
      );
      return res
        .status(201)
        .json({
          message: "Status de licitação cadastrado com sucesso!",
          result,
        });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao cadastrar o status de licitação." });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id_status, nome_status, usuario } = req.body;

      if (!id_status || !nome_status || !usuario) {
        return res
          .status(400)
          .json({ error: "Dados obrigatórios não fornecidos." });
      }

      const result = await StatusLicitacaoModel.atualizarStatusLicitacao(
        id_status,
        nome_status,
        usuario
      );
      return res
        .status(200)
        .json({
          message: "Status de licitação atualizado com sucesso!",
          result,
        });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao atualizar o status de licitação." });
    }
  }

  static async listar(req, res) {
    try {
      const statusLicitacao =
        await StatusLicitacaoModel.listarStatusLicitacao();

      if (!statusLicitacao || statusLicitacao.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum status de licitação encontrado." });
      }

      return res.status(200).json(statusLicitacao);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao listar os status de licitação." });
    }
  }

  static async deletar(req, res) {
    try {
      const { id_status, usuario } = req.body;

      if (!id_status || !usuario) {
        return res
          .status(400)
          .json({ error: "Dados obrigatórios não fornecidos." });
      }

      const result = await StatusLicitacaoModel.deletarStatusLicitacao(
        id_status,
        usuario
      );
      return res
        .status(200)
        .json({ message: "Status de licitação deletado com sucesso!", result });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao deletar o status de licitação." });
    }
  }
}

module.exports = StatusLicitacaoController;
