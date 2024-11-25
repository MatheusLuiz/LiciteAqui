const db = require('../config/db');

class StatusClienteModel {
    static async cadastrarStatusCliente(descricao, usuario) {
        const sql = `
            CALL sp_inserir_status_cliente(?, ?)
        `;
        const params = [descricao, usuario];
        return await this.executeQuery(sql, params);
    }

    static async atualizarStatusCliente(id_status, descricao, usuario) {
        const sql = `
            CALL sp_atualizar_status_cliente(?, ?, ?)
        `;
        const params = [id_status, descricao, usuario];
        return await this.executeQuery(sql, params);
    }

    static async listarStatusCliente() {
        const sql = `
            SELECT * FROM vw_status_cliente
        `;
        const resultados = await this.executeQuery(sql);
        return resultados.length ? resultados : [];
    }

    static async deletarStatusCliente(id_status, usuario) {
        const sql = `
            CALL sp_deletar_status_cliente(?, ?)
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

module.exports = StatusClienteModel;