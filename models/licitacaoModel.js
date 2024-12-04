const db = require('../config/db');

class LicitacaoModel {
    static async cadastrarLicitacao(id_cliente, num_licitacao, modalidade, orgao, portal, numero_identificacao, status_licitacao, objeto, cidade, estado, data_licitacao, usuario) {
        const sql = `
            CALL sp_inserir_licitacao(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [id_cliente, num_licitacao, modalidade, orgao, portal, numero_identificacao, status_licitacao, objeto, cidade, estado, data_licitacao, usuario];
        console.log('Parâmetros enviados para sp_inserir_licitacao:', params);
        return await this.executeQuery(sql, params);
    }

    static async atualizarLicitacao(id_licitacao, id_cliente, num_licitacao, modalidade, orgao, portal, numero_identificacao, status_licitacao, objeto, cidade, estado, data_licitacao, usuario) {
        const sql = `CALL sp_atualizar_licitacao(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [id_licitacao, id_cliente, num_licitacao, modalidade, orgao, portal, numero_identificacao, status_licitacao, objeto, cidade, estado, data_licitacao, usuario];
    
        console.log('Parâmetros enviados para sp_atualizar_licitacao:', params);
    
        try {
            const [results] = await db.query(sql, params);
    
            // Verificar se a SP retornou a mensagem esperada
            if (results && results[0] && results[0].mensagem) {
                return {
                    success: true,
                    message: results[0].mensagem,
                };
            } else {
                throw new Error('Erro ao obter o resultado da atualização da licitação.');
            }
        } catch (error) {
            console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
            throw new Error(
                `Erro ao executar a consulta no banco de dados: ${error.message}`
            );
        }
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
