const db = require("../config/db");

class UserModel {
  static async cadastrarUser({
    nome_completo,
    email,
    sexo,
    data_nascimento,
    cpf,
    usuario,
  }) {
    const sql = `CALL sp_inserir_usuario(?, ?, ?, ?, NOW(), ?, ?)`;
    const params = [nome_completo, email, sexo, data_nascimento, cpf, usuario];

    try {
      const [results] = await db.query(sql, params);

      if (results && results[0] && results[0].id_usuario) {
        const id_usuario = results[0].id_usuario;
        return {
          success: true,
          id_usuario,
          message: "Usuário cadastrado com sucesso.",
        };
      }
      throw new Error("Erro ao obter o ID do usuário recém-cadastrado.");
    } catch (error) {
      console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
      throw new Error(
        `Erro ao executar a consulta no banco de dados: ${error.message}`
      );
    }
  }

  static async atualizarUser(
    id_usuario,
    { nome_completo, email, sexo, data_nascimento, cpf, usuario }
  ) {
    const sql = `CALL sp_atualizar_usuario(?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      id_usuario,
      nome_completo,
      email,
      sexo,
      data_nascimento,
      cpf,
      usuario,
    ];

    try {
      const [results] = await db.query(sql, params);

      if (results && results[0] && results[0].mensagem) {
        return {
          success: true,
          message: results[0].mensagem,
        };
      } else {
        throw new Error("Erro ao obter o resultado da atualização do usuário.");
      }
    } catch (error) {
      console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
      throw new Error(
        `Erro ao executar a consulta no banco de dados: ${error.message}`
      );
    }
  }

  static async listarUser() {
    const sql = `SELECT * FROM vw_usuarios`;
    try {
      const resultados = await db.query(sql);

      const listaResultados = Array.isArray(resultados[0])
        ? resultados[0]
        : resultados;

      console.log(
        "Resultados da consulta à view vw_usuarios:",
        listaResultados
      );

      return listaResultados;
    } catch (error) {
      console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
      throw new Error(
        `Erro ao executar a consulta no banco de dados: ${error.message}`
      );
    }
  }

  static async deletarUser(id_usuario, usuario) {
    const sql = `CALL sp_deletar_usuario(?, ?)`;
    const params = [id_usuario, usuario];

    try {
      const [results] = await db.query(sql, params);

      if (results && results[0] && results[0].mensagem) {
        return {
          success: true,
          message: results[0].mensagem,
        };
      } else {
        throw new Error("Erro ao obter o resultado da deleção do usuário.");
      }
    } catch (error) {
      console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
      throw new Error(
        `Erro ao executar a consulta no banco de dados: ${error.message}`
      );
    }
  }

  static async executeQuery(sql, params = []) {
    try {
      const [results] = await db.query(sql, params);
      return Array.isArray(results) && results.length > 0 ? results : [];
    } catch (error) {
      console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
      throw new Error(
        `Erro ao executar a consulta no banco de dados: ${error.message}`
      );
    }
  }

  static async verificarCpfExistente(cpf, id_usuario) {
    const sql = `SELECT id_usuario FROM usuarios WHERE cpf = ? AND id_usuario != ?`;
    const params = [cpf, id_usuario];
    const resultados = await this.executeQuery(sql, params);

    return resultados.length > 0;
  }
}

module.exports = UserModel;
