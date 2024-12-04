const db = require("../config/db");

class DocumentoLicitacaoModel {
  static async cadastrarDocumentoLicitacao(
    id_documento,
    num_licitacao,
    usuario
  ) {
    const sql = `
            CALL sp_inserir_documento_licitacao(?, ?, ?)
        `;
    const params = [id_documento, num_licitacao, usuario];
    return await this.executeQuery(sql, params);
  }

  static async atualizarDocumentoLicitacao(
    id_doc_licitacao,
    id_documento,
    num_licitacao,
    usuario
  ) {
    const sql = `
            CALL sp_atualizar_documento_licitacao(?, ?, ?, ?)
        `;
    const params = [id_doc_licitacao, id_documento, num_licitacao, usuario];
    return await this.executeQuery(sql, params);
  }

  static async listarDocumentosLicitacao() {
    const sql = `
            SELECT * FROM vw_documentos_licitacao
        `;
    const resultados = await this.executeQuery(sql);
    return resultados.length ? resultados : [];
  }

  static async deletarDocumentoLicitacao(id_doc_licitacao, usuario) {
    const sql = `
            CALL sp_deletar_documento_licitacao(?, ?)
        `;
    const params = [id_doc_licitacao, usuario];
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

module.exports = DocumentoLicitacaoModel;
