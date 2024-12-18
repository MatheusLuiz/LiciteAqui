const LoginUsuarioModel = require("../models/loginModel");

class LoginUsuarioController {
  static async cadastrar(req, res) {
    try {
      const { usuario, username, senha, usuario_log } = req.body;

      if (!usuario || !username || !senha || !usuario_log) {
        return res
          .status(400)
          .json({ error: "Dados obrigatórios não fornecidos." });
      }

      const result = await LoginUsuarioModel.cadastrarLoginUsuario(
        usuario,
        username,
        senha,
        usuario_log
      );
      return res
        .status(201)
        .json({ message: "Login de usuário cadastrado com sucesso!", result });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao cadastrar o login de usuário." });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id_login, username, senha, usuario_log } = req.body;

      if (!id_login || !username || !senha || !usuario_log) {
        return res
          .status(400)
          .json({ error: "Dados obrigatórios não fornecidos." });
      }

      const result = await LoginUsuarioModel.atualizarLoginUsuario(
        id_login,
        username,
        senha,
        usuario_log
      );
      return res
        .status(200)
        .json({ message: "Login de usuário atualizado com sucesso!", result });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao atualizar o login de usuário." });
    }
  }

  static async listar(req, res) {
    try {
      const loginsUsuarios = await LoginUsuarioModel.listarLoginsUsuarios();

      if (!loginsUsuarios || loginsUsuarios.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum login de usuário encontrado." });
      }

      return res.status(200).json(loginsUsuarios);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao listar os logins de usuários." });
    }
  }

  static async deletar(req, res) {
    try {
      const { id_login, usuario_log } = req.body;

      if (!id_login || !usuario_log) {
        return res
          .status(400)
          .json({ error: "Dados obrigatórios não fornecidos." });
      }

      const result = await LoginUsuarioModel.deletarLoginUsuario(
        id_login,
        usuario_log
      );
      return res
        .status(200)
        .json({ message: "Login de usuário deletado com sucesso!", result });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao deletar o login de usuário." });
    }
  }

  static async findUserByUsername(req, res) {
    const { username, senha } = req.body;

    if (!username || !senha) {
      return res
        .status(400)
        .json({
          error: 'Os parâmetros "username" e "senha" são obrigatórios.',
        });
    }

    try {
      const user = await LoginModel.findByUsername(username);

      if (!user) {
        console.warn(`Usuário com username "${username}" não encontrado.`);
        return res
          .status(404)
          .json({
            error: `Usuário com username "${username}" não encontrado.`,
          });
      }

      const bcrypt = require("bcrypt");
      const senhaValida = await bcrypt.compare(senha, user.senha);
      if (!senhaValida) {
        console.warn("Senha inválida para o username:", username);
        return res.status(401).json({ error: "Senha inválida." });
      }

      const { senha: _, ...userWithoutPassword } = user;
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error.message);
      return res
        .status(500)
        .json({ error: "Erro ao buscar os dados do usuário." });
    }
  }
}

module.exports = LoginUsuarioController;
