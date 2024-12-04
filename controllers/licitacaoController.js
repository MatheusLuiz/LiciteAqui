const LicitacaoModel = require("../models/licitacaoModel");

class LicitacaoController {
  static async cadastrar(req, res) {
    try {
      const {
        id_cliente,
        num_licitacao,
        modalidade,
        orgao,
        portal,
        numero_identificacao,
        status_licitacao,
        objeto,
        cidade,
        estado,
        data_licitacao,
        usuario,
      } = req.body;

      if (
        !id_cliente ||
        !num_licitacao ||
        !modalidade ||
        !orgao ||
        !portal ||
        !numero_identificacao ||
        !status_licitacao ||
        !objeto ||
        !cidade ||
        !estado ||
        !data_licitacao ||
        !usuario
      ) {
        return res
          .status(400)
          .json({ error: "Dados obrigatórios não fornecidos." });
      }

      if (typeof modalidade !== "number") {
        return res
          .status(400)
          .json({ error: "A modalidade deve ser um valor numérico." });
      }

      if (typeof status_licitacao !== "number") {
        return res
          .status(400)
          .json({ error: "O status da licitação deve ser um valor numérico." });
      }

      const estadoFormatado = estado.trim();
      if (typeof estadoFormatado !== "string" || estadoFormatado.length !== 2) {
        return res
          .status(400)
          .json({ error: "O estado deve ser um código de 2 caracteres." });
      }

      const result = await LicitacaoModel.cadastrarLicitacao(
        id_cliente,
        num_licitacao,
        modalidade,
        orgao,
        portal,
        numero_identificacao,
        status_licitacao,
        objeto,
        cidade,
        estadoFormatado,
        data_licitacao,
        usuario
      );
      return res
        .status(201)
        .json({ message: "Licitação cadastrada com sucesso!", result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao cadastrar a licitação." });
    }
  }

  static async atualizar(req, res) {
    try {
      function validarCamposObrigatorios(campos, body) {
        const camposFaltantes = campos.filter((campo) => !body[campo]);
        if (camposFaltantes.length > 0) {
          return `Campos obrigatórios não fornecidos: ${camposFaltantes.join(
            ", "
          )}`;
        }
        return null;
      }

      const camposObrigatorios = [
        "id_licitacao",
        "id_cliente",
        "num_licitacao",
        "modalidade",
        "orgao",
        "portal",
        "numero_identificacao",
        "status_licitacao",
        "objeto",
        "cidade",
        "estado",
        "data_licitacao",
        "usuario",
      ];

      const erroValidacao = validarCamposObrigatorios(
        camposObrigatorios,
        req.body
      );

      if (erroValidacao) {
        return res.status(400).json({ success: false, message: erroValidacao });
      }

      const {
        id_licitacao,
        id_cliente,
        num_licitacao,
        modalidade,
        orgao,
        portal,
        numero_identificacao,
        status_licitacao,
        objeto,
        cidade,
        estado,
        data_licitacao,
        usuario,
      } = req.body;

      if (typeof modalidade !== "number") {
        return res
          .status(400)
          .json({ error: "A modalidade deve ser um valor numérico." });
      }

      if (typeof status_licitacao !== "number") {
        return res
          .status(400)
          .json({ error: "O status da licitação deve ser um valor numérico." });
      }

      const estadoFormatado = estado.trim();
      if (typeof estadoFormatado !== "string" || estadoFormatado.length !== 2) {
        return res
          .status(400)
          .json({ error: "O estado deve ser um código de 2 caracteres." });
      }

      const result = await LicitacaoModel.atualizarLicitacao(
        id_licitacao,
        id_cliente,
        num_licitacao,
        modalidade,
        orgao,
        portal,
        numero_identificacao,
        status_licitacao,
        objeto,
        cidade,
        estadoFormatado,
        data_licitacao,
        usuario
      );

      return res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      console.error("Erro ao atualizar licitação:", error);
      return res.status(500).json({
        success: false,
        message: "Erro ao atualizar a licitação.",
        error: error.message,
      });
    }
  }

  static async listar(req, res) {
    try {
      const licitacoes = await LicitacaoModel.listarLicitacoes();

      if (!licitacoes || licitacoes.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhuma licitação encontrada." });
      }

      return res.status(200).json(licitacoes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar as licitações." });
    }
  }

  static async deletar(req, res) {
    try {
      const { num_licitacao, usuario } = req.body;

      if (!num_licitacao || !usuario) {
        return res
          .status(400)
          .json({ error: "Dados obrigatórios não fornecidos." });
      }

      const result = await LicitacaoModel.deletarLicitacao(
        num_licitacao,
        usuario
      );
      return res
        .status(200)
        .json({ message: "Licitação deletada com sucesso!", result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar a licitação." });
    }
  }
}

module.exports = LicitacaoController;
