const db = require('../config/db');

class LicitacaoModel {
    static async cadastrarLicitacao(num_licitacao, modalidade, orgao, portal, numero_identificacao, status_licitacao, objeto, cidade, estado, data_licitacao, usuario) {
        const sql = `
            CALL sp_inserir_licitacao(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [num_licitacao, modalidade, orgao, portal, numero_identificacao, status_licitacao, objeto, cidade, estado, data_licitacao, usuario];
        return await this.executeQuery(sql, params);
    }

    static async atualizarLicitacao(id_licitacao, num_licitacao, modalidade, orgao, portal, numero_identificacao, status_licitacao, objeto, cidade, estado, data_licitacao, usuario) {
        const sql = `
            CALL sp_atualizar_licitacao(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [id_licitacao, num_licitacao, modalidade, orgao, portal, numero_identificacao, status_licitacao, objeto, cidade, estado, data_licitacao, usuario];
        return await this.executeQuery(sql, params);
    }

    static async listarLicitacoes() {
        const sql = `
            SELECT * FROM vw_licitacoes
        `;
        const resultados = await this.executeQuery(sql);
        return resultados.length ? resultados : [];
    }

    static async deletarLicitacao(id_licitacao, usuario) {
        const sql = `
            CALL sp_deletar_licitacao(?, ?)
        `;
        const params = [id_licitacao, usuario];
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

module.exports = LicitacaoModel;