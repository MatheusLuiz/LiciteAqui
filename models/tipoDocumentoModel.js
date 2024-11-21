const db = require('../config/db');

class TipoDocumentoModel {
    // Cadastrar novo tipo de documento
    static async cadastrarTipoDocumento({ descricao, usuario }) {
        const sql = `CALL sp_inserir_tipo_documento(?, ?)`;
        const params = [descricao, usuario];
        return await this.executeQuery(sql, params);
    }

    // Atualizar tipo de documento existente
    static async atualizarTipoDocumento(id_documento, { descricao, usuario }) {
        const sql = `CALL sp_atualizar_tipo_documento(?, ?, ?)`;
        const params = [id_documento, descricao, usuario];
        return await this.executeQuery(sql, params);
    }

    // Listar todos os tipos de documentos
    static async listarTiposDocumento() {
        const sql = `SELECT * FROM vw_tipos_documentos`;
        return await this.executeQuery(sql);
    }

    // Deletar tipo de documento
    static async deletarTipoDocumento(id_documento, usuario) {
        const sql = `CALL sp_deletar_tipo_documento(?, ?)`;
        const params = [id_documento, usuario];
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

module.exports = TipoDocumentoModel;
