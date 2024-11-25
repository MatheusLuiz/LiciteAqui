const db = require('../config/db');

class TipoServicoModel {
    static async cadastrarTipoServico(descricao, usuario) {
        const sql = `
            CALL sp_inserir_tipo_servico(?, ?)
        `;
        const params = [descricao, usuario];
        return await this.executeQuery(sql, params);
    }

    static async atualizarTipoServico(id_tipo_servico, descricao, usuario) {
        const sql = `
            CALL sp_atualizar_tipo_servico(?, ?, ?)
        `;
        const params = [id_tipo_servico, descricao, usuario];
        return await this.executeQuery(sql, params);
    }

    static async listarTiposServico() {
        const sql = `
            SELECT * FROM vw_tipo_servico
        `;
        const resultados = await this.executeQuery(sql);
        return resultados.length ? resultados : [];
    }

    static async deletarTipoServico(id_tipo_servico, usuario) {
        const sql = `
            CALL sp_deletar_tipo_servico(?, ?)
        `;
        const params = [id_tipo_servico, usuario];
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

module.exports = TipoServicoModel;