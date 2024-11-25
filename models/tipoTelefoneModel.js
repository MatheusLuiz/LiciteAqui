const db = require('../config/db');

class TipoTelefoneModel {
    static async cadastrarTipoTelefone(descricao, usuario) {
        const sql = `
            CALL sp_inserir_tipos_telefone(?, ?)
        `;
        const params = [descricao, usuario];
        return await this.executeQuery(sql, params);
    }

    static async atualizarTipoTelefone(id_tipo_telefone, descricao, usuario) {
        const sql = `
            CALL sp_atualizar_tipos_telefone(?, ?, ?)
        `;
        const params = [id_tipo_telefone, descricao, usuario];
        return await this.executeQuery(sql, params);
    }

    static async listarTiposTelefone() {
        const sql = `
            SELECT * FROM vw_tipos_telefone
        `;
        const resultados = await this.executeQuery(sql);
        return resultados.length ? resultados : [];
    }

    static async deletarTipoTelefone(id_tipo_telefone, usuario) {
        const sql = `
            CALL sp_deletar_tipos_telefone(?, ?)
        `;
        const params = [id_tipo_telefone, usuario];
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

module.exports = TipoTelefoneModel;