const db = require('../config/db');

class ModalidadeModel {
    // Cadastrar nova modalidade
    static async cadastrarModalidade({ nome_modalidade, usuario }) {
        const sql = `CALL sp_inserir_modalidade(?, ?)`;
        const params = [nome_modalidade, usuario];
        return await this.executeQuery(sql, params);
    }

    // Atualizar modalidade existente
    static async atualizarModalidade(id_modalidade, { nome_modalidade, usuario }) {
        const sql = `CALL sp_atualizar_modalidade(?, ?, ?)`;
        const params = [id_modalidade, nome_modalidade, usuario];
        return await this.executeQuery(sql, params);
    }

    // Listar todas as modalidades
    static async listarModalidades() {
        const sql = `SELECT * FROM vw_modalidade`;
        return await this.executeQuery(sql);
    }

    // Deletar modalidade
    static async deletarModalidade(id_modalidade, usuario) {
        const sql = `CALL sp_deletar_modalidade(?, ?)`;
        const params = [id_modalidade, usuario];
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

module.exports = ModalidadeModel;
