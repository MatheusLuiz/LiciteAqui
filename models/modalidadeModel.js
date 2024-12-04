const db = require("../config/db");

class ModalidadeModel {
  static async cadastrarModalidade(nome_modalidade, usuario) {
    const sql = `
            CALL sp_inserir_modalidade(?, ?)
        `;
    const params = [nome_modalidade, usuario];
    return await this.executeQuery(sql, params);
  }

  static async atualizarModalidade(id_modalidade, nome_modalidade, usuario) {
    const sql = `
            CALL sp_atualizar_modalidade(?, ?, ?)
        `;
    const params = [id_modalidade, nome_modalidade, usuario];
    return await this.executeQuery(sql, params);
  }

  static async listarModalidade() {
    const sql = `
            SELECT * FROM vw_modalidade
        `;
    const resultados = await this.executeQuery(sql);
    return resultados.length ? resultados : [];
  }

  static async deletarModalidade(id_modalidade, usuario) {
    const sql = `
            CALL sp_deletar_modalidade(?, ?)
        `;
    const params = [id_modalidade, usuario];
    return await this.executeQuery(sql, params);
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

module.exports = ModalidadeModel;
