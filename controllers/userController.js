const UserModel = require("../models/userModel");

class UserController {
  static async cadastrar(req, res) {
    try {
      const { nome_completo, email, sexo, data_nascimento, cpf, usuario } =
        req.body;

      if (!nome_completo || !email || !sexo || !cpf || !usuario) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Dados obrigatórios não fornecidos.",
          });
      }

      const result = await UserModel.cadastrarUser({
        nome_completo,
        email,
        sexo,
        data_nascimento,
        cpf,
        usuario,
      });

      return res.status(201).json({
        success: true,
        message: result.message,
        data: { id_usuario: result.id_usuario },
      });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res
        .status(500)
        .json({
          success: false,
          message: "Erro ao cadastrar o usuário.",
          error: error.message,
        });
    }
  }

  static async atualizar(req, res) {
    try {
      const {
        id_usuario,
        nome_completo,
        email,
        sexo,
        data_nascimento,
        cpf,
        usuario,
      } = req.body;

      if (
        !id_usuario ||
        !nome_completo ||
        !email ||
        !sexo ||
        !cpf ||
        !usuario
      ) {
        return res
          .status(400)
          .json({ error: "Dados obrigatórios não fornecidos." });
      }

      const result = await UserModel.atualizarUser(id_usuario, {
        nome_completo,
        email,
        sexo,
        data_nascimento,
        cpf,
        usuario,
      });

      if (result.success) {
        return res
          .status(200)
          .json({
            success: true,
            message: "Usuário atualizado com sucesso.",
            data: result,
          });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Erro ao atualizar o usuário." });
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res
        .status(500)
        .json({
          error: "Erro ao atualizar o usuário.",
          details: error.message,
        });
    }
  }

  static async listar(req, res) {
    try {
      const usuarios = await UserModel.listarUser();

      console.log("Usuários retornados pela model:", usuarios);

      if (!Array.isArray(usuarios) || usuarios.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Nenhum usuário encontrado." });
      }

      return res.status(200).json({
        success: true,
        message: "Usuários listados com sucesso.",
        data: usuarios,
      });
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return res
        .status(500)
        .json({
          success: false,
          message: "Erro ao listar os usuários.",
          error: error.message,
        });
    }
  }

  static async deletar(req, res) {
    try {
      const { id_usuario, usuario } = req.body;

      if (!id_usuario || !usuario) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "O ID do usuário e o identificador do usuário que está realizando a ação são obrigatórios.",
          });
      }

      const result = await UserModel.deletarUser(id_usuario, usuario);

      if (result.success) {
        return res.status(200).json({ success: true, message: result.message });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Erro ao deletar o usuário." });
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return res
        .status(500)
        .json({
          success: false,
          message: "Erro ao deletar o usuário.",
          error: error.message,
        });
    }
  }
}

module.exports = UserController;
