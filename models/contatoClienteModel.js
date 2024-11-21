const db = require('../config/db');

class ContatoClienteModel {
    // Cadastrar novo contato de cliente
    static async cadastrarContatoCliente({
        cliente,
        tipo_telefone,
        ddd,
        telefone,
        nome_completo,
        sexo,
        data_nascimento,
        cpf,
        status_cadastro,
        email,
        usuario,
    }) {
        const sql = `CALL sp_inserir_contato_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [cliente, tipo_telefone, ddd, telefone, nome_completo, sexo, data_nascimento, cpf, status_cadastro, email, usuario];
        return await this.executeQuery(sql, params);
    }

    // Atualizar contato de cliente existente
    static async atualizarContatoCliente(id_contato, {
        cliente,
        tipo_telefone,
        ddd,
        telefone,
        nome_completo,
        sexo,
        data_nascimento,
        cpf,
        status_cadastro,
        email,
        usuario,
    }) {
        const sql = `CALL sp_atualizar_contato_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [id_contato, cliente, tipo_telefone, ddd, telefone, nome_completo, sexo, data_nascimento, cpf, status_cadastro, email, usuario];
        return await this.executeQuery(sql, params);
    }

    // Listar todos os contatos de cliente
    static async listarContatosCliente() {
        const sql = `SELECT * FROM vw_contato_clientes`;
        return await this.executeQuery(sql);
    }

    // Deletar contato de cliente
    static async deletarContatoCliente(id_contato, usuario) {
        const sql = `CALL sp_deletar_contato_cliente(?, ?)`;
        const params = [id_contato, usuario];
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

module.exports = ContatoClienteModel;
