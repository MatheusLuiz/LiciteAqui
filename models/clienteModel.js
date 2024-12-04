const db = require("../config/db");

class ClienteModel {
  static async cadastrarCliente(
    cnpj,
    razao_social,
    nome_fantasia,
    status,
    data_cadastro,
    usuario
  ) {
    const sql = `CALL sp_inserir_cliente(?, ?, ?, ?, ?, ?)`;
    const params = [
      cnpj,
      razao_social,
      nome_fantasia,
      status,
      data_cadastro,
      usuario,
    ];

    try {
      // Executa a procedure e obtém os resultados
      const [results] = await db.query(sql, params);

      // A procedure retornará o ID diretamente como resultado.
      if (results && results[0] && results[0].id_cliente) {
        const id_cliente = results[0].id_cliente;
        return {
          success: true,
          id_cliente,
          message: "Cliente cadastrado com sucesso.",
        };
      }

      // Caso não tenha retornado o valor esperado
      throw new Error("Erro ao obter o ID do cliente recém-cadastrado.");
    } catch (error) {
      console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
      throw new Error(
        `Erro ao executar a consulta no banco de dados: ${error.message}`
      );
    }
  }

  static async atualizarCliente(
    id_cliente,
    cnpj,
    razao_social,
    nome_fantasia,
    status,
    usuario
  ) {
    const sql = `CALL sp_atualizar_cliente(?, ?, ?, ?, ?, ?)`;
    const params = [
      id_cliente,
      cnpj,
      razao_social,
      nome_fantasia,
      status,
      usuario,
    ];

    try {
      // Executa a procedure e obtém os resultados
      const results = await db.query(sql, params);

      // Verifica se a resposta é válida e contém os dados esperados
      if (results && Array.isArray(results) && results.length > 0) {
        return {
          success: true,
          message: "Cliente atualizado com sucesso.",
        };
      }

      // Caso não tenha retornado o valor esperado
      throw new Error("Erro ao obter o resultado da atualização do cliente.");
    } catch (error) {
      console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
      throw new Error(
        `Erro ao executar a consulta no banco de dados: ${error.message}`
      );
    }
  }

  static async listarClientes() {
    const sql = `
            SELECT * FROM vw_clientes_all
        `;
    const resultados = await this.executeQuery(sql);
    return resultados.length ? resultados : [];
  }

  static async deletarCliente(id_cliente, usuario) {
    const sql = `CALL sp_deletar_cliente(?, ?)`;
    const params = [id_cliente, usuario];

    try {
      const [results] = await db.query(sql, params);

      // Validar o retorno da procedure
      if (results && results[0] && results[0].mensagem) {
        return {
          success: true,
          message: results[0].mensagem,
        };
      } else {
        throw new Error("Erro ao deletar cliente. Nenhum dado retornado.");
      }
    } catch (error) {
      console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
      throw new Error(
        `Erro ao executar a consulta no banco de dados: ${error.message}`
      );
    }
  }

  static async listarClientesAtivos() {
    const sql = `SELECT * FROM vw_clientes_ativos`;
    return await this.executeQuery(sql);
  }

  // Listar clientes inativos
  static async listarClientesInativos() {
    const sql = `SELECT * FROM vw_clientes_inativos`;
    return await this.executeQuery(sql);
  }

  // Listar clientes suspensos
  static async listarClientesSuspensos() {
    const sql = `SELECT * FROM vw_clientes_suspenso`;
    return await this.executeQuery(sql);
  }

  // Listar todos os clientes
  static async listarTodosClientes() {
    const sql = `SELECT * FROM vw_clientes_all`;
    return await this.executeQuery(sql);
  }

  static async executeQuery(sql, params = []) {
    try {
      const results = await db.query(sql, params);
      return results[0] instanceof Array ? results[0] : results;
    } catch (error) {
      console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
      throw new Error(
        `Erro ao executar a consulta no banco de dados: ${error.message}`
      );
    }
  }
}

module.exports = ClienteModel;
