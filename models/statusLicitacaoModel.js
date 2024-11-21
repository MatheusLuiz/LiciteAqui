const db = require('../config/db');

class StatusLicitacaoModel {
    // Cadastrar novo status de licitação
    static async cadastrarStatusLicitacao({ nome_status, usuario }) {
        const sql = `CALL sp_inserir_status_licitacao(?, ?)`;
        const params = [nome_status, usuario];
        return await this.executeQuery(sql, params);
    }

    // Atualizar status de licitação existente
    static async atualizarStatusLicitacao(id_status, { nome_status, usuario }) {
        const sql = `CALL sp_atualizar_status_licitacao(?, ?, ?)`;
        const params = [id_status, nome_status, usuario];
        return await this.executeQuery(sql, params);
    }

    // Listar todos os status de licitação
    static async listarStatusLicitacao() {
        const sql = `SELECT * FROM vw_status_licitacao`;
        return await this.executeQuery(sql);
    }

    // Deletar status de licitação
    static async deletarStatusLicitacao(id_status, usuario) {
        const sql = `CALL sp_deletar_status_licitacao(?, ?)`;
        const params = [id_status, usuario];
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

module.exports = StatusLicitacaoModel;
