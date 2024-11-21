const db = require('../config/db');

class TipoServicoModel {
    // Cadastrar novo tipo de serviço
    static async cadastrarTipoServico({ descricao, usuario }) {
        const sql = `CALL sp_inserir_tipo_servico(?, ?)`;
        const params = [descricao, usuario];
        return await this.executeQuery(sql, params);
    }

    // Atualizar tipo de serviço existente
    static async atualizarTipoServico(id_tipo_servico, { descricao, usuario }) {
        const sql = `CALL sp_atualizar_tipo_servico(?, ?, ?)`;
        const params = [id_tipo_servico, descricao, usuario];
        return await this.executeQuery(sql, params);
    }

    // Listar todos os tipos de serviço
    static async listarTiposServico() {
        const sql = `SELECT * FROM vw_tipo_servico`;
        return await this.executeQuery(sql);
    }

    // Deletar tipo de serviço
    static async deletarTipoServico(id_tipo_servico, usuario) {
        const sql = `CALL sp_deletar_tipo_servico(?, ?)`;
        const params = [id_tipo_servico, usuario];
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

module.exports = TipoServicoModel;
