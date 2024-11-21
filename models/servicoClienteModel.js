const db = require('../config/db');

class ServicoClienteModel {
    // Cadastrar novo serviço de cliente
    static async cadastrarServicoCliente({ id_cliente, id_tipo_servico, usuario }) {
        const sql = `CALL sp_inserir_servico_cliente(?, ?, ?)`;
        const params = [id_cliente, id_tipo_servico, usuario];
        return await this.executeQuery(sql, params);
    }

    // Atualizar serviço de cliente existente
    static async atualizarServicoCliente(id_servico, { id_cliente, id_tipo_servico, usuario }) {
        const sql = `CALL sp_atualizar_servico_cliente(?, ?, ?, ?)`;
        const params = [id_servico, id_cliente, id_tipo_servico, usuario];
        return await this.executeQuery(sql, params);
    }

    // Listar todos os serviços de cliente
    static async listarServicosCliente() {
        const sql = `SELECT * FROM view_servicos_cliente`;
        return await this.executeQuery(sql);
    }

    // Deletar serviço de cliente
    static async deletarServicoCliente(id_servico, usuario) {
        const sql = `CALL sp_deletar_servico_cliente(?, ?)`;
        const params = [id_servico, usuario];
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

module.exports = ServicoClienteModel;
