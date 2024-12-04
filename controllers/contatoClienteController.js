const ContatoClienteModel = require("../models/contatoClienteModel");

class ContatoClienteController {
  static async cadastrar(req, res) {
    try {
      const {
        cliente,
        tipo_telefone,
        ddd,
        telefone,
        nome_completo,
        sexo,
        data_nascimento,
        cpf,
        status_cadastro,
        email,
        usuario,
      } = req.body;

      const camposObrigatorios = {
        cliente,
        tipo_telefone,
        ddd,
        telefone,
        nome_completo,
        sexo,
        data_nascimento,
        cpf,
        status_cadastro,
        email,
        usuario,
      };

      for (const [campo, valor] of Object.entries(camposObrigatorios)) {
        if (valor === undefined || valor === null) {
          return res
            .status(400)
            .json({
              error: `O campo ${campo} é obrigatório e não foi fornecido.`,
            });
        }
      }

      const result = await ContatoClienteModel.cadastrarContatoCliente(
        cliente,
        tipo_telefone,
        ddd,
        telefone,
        nome_completo,
        sexo,
        data_nascimento,
        cpf,
        status_cadastro,
        email,
        usuario
      );
      return res
        .status(201)
        .json({
          message: "Contato de cliente cadastrado com sucesso!",
          result,
        });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao cadastrar o contato de cliente." });
    }
  }

  static async atualizar(req, res) {
    try {
      const {
        id_contato,
        cliente,
        tipo_telefone,
        ddd,
        telefone,
        nome_completo,
        sexo,
        data_nascimento,
        cpf,
        status_cadastro,
        email,
        usuario,
      } = req.body;

      const camposObrigatorios = {
        id_contato,
        cliente,
        tipo_telefone,
        ddd,
        telefone,
        nome_completo,
        sexo,
        data_nascimento,
        cpf,
        status_cadastro,
        email,
        usuario,
      };

      for (const [campo, valor] of Object.entries(camposObrigatorios)) {
        if (valor === undefined || valor === null) {
          return res
            .status(400)
            .json({
              error: `O campo ${campo} é obrigatório e não foi fornecido.`,
            });
        }
      }

      const result = await ContatoClienteModel.atualizarContatoCliente(
        id_contato,
        cliente,
        tipo_telefone,
        ddd,
        telefone,
        nome_completo,
        sexo,
        data_nascimento,
        cpf,
        status_cadastro,
        email,
        usuario
      );
      return res
        .status(200)
        .json({
          message: "Contato de cliente atualizado com sucesso!",
          result,
        });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao atualizar o contato de cliente." });
    }
  }

  static async listar(req, res) {
    try {
      const contatosClientes =
        await ContatoClienteModel.listarContatosClientes();

      if (!contatosClientes || contatosClientes.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum contato de cliente encontrado." });
      }

      return res.status(200).json(contatosClientes);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao listar os contatos de clientes." });
    }
  }

  static async listarPorId(req, res) {
    try {
      const { cliente_id } = req.body;

      if (cliente_id === undefined || cliente_id === null) {
        return res
          .status(400)
          .json({ error: "O parâmetro cliente_id é obrigatório." });
      }

      const contatoCliente =
        await ContatoClienteModel.listarContatoClientePorId(cliente_id);

      if (!contatoCliente || contatoCliente.length === 0) {
        return res
          .status(404)
          .json({ message: "Contato de cliente não encontrado." });
      }

      return res.status(200).json(contatoCliente);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao listar o contato do cliente." });
    }
  }

  static async deletar(req, res) {
    try {
      const { id_contato, usuario } = req.body;

      if (
        id_contato === undefined ||
        id_contato === null ||
        usuario === undefined ||
        usuario === null
      ) {
        return res
          .status(400)
          .json({ error: "Dados obrigatórios não fornecidos." });
      }

      const result = await ContatoClienteModel.deletarContatoCliente(
        id_contato,
        usuario
      );
      return res
        .status(200)
        .json({ message: "Contato de cliente deletado com sucesso!", result });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao deletar o contato de cliente." });
    }
  }
}

module.exports = ContatoClienteController;
