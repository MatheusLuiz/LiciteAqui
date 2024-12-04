const db = require("../config/db");

class TipoDocumentoModel {
  static async cadastrarTipoDocumento(descricao, usuario) {
    const sql = `
            CALL sp_inserir_tipo_documento(?, ?)
        `;
    const params = [descricao, usuario];
    return await this.executeQuery(sql, params);
  }

  static async atualizarTipoDocumento(id_documento, descricao, usuario) {
    const sql = `
            CALL sp_atualizar_tipo_documento(?, ?, ?)
        `;
    const params = [id_documento, descricao, usuario];
    return await this.executeQuery(sql, params);
  }

  static async listarTiposDocumento() {
    const sql = `
            SELECT * FROM vw_tipos_documentos
        `;
    const resultados = await this.executeQuery(sql);
    return resultados.length ? resultados : [];
  }

  static async deletarTipoDocumento(id_documento, usuario) {
    const sql = `
            CALL sp_deletar_tipo_documento(?, ?)
        `;
    const params = [id_documento, usuario];
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

module.exports = TipoDocumentoModel;
