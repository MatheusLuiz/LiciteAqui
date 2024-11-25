const db = require('../config/db');

class StatusLicitacaoModel {
    static async cadastrarStatusLicitacao(nome_status, usuario) {
        const sql = `
            CALL sp_inserir_status_licitacao(?, ?)
        `;
        const params = [nome_status, usuario];
        return await this.executeQuery(sql, params);
    }

    static async atualizarStatusLicitacao(id_status, nome_status, usuario) {
        const sql = `
            CALL sp_atualizar_status_licitacao(?, ?, ?)
        `;
        const params = [id_status, nome_status, usuario];
        return await this.executeQuery(sql, params);
    }

    static async listarStatusLicitacao() {
        const sql = `
            SELECT * FROM vw_status_licitacao
        `;
        const resultados = await this.executeQuery(sql);
        return resultados.length ? resultados : [];
    }

    static async deletarStatusLicitacao(id_status, usuario) {
        const sql = `
            CALL sp_deletar_status_licitacao(?, ?)
        `;
        const params = [id_status, usuario];
        return await this.executeQuery(sql, params);
    }

    static async executeQuery(sql, params = []) {
        try {
            const results = await db.query(sql, params);
            return results[0] instanceof Array ? results[0] : results;
        } catch (error) {
            console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
            throw new Error(`Erro ao executar a consulta no banco de dados: ${error.message}`);
        }
    }
}

module.exports = StatusLicitacaoModel;