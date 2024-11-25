const db = require('../config/db');

class ContatoClienteModel {
    static async cadastrarContatoCliente(cliente, tipo_telefone, ddd, telefone, nome_completo, sexo, data_nascimento, cpf, status_cadastro, email, usuario) {
        const sql = `
            CALL sp_inserir_contato_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [cliente, tipo_telefone, ddd, telefone, nome_completo, sexo, data_nascimento, cpf, status_cadastro, email, usuario];
        return await this.executeQuery(sql, params);
    }

    static async atualizarContatoCliente(id_contato, cliente, tipo_telefone, ddd, telefone, nome_completo, sexo, data_nascimento, cpf, status_cadastro, email, usuario) {
        const sql = `
            CALL sp_atualizar_contato_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [id_contato, cliente, tipo_telefone, ddd, telefone, nome_completo, sexo, data_nascimento, cpf, status_cadastro, email, usuario];
        return await this.executeQuery(sql, params);
    }

    static async listarContatosClientes() {
        const sql = `
            SELECT * FROM vw_contato_clientes
        `;
        const resultados = await this.executeQuery(sql);
        return resultados.length ? resultados : [];
    }

    static async deletarContatoCliente(id_contato, usuario) {
        const sql = `
            CALL sp_deletar_contato_cliente(?, ?)
        `;
        const params = [id_contato, usuario];
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

module.exports = ContatoClienteModel;