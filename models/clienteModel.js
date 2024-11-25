const db = require('../config/db');

class ClienteModel {
    static async cadastrarCliente({ cnpj, razao_social, nome_fantasia, status, data_cadastro, usuario }) {
        const sql = `CALL sp_inserir_cliente(?, ?, ?, ?, ?, ?)`;
        const params = [cnpj, razao_social, nome_fantasia, status, data_cadastro, usuario];
        // return await this.executeQuery(sql, params);
        try {
            const [result] = await db.query(sql, params);
            return result;
        } catch (error) {
            console.error("Erro ao executar consulta SQL no modelo:", error.message);
            throw new Error(`Erro ao executar a consulta: ${error.message}`);
        }
    }

    static async atualizarCliente(id_cliente, { cnpj, razao_social, nome_fantasia, status, usuario }) {
        const sql = `CALL sp_atualizar_cliente(?, ?, ?, ?, ?, ?)`;
        const params = [id_cliente, cnpj, razao_social, nome_fantasia, status, usuario];
        return await this.executeQuery(sql, params);
    }

    static async listarClientesAll() {
        const sql = `SELECT * FROM vw_clientes_all`;
        return await this.executeQuery(sql);
    }

    static async listarClientesAtivos() {
        const sql = `SELECT * FROM vw_clientes_ativos`;
        return await this.executeQuery(sql);
    }

    static async listarClientesInativos() {
        const sql = `SELECT * FROM vw_clientes_inativos`;
        return await this.executeQuery(sql);
    }

    static async listarClientesSuspensos() {
        const sql = `SELECT * FROM vw_clientes_suspenso`;
        return await this.executeQuery(sql);
    }

    static async deletarCliente(id_cliente, usuario) {
        const sql = `CALL sp_deletar_cliente(?, ?)`;
        const params = [id_cliente, usuario];
        return await this.executeQuery(sql, params);
    }

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

module.exports = ClienteModel;
