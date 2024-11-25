const db = require('../config/db');

class ClienteModel {
    static async cadastrarCliente(cnpj, razao_social, nome_fantasia, status, data_cadastro, usuario) {
        const sql = `
            CALL sp_inserir_cliente(?, ?, ?, ?, ?, ?)
        `;
        const params = [cnpj, razao_social, nome_fantasia, status, data_cadastro, usuario];
        return await this.executeQuery(sql, params);
    }

    static async atualizarCliente(id_cliente, cnpj, razao_social, nome_fantasia, status, usuario) {
        const sql = `
            CALL sp_atualizar_cliente(?, ?, ?, ?, ?, ?)
        `;
        const params = [id_cliente, cnpj, razao_social, nome_fantasia, status, usuario];
        return await this.executeQuery(sql, params);
    }

    static async listarClientes() {
        const sql = `
            SELECT * FROM vw_clientes_all
        `;
        const resultados = await this.executeQuery(sql);
        return resultados.length ? resultados : [];
    }

    static async deletarCliente(id_cliente, usuario) {
        const sql = `
            CALL sp_deletar_cliente(?, ?)
        `;
        const params = [id_cliente, usuario];
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

module.exports = ClienteModel;