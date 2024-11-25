const db = require('../config/db');

class ServicoClienteModel {
    static async cadastrarServicoCliente(id_cliente, id_tipo_servico, usuario) {
        const sql = `
            CALL sp_inserir_servico_cliente(?, ?, ?)
        `;
        const params = [id_cliente, id_tipo_servico, usuario];
        return await this.executeQuery(sql, params);
    }

    static async atualizarServicoCliente(id_servico, id_cliente, id_tipo_servico, usuario) {
        const sql = `
            CALL sp_atualizar_servico_cliente(?, ?, ?, ?)
        `;
        const params = [id_servico, id_cliente, id_tipo_servico, usuario];
        return await this.executeQuery(sql, params);
    }

    static async listarServicosCliente() {
        const sql = `
            SELECT * FROM vw_servicos_cliente
        `;
        const resultados = await this.executeQuery(sql);
        return resultados.length ? resultados : [];
    }

    static async deletarServicoCliente(id_servico, usuario) {
        const sql = `
            CALL sp_deletar_servico_cliente(?, ?)
        `;
        const params = [id_servico, usuario];
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

module.exports = ServicoClienteModel;
