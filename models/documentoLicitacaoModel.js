const db = require('../config/db');

class DocumentoLicitacaoModel {
    // Cadastrar novo documento de licitação
    static async cadastrarDocumentoLicitacao({ id_documento, num_licitacao, usuario }) {
        const sql = `CALL sp_inserir_documento_licitacao(?, ?, ?)`;
        const params = [id_documento, num_licitacao, usuario];
        return await this.executeQuery(sql, params);
    }

    // Atualizar documento de licitação existente
    static async atualizarDocumentoLicitacao(id_doc_licitacao, { id_documento, num_licitacao, usuario }) {
        const sql = `CALL sp_atualizar_documento_licitacao(?, ?, ?, ?)`;
        const params = [id_doc_licitacao, id_documento, num_licitacao, usuario];
        return await this.executeQuery(sql, params);
    }

    // Listar todos os documentos de licitação
    static async listarDocumentosLicitacao() {
        const sql = `SELECT * FROM vw_documentos_licitacao`;
        return await this.executeQuery(sql);
    }

    // Deletar documento de licitação
    static async deletarDocumentoLicitacao(id_doc_licitacao, usuario) {
        const sql = `CALL sp_deletar_documento_licitacao(?, ?)`;
        const params = [id_doc_licitacao, usuario];
        return await this.executeQuery(sql, params);
    }

    // Método genérico para executar consultas
    static async executeQuery(sql, params = []) {
        try {
            const [results] = await db.query(sql, params);
            return results;
        } catch (error) {
            console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
            throw new Error(`Erro ao executar a consulta no banco de dados: ${error.message}`);
        }
    }
}

module.exports = DocumentoLicitacaoModel;
