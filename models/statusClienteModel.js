const db = require('../config/db');

class StatusClienteModel {
    // Cadastrar novo status de cliente
    static async cadastrarStatusCliente({ descricao, usuario }) {
        const sql = `CALL sp_inserir_status_cliente(?, ?)`;
        const params = [descricao, usuario];
        return await this.executeQuery(sql, params);
    }

    // Atualizar status de cliente existente
    static async atualizarStatusCliente(id_status, { nova_descricao, usuario }) {
        const sql = `CALL sp_atualizar_status_cliente(?, ?, ?)`;
        const params = [id_status, nova_descricao, usuario];
        return await this.executeQuery(sql, params);
    }

    // Listar todos os status de clientes
    static async listarStatusClientes() {
        const sql = `SELECT * FROM vw_status_cliente`;
        return await this.executeQuery(sql);
    }

    // Deletar status de cliente
    static async deletarStatusCliente(id_status, usuario) {
        const sql = `CALL sp_deletar_status_cliente(?, ?)`;
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

module.exports = StatusClienteModel;
